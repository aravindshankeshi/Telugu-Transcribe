import React, { useState } from "react";
import { deleteTranscription } from "../api/transcribeApi";

function TranscriptionCard({ record, onDelete }) {
  const [expanded, setExpanded] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const handleDelete = async () => {
    if (!window.confirm("Delete this transcription?")) return;
    setDeleting(true);
    try {
      await deleteTranscription(record.id);
      onDelete(record.id);
    } catch {
      alert("Failed to delete. Please try again.");
      setDeleting(false);
    }
  };

  const formatDate = (iso) =>
    new Date(iso).toLocaleString("en-IN", {
      dateStyle: "medium",
      timeStyle: "short",
    });

  const preview = record.transcript.slice(0, 200);

  return (
    <div className="transcription-card">
      <div className="card-header">
        <div>
          <h3 className="video-title">{record.video_title || "Telugu Video"}</h3>
          <a
            href={record.youtube_url}
            target="_blank"
            rel="noreferrer"
            className="video-url"
          >
            {record.youtube_url}
          </a>
        </div>
        <div className="card-meta">
          <span className="badge">Telugu</span>
          <span className="word-count">{record.word_count} words</span>
          <span className="date">{formatDate(record.created_at)}</span>
        </div>
      </div>

      <div className="transcript-body">
        <p className="transcript-text">
          {expanded ? record.transcript : `${preview}${record.transcript.length > 200 ? "..." : ""}`}
        </p>
        {record.transcript.length > 200 && (
          <button className="toggle-btn" onClick={() => setExpanded(!expanded)}>
            {expanded ? "Show less ▲" : "Show more ▼"}
          </button>
        )}
      </div>

      <div className="card-actions">
        <button
          className="copy-btn"
          onClick={() => navigator.clipboard.writeText(record.transcript)}
        >
          📋 Copy
        </button>
        <button
          className="delete-btn"
          onClick={handleDelete}
          disabled={deleting}
        >
          {deleting ? "Deleting..." : "🗑️ Delete"}
        </button>
      </div>
    </div>
  );
}

export default TranscriptionCard;
