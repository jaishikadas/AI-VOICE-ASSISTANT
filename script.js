const startBtn = document.getElementById("startBtn");
const chatBox = document.getElementById("chatBox");

// ✅ API Keys
const elevenLabsApiKey = "sk_9b530b4fdd57af60203717c82abf3d8e486c0904c2bad200";
const geminiApiKey = "AIzaSyD5IBXsERW_W1CWqrC-d2R8lRObYh-K4ow";

// 🎤 Speech-to-Text Function
function captureSpeech() {
  const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
  recognition.lang = "en-US";
  recognition.start();

  recognition.onstart = () => {
    console.log("Voice recognition started");
    startBtn.innerText = "🎤 Listening...";
  };

  recognition.onend = () => {
    startBtn.innerText = "🎤 Start Talking";
  };

  recognition.onresult = async (event) => {
    const transcript = event.results[0][0].transcript;
    addMessage("User", transcript, "user");

    const thinkingMsg = addMessage("AI", "Thinking...", "ai");

    const aiResponse = await getGeminiResponse(transcript);

    thinkingMsg.innerHTML = `<strong>AI:</strong> ${aiResponse}`;
    speak(aiResponse);
  };

  recognition.onerror = (event) => {
    console.error("Speech Recognition Error:", event.error);
    alert("Speech Recognition Error: " + event.error);
  };
}

// 💬 Add message to chat window
function addMessage(sender, text, type) {
  const message = document.createElement("div");
  message.classList.add("message", type);
  message.innerHTML = `<strong>${sender}:</strong> ${text}`;
  chatBox.appendChild(message);
  chatBox.scrollTop = chatBox.scrollHeight;
  return message;
}

// 🤖 Get response from Gemini 1.5 Flash
async function getGeminiResponse(userInput) {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${geminiApiKey}`;

  const body = {
    contents: [
      {
        parts: [{ text: userInput }]
      }
    ]
  };

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body)
    });

    const data = await response.json();

    if (data.candidates && data.candidates.length > 0) {
      return data.candidates[0].content.parts[0].text || "I'm not sure how to respond to that.";
    } else {
      console.error("No candidates returned:", data);
      return "Hmm... I didn’t catch that.";
    }
  } catch (error) {
    console.error("Gemini Flash API Error:", error);
    return "There was an error connecting to the AI.";
  }
}

// 🔊 Speak AI response using ElevenLabs TTS
async function speak(text) {
  const voiceId = "EXAVITQu4vr4xnSDxMaL";
  const ttsUrl = `https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`;

  const headers = {
    "xi-api-key": elevenLabsApiKey,
    "Content-Type": "application/json",
    "Accept": "audio/mpeg"
  };

  const body = {
    text: text,
    model_id: "eleven_monolingual_v1",
    voice_settings: {
      stability: 0.5,
      similarity_boost: 0.5
    }
  };

  try {
    const response = await fetch(ttsUrl, {
      method: "POST",
      headers: headers,
      body: JSON.stringify(body)
    });

    if (!response.ok) {
      console.error("TTS API error:", response.statusText);
      return;
    }

    const audioBlob = await response.blob();
    const audioUrl = URL.createObjectURL(audioBlob);
    const audio = new Audio(audioUrl);
    audio.play();
  } catch (error) {
    console.error("ElevenLabs TTS Error:", error);
  }
}

// 👂 Start voice recognition on button click
startBtn.addEventListener("click", captureSpeech);
