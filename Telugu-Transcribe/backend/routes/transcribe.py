import os
import tempfile
from flask import Blueprint, request, jsonify
from db.init_db import db
from models.transcription import Transcription
import yt_dlp
from transformers import pipeline

transcribe_bp = Blueprint("transcribe", __name__)

# Load Hugging Face ASR pipeline once at startup
# Uses fine-tuned Whisper model for Telugu
MODEL_ID = "openai/whisper-small"
asr_pipeline = pipeline(
    "automatic-speech-recognition",
    model=MODEL_ID,
    generate_kwargs={"language": "telugu", "task": "transcribe"},
)


def extract_audio(youtube_url: str, output_path: str) -> str:
    """Download audio from YouTube URL using yt-dlp."""
    ydl_opts = {
        "format": "bestaudio/best",
        "outtmpl": output_path,
        "postprocessors": [{
            "key": "FFmpegExtractAudio",
            "preferredcodec": "wav",
            "preferredquality": "192",
        }],
        "quiet": True,
    }
    with yt_dlp.YoutubeDL(ydl_opts) as ydl:
        info = ydl.extract_info(youtube_url, download=True)
        title = info.get("title", "Unknown Title")
    return title


# ── POST /api/transcribe ─────────────────────────────────────────────────────
@transcribe_bp.route("/transcribe", methods=["POST"])
def transcribe():
    data = request.get_json()
    youtube_url = data.get("youtube_url", "").strip()

    if not youtube_url:
        return jsonify({"error": "youtube_url is required"}), 400

    try:
        with tempfile.TemporaryDirectory() as tmpdir:
            audio_path = os.path.join(tmpdir, "audio")

            # Step 1: Extract audio from YouTube
            video_title = extract_audio(youtube_url, audio_path)
            wav_path = audio_path + ".wav"

            # Step 2: Run ASR inference
            result = asr_pipeline(wav_path)
            transcript_text = result.get("text", "").strip()

        # Step 3: Save to PostgreSQL
        word_count = len(transcript_text.split())
        record = Transcription(
            youtube_url=youtube_url,
            video_title=video_title,
            transcript=transcript_text,
            language="te",
            word_count=word_count,
        )
        db.session.add(record)
        db.session.commit()

        return jsonify(record.to_dict()), 201

    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500


# ── GET /api/transcriptions ───────────────────────────────────────────────────
@transcribe_bp.route("/transcriptions", methods=["GET"])
def get_all():
    records = Transcription.query.order_by(Transcription.created_at.desc()).all()
    return jsonify([r.to_dict() for r in records]), 200


# ── GET /api/transcriptions/<id> ──────────────────────────────────────────────
@transcribe_bp.route("/transcriptions/<int:record_id>", methods=["GET"])
def get_one(record_id):
    record = Transcription.query.get_or_404(record_id)
    return jsonify(record.to_dict()), 200


# ── DELETE /api/transcriptions/<id> ──────────────────────────────────────────
@transcribe_bp.route("/transcriptions/<int:record_id>", methods=["DELETE"])
def delete_one(record_id):
    record = Transcription.query.get_or_404(record_id)
    db.session.delete(record)
    db.session.commit()
    return jsonify({"message": f"Transcription {record_id} deleted"}), 200


# ── GET /api/health ───────────────────────────────────────────────────────────
@transcribe_bp.route("/health", methods=["GET"])
def health():
    return jsonify({"status": "ok", "service": "Telugu Transcriber API"}), 200
