🎙️ Telugu Transcribe — YouTube Video Transcription Tool
A browser extension + Flask web app that automatically transcribes Telugu YouTube videos using a fine-tuned OpenAI Whisper model.
---
💡 Why I Built This
As a Telugu speaker, I noticed that most YouTube transcription tools perform poorly on regional Indian languages. I wanted to build a tool that accurately transcribes Telugu audio — including regional dialects and varying accents — directly inside the YouTube interface.
---
🚀 What It Does
Takes a YouTube video URL as input
Extracts the audio from the video
Runs it through a fine-tuned Whisper model trained on Telugu datasets
Displays the transcription in real time inside the browser
---
🛠️ Tech Stack
Layer	Technology
Speech-to-Text	OpenAI Whisper (fine-tuned)
Backend	Python, Flask
Browser Extension	HTML, JavaScript
Fine-Tuning	Jupyter Notebook
Dependencies	requirements.txt
---
📁 Project Structure
```
Telugu-Transcribe/
│
├── app.py                          # Flask backend — handles transcription requests
├── sample.py                       # Sample script to test transcription
├── Fine_Tune(without_quantize).ipynb  # Jupyter notebook for fine-tuning Whisper
├── requirements.txt                # All Python dependencies
└── youtube-telugu-transcriber/     # Browser extension files
    ├── popup.html                  # Extension UI
    ├── popup.js                    # Extension logic
    ├── manifest.json               # Chrome extension config
    ├── icon16.png
    ├── icon48.png
    └── icon128.png
```
---
⚙️ How to Run Locally
1. Clone the repo:
```bash
git clone https://github.com/aravindshankeshi/Telugu-Transcribe.git
cd Telugu-Transcribe
```
2. Install dependencies:
```bash
pip install -r requirements.txt
```
3. Start the Flask server:
```bash
python app.py
```
4. Load the browser extension:
Open Chrome → go to `chrome://extensions`
Enable Developer Mode
Click Load unpacked → select the `youtube-telugu-transcriber` folder
5. Use it:
Open any Telugu YouTube video
Click the extension icon
Get the transcription instantly!
---
📊 Model Performance (After Fine-Tuning)
Metric	Before Fine-Tuning	After Fine-Tuning
Standard WER	123.08%	15.38%
Orthographic WER	—	40.66%
Training Loss	—	0.2289
Validation Loss	—	0.0903
> Fine-tuning reduced the Word Error Rate from **123% → 15%** — a massive improvement in Telugu transcription accuracy.
---
✨ Key Features
✅ Real-time transcription directly inside YouTube
✅ Supports Telugu regional dialects and varying accents
✅ Automatic punctuation and contextual understanding
✅ Fine-tuned on Telugu-specific datasets for high accuracy
✅ Lightweight browser extension — no page reload needed
---
🔮 Future Plans
Dialect-specific fine-tuning for better regional accuracy
Mobile app support
Mixed-language transcription (Telugu + English)
Export transcription as `.txt` or `.srt` subtitle file
---
🧰 Requirements
See `requirements.txt` for the full list. Key libraries include:
`flask`
`openai-whisper`
`yt-dlp`
`torch`
`transformers`
---
📬 Contact
Made by Aravind Shankeshi  
📧 aravindshankeshi2002@gmail.com  
🔗 GitHub Profile

