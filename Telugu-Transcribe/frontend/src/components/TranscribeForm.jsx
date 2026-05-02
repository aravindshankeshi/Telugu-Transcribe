import React, { useState } from "react";
import { transcribeVideo } from "../api/transcribeApi";

function TranscribeForm({ onResult }) {
  const [url, setUrl]         = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!url.trim()) return;

    setLoading(true);
    setError("");

    try {
      const res = await transcribeVideo(url.trim());
      onResult(res.data);
      setUrl("");
    } catch (err) {
      setError(err.response?.data?.error || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="transcribe-form">
      <h2>Transcribe a Telugu YouTube Video</h2>
      <p className="subtitle">Paste a YouTube URL below and get the full Telugu transcript instantly.</p>

      <form onSubmit={handleSubmit}>
        <div className="input-row">
          <input
            type="url"
            placeholder="https://www.youtube.com/watch?v=..."
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            required
            disabled={loading}
            className="url-input"
          />
          <button type="submit" disabled={loading} className="submit-btn">
            {loading ? "Transcribing..." : "Transcribe"}
          </button>
        </div>
        {error && <p className="error-msg">⚠️ {error}</p>}
      </form>

      {loading && (
        <div className="loading-indicator">
          <div className="spinner"></div>
          <p>Downloading audio and running AI inference... this may take a moment.</p>
        </div>
      )}
    </div>
  );
}

export default TranscribeForm;
