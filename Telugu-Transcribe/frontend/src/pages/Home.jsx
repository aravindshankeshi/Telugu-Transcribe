import React, { useState } from "react";
import TranscribeForm from "../components/TranscribeForm";
import TranscriptionCard from "../components/TranscriptionCard";

function Home() {
  const [results, setResults] = useState([]);

  const handleResult = (record) => {
    setResults((prev) => [record, ...prev]);
  };

  const handleDelete = (id) => {
    setResults((prev) => prev.filter((r) => r.id !== id));
  };

  return (
    <div className="page home-page">
      <TranscribeForm onResult={handleResult} />

      {results.length > 0 && (
        <section className="results-section">
          <h2>Results</h2>
          {results.map((r) => (
            <TranscriptionCard key={r.id} record={r} onDelete={handleDelete} />
          ))}
        </section>
      )}

      {results.length === 0 && (
        <div className="empty-state">
          <p>🎥 Paste a Telugu YouTube link above to get started.</p>
        </div>
      )}
    </div>
  );
}

export default Home;
