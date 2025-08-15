# AI-VOICE-ASSISTANT

An interactive web-based AI voice bot that listens to your voice, understands your query using **Google Gemini API**, and responds back with natural-sounding speech using **ElevenLabs Text-to-Speech**.

## 🚀 Features
- **Voice Recognition**: Converts your speech to text using the browser's SpeechRecognition API.
- **AI-Powered Responses**: Uses **Google Gemini 1.5 Flash** for intelligent replies.
- **Text-to-Speech**: Speaks responses aloud using **ElevenLabs TTS API**.
- **Simple Chat UI**: Displays a conversation-like interface.
- **Dark Mode**: Clean, modern, and user-friendly design.

## 🛠️ Tech Stack
- **HTML5**, **CSS3**, **JavaScript**
- **Google Gemini API** for AI responses
- **ElevenLabs API** for voice synthesis
- **Web Speech API** for speech-to-text

## 📂 Project Structure
├── index.html # Main HTML page
├── style.css # Styling for the chat UI
├── script.js # Logic for voice input, AI response, and speech output

---

## ⚙️ Setup Instructions
1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/ai-voice-assistant.git
   cd ai-voice-assistant

2. **Get API Keys**

Google Gemini API Key: [Get it here](https://makersuite.google.com/app/apikey)
ElevenLabs API Key: [Get it here](https://elevenlabs.io)

3. **Insert API Keys**

Open script.js and replace:
const elevenLabsApiKey = "YOUR_ELEVENLABS_API_KEY";
const geminiApiKey = "YOUR_GEMINI_API_KEY";

4. **Run the project**

Simply open index.html in your browser.

## 🎯How to Use

Click on "🎤 Start Talking".
Speak your question or command.
The AI will process your speech, display the response in the chat, and read it aloud.
<img width="1132" height="577" alt="image" src="https://github.com/user-attachments/assets/67662c5b-dc0d-45ee-b72b-e9bd6b1c5ece" />


## ⚠️ Notes
This project requires an internet connection to call the APIs.
Speech recognition works best in Chrome and Edge.
Keep your API keys private and never commit them to public repositories.
