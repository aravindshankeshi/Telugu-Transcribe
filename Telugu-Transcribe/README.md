# Telugu YouTube Transcriber 🎙️

A full-stack AI-powered application that transcribes Telugu speech from YouTube videos in real time. Built with a **React.js** frontend dashboard, a **Python Flask** REST API backend, a **PostgreSQL** database for transcription history, and a **Chrome Extension** for in-browser usage.

---

## 🏗️ Architecture

```
Telugu-Transcribe/
├── backend/          # Python Flask REST API
├── frontend/         # React.js Web Dashboard
├── chrome-extension/ # Browser Extension (HTML5 + JS)
└── docs/             # Architecture diagrams & API docs
```

---

## ✨ Features

- 🎥 Paste any Telugu YouTube URL and get a full transcription
- 🤖 AI-powered using fine-tuned OpenAI Whisper (WER reduced from 123% → 15%)
- 📊 React dashboard to view, search, and manage transcription history
- 🗄️ PostgreSQL database stores all transcriptions with timestamps
- 🔌 Chrome Extension for one-click in-browser transcription
- 🔗 RESTful API consumed by both the React frontend and Chrome Extension

---

## 🛠️ Tech Stack

| Layer       | Technology                                      |
|-------------|--------------------------------------------------|
| Frontend    | React.js, CSS3, Axios                           |
| Backend     | Python, Flask, Flask-CORS, Flask-SQLAlchemy     |
| Database    | PostgreSQL                                      |
| AI/ML       | OpenAI Whisper (fine-tuned), Hugging Face       |
| Extension   | HTML5, CSS3, JavaScript (Chrome Extension API)  |
| DevTools    | Git, GitHub, VS Code, Postman                   |

---

## 🚀 Getting Started

### 1. Clone the repository
```bash
git clone https://github.com/aravindshankeshi/Telugu-Transcribe.git
cd Telugu-Transcribe
```

### 2. Backend Setup
```bash
cd backend
python -m venv venv
source venv/bin/activate        # Windows: venv\Scripts\activate
pip install -r requirements.txt

# Set up environment variables
cp .env.example .env
# Edit .env with your PostgreSQL credentials and Hugging Face token

# Run database migrations
flask db upgrade

# Start the Flask server
flask run
```

### 3. Frontend Setup
```bash
cd frontend
npm install
npm start
# React app runs on http://localhost:3000
```

### 4. Chrome Extension
1. Open Chrome → `chrome://extensions/`
2. Enable **Developer Mode**
3. Click **Load unpacked** → select the `chrome-extension/` folder
4. Pin the extension and use it on any YouTube Telugu video page

---

## 📡 API Endpoints

| Method | Endpoint                    | Description                          |
|--------|-----------------------------|--------------------------------------|
| POST   | `/api/transcribe`           | Transcribe a YouTube URL             |
| GET    | `/api/transcriptions`       | Get all saved transcriptions         |
| GET    | `/api/transcriptions/<id>`  | Get a single transcription by ID     |
| DELETE | `/api/transcriptions/<id>`  | Delete a transcription               |
| GET    | `/api/health`               | Health check                         |

---

## 🗄️ Database Schema

```sql
CREATE TABLE transcriptions (
    id          SERIAL PRIMARY KEY,
    youtube_url TEXT NOT NULL,
    video_title TEXT,
    transcript  TEXT NOT NULL,
    language    VARCHAR(10) DEFAULT 'te',
    word_count  INTEGER,
    created_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

---

## 🤖 AI Model

- Base model: `openai/whisper-small`
- Fine-tuned on: Telugu speech datasets via Hugging Face
- Word Error Rate (WER): reduced from **123% → 15%**
- Framework: Hugging Face Transformers + `evaluate` library

---

## 📁 Project Structure (Detailed)

```
Telugu-Transcribe/
│
├── backend/
│   ├── app.py                  # Flask app entry point
│   ├── config.py               # App configuration
│   ├── requirements.txt        # Python dependencies
│   ├── .env.example            # Environment variables template
│   ├── routes/
│   │   └── transcribe.py       # API route handlers
│   ├── models/
│   │   └── transcription.py    # SQLAlchemy DB model
│   └── db/
│       └── init_db.py          # DB initialization script
│
├── frontend/
│   ├── package.json
│   ├── public/
│   └── src/
│       ├── App.jsx             # Root component
│       ├── index.js
│       ├── components/
│       │   ├── TranscribeForm.jsx
│       │   ├── TranscriptionCard.jsx
│       │   └── Navbar.jsx
│       ├── pages/
│       │   ├── Home.jsx
│       │   └── History.jsx
│       └── api/
│           └── transcribeApi.js
│
├── chrome-extension/
│   ├── manifest.json
│   ├── popup/
│   │   ├── popup.html
│   │   ├── popup.js
│   │   └── popup.css
│   └── icons/
│
└── docs/
    ├── architecture.md
    └── api-reference.md
```

---

## 👤 Author

**Aravind Shankeshi**
- GitHub: [@aravindshankeshi](https://github.com/aravindshankeshi)
- LinkedIn: [Aravind Shankeshi](https://linkedin.com/in/aravindshankeshi)
- Email: aravindshankeshi2002@gmail.com

---

## 📄 License

This project is licensed under the MIT License.
