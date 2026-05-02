import React, { useState, useEffect } from "react";
import { getAllTranscriptions } from "../api/transcribeApi";
import TranscriptionCard from "../components/TranscriptionCard";

function History() {
  const [records, setRecords]   = useState([]);
  const [loading, setLoading]   = useState(true);
  const [error, setError]       = useState("");
  const [search, setSearch]     = useState("");

  useEffect(() => {
    getAllTranscriptions()
      .then((res) => setRecords(res.data))
      .catch(() => setError("Failed to load transcription history."))
      .finally(() => setLoading(false));
  }, []);

  const handleDelete = (id) => {
    setRecords((prev) => prev.filter((r) => r.id !== id));
  };

  const filtered = records.filter(
    (r) =>
      r.video_title?.toLowerCase().includes(search.toLowerCase()) ||
      r.transcript.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) return <div className="page"><p className="loading-text">Loading history...</p></div>;
  if (error)   return <div className="page"><p className="error-msg">{error}</p></div>;

  return (
    <div className="page history-page">
      <div className="history-header">
        <h2>Transcription History</h2>
        <input
          className="search-input"
          type="text"
          placeholder="Search by title or transcript..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {filtered.length === 0 ? (
        <div className="empty-state">
          <p>📭 No transcriptions found{search ? " for your search" : ""}.</p>
        </div>
      ) : (
        <div className="history-list">
          <p className="count">{filtered.length} transcription{filtered.length !== 1 ? "s" : ""}</p>
          {filtered.map((r) => (
            <TranscriptionCard key={r.id} record={r} onDelete={handleDelete} />
          ))}
        </div>
      )}
    </div>
  );
}

export default History;
