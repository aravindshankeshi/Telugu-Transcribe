from db.init_db import db
from datetime import datetime

class Transcription(db.Model):
    __tablename__ = "transcriptions"

    id          = db.Column(db.Integer, primary_key=True)
    youtube_url = db.Column(db.Text, nullable=False)
    video_title = db.Column(db.Text, nullable=True)
    transcript  = db.Column(db.Text, nullable=False)
    language    = db.Column(db.String(10), default="te")
    word_count  = db.Column(db.Integer, nullable=True)
    created_at  = db.Column(db.DateTime, default=datetime.utcnow)

    def to_dict(self):
        return {
            "id":          self.id,
            "youtube_url": self.youtube_url,
            "video_title": self.video_title,
            "transcript":  self.transcript,
            "language":    self.language,
            "word_count":  self.word_count,
            "created_at":  self.created_at.isoformat(),
        }
