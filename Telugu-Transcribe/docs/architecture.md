# Architecture Overview

## System Design

```
┌─────────────────────────┐     REST API      ┌──────────────────────────────┐
│   React.js Dashboard    │ ◄──────────────► │   Flask REST API (Python)    │
│   (localhost:3000)      │                  │   (localhost:5000)            │
└─────────────────────────┘                  └──────────────┬───────────────┘
                                                            │
┌─────────────────────────┐     REST API      ┌────────────▼───────────────┐
│   Chrome Extension      │ ──────────────►  │      PostgreSQL Database    │
│   (Browser Popup)       │                  │   (transcriptions table)    │
└─────────────────────────┘                  └────────────────────────────┘
                                                            │
                                             ┌──────────────▼───────────────┐
                                             │     AI Inference Layer       │
                                             │  Hugging Face Transformers   │
                                             │  Fine-tuned Whisper Model    │
                                             └──────────────────────────────┘
```

## Data Flow

1. **User** pastes a YouTube URL (via React Dashboard or Chrome Extension)
2. **Flask API** receives `POST /api/transcribe`
3. **yt-dlp** downloads and extracts audio as `.wav`
4. **Hugging Face ASR pipeline** runs inference using fine-tuned Whisper
5. **Transcript** is saved to **PostgreSQL** via SQLAlchemy ORM
6. **JSON response** returned to the frontend
7. **React Dashboard** displays result and updates History page from DB

## Fine-tuning Details

- Base model: `openai/whisper-small`
- Dataset: Telugu speech data (Hugging Face Datasets)
- Metric: Word Error Rate (WER)
- Before fine-tuning: WER = 123%
- After fine-tuning:  WER = 15%
