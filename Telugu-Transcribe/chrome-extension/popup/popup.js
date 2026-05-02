const API_BASE = "http://localhost:5000/api";

const urlInput      = document.getElementById("url-input");
const transcribeBtn = document.getElementById("transcribe-btn");
const loading       = document.getElementById("loading");
const resultSection = document.getElementById("result-section");
const videoTitle    = document.getElementById("video-title");
const transcriptBox = document.getElementById("transcript-box");
const copyBtn       = document.getElementById("copy-btn");
const statusBar     = document.getElementById("status-bar");

// Auto-detect YouTube URL from active tab
chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
  const url = tabs[0]?.url || "";
  if (url.includes("youtube.com/watch") || url.includes("youtu.be")) {
    urlInput.value = url;
  }
});

function showStatus(msg, type = "info") {
  statusBar.textContent = msg;
  statusBar.className = `status-bar ${type}`;
  statusBar.classList.remove("hidden");
  setTimeout(() => statusBar.classList.add("hidden"), 4000);
}

function setLoading(on) {
  loading.classList.toggle("hidden", !on);
  transcribeBtn.disabled = on;
  transcribeBtn.textContent = on ? "Transcribing..." : "Transcribe";
}

transcribeBtn.addEventListener("click", async () => {
  const url = urlInput.value.trim();
  if (!url) {
    showStatus("Please enter a YouTube URL.", "error");
    return;
  }

  setLoading(true);
  resultSection.classList.add("hidden");

  try {
    const res = await fetch(`${API_BASE}/transcribe`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ youtube_url: url }),
    });

    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.error || "Transcription failed");
    }

    const data = await res.json();

    videoTitle.textContent    = data.video_title || "Telugu Video";
    transcriptBox.textContent = data.transcript;
    resultSection.classList.remove("hidden");
    showStatus("✅ Transcription saved!", "success");

  } catch (err) {
    showStatus(`⚠️ ${err.message}`, "error");
  } finally {
    setLoading(false);
  }
});

copyBtn.addEventListener("click", () => {
  const text = transcriptBox.textContent;
  if (!text) return;
  navigator.clipboard.writeText(text).then(() => {
    showStatus("📋 Copied to clipboard!", "success");
  });
});
