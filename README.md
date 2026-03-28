# Voice Recorder App

A simple, modern, native web application for recording your voice locally using your device's microphone. Built with beautiful glassmorphism ui design, no third-party plugin dependencies, and plain Vanilla HTML, CSS, and JavaScript.

## 🌟 Features

- **Microphone Access**: Natively hooks into your browser's `MediaRecorder` API.
- **Modern Interface**: Deep, vibrant blue/purple aesthetics utilizing Inter typography and smooth glow animations when actively recording.
- **Audio Playback**: Automatically preview your recording locally prior to saving to your PC.
- **Audio Download**: Download timestamps-named copies of your webm voice audio files seamlessly.

## 🚀 Getting Started

Since it uses native browser web features like `getUserMedia`, it requires a secure context (e.g. `localhost` or `https`). You can start a server easily natively in Python.

1. Clone or download the repository.
2. Open a terminal and navigate to this folder.
3. Start a local server:

   ```bash
   python3 -m http.server 8000
   ```
4. Open your browser to `http://localhost:8000`.
5. Grant Microphone access when the browser prompts.
6. Push the big red Recording Button and have fun!

## 🛠️ Built With

- **HTML5 & Vanilla JavaScript**: Leveraging native browser support structure.
- **Vanilla CSS**: Specifically configured for an attractive Glassmorphism visual interface.
- **FontAwesome** (Linked via CDN for iconography).
