document.addEventListener('DOMContentLoaded', () => {
    // UI Elements
    const recordBtn = document.getElementById('recordBtn');
    const micIcon = recordBtn.querySelector('i');
    const statusText = document.getElementById('statusText');
    const timerDisplay = document.getElementById('timerDisplay');
    const micContainer = document.getElementById('micContainer');
    
    const playbackSection = document.getElementById('playbackSection');
    const audioPlayback = document.getElementById('audioPlayback');
    const downloadBtn = document.getElementById('downloadBtn');
    const discardBtn = document.getElementById('discardBtn');

    // Recording variables
    let mediaRecorder;
    let audioChunks = [];
    let audioBlob;
    let audioUrl;
    let timerInterval;
    let elapsedSeconds = 0;
    let isRecording = false;

    // Format time (MM:SS)
    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60).toString().padStart(2, '0');
        const secs = (seconds % 60).toString().padStart(2, '0');
        return `${mins}:${secs}`;
    };

    // Update timer
    const updateTimer = () => {
        elapsedSeconds++;
        timerDisplay.textContent = formatTime(elapsedSeconds);
    };

    // Start Recording
    const startRecording = async () => {
        try {
            // Request microphone access
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            
            // Initialize MediaRecorder
            mediaRecorder = new MediaRecorder(stream);
            audioChunks = [];

            mediaRecorder.ondataavailable = (event) => {
                if (event.data.size > 0) {
                    audioChunks.push(event.data);
                }
            };

            mediaRecorder.onstop = () => {
                // Compile chunks into a single Blob when recording stops
                audioBlob = new Blob(audioChunks, { type: 'audio/webm' }); // Default browser format
                audioUrl = URL.createObjectURL(audioBlob);
                
                // Show playback section
                audioPlayback.src = audioUrl;
                playbackSection.classList.remove('hidden');
            };

            // Start recording chunks
            mediaRecorder.start();
            isRecording = true;
            
            // UI Updates
            recordBtn.classList.add('recording');
            micContainer.classList.add('recording');
            micIcon.classList.remove('fa-microphone');
            micIcon.classList.add('fa-stop');
            statusText.textContent = "Recording...";
            statusText.classList.add('recording-status');
            
            // Hide playback section if it was previously visible
            playbackSection.classList.add('hidden');
            
            // Start timer
            elapsedSeconds = 0;
            timerDisplay.textContent = "00:00";
            timerInterval = setInterval(updateTimer, 1000);

        } catch (error) {
            console.error("Error accessing microphone:", error);
            alert("Could not access microphone! Please check browser permissions.");
        }
    };

    // Stop Recording
    const stopRecording = () => {
        if (mediaRecorder && mediaRecorder.state !== 'inactive') {
            mediaRecorder.stop();
            isRecording = false;
            
            // Stop all tracks to release microphone
            mediaRecorder.stream.getTracks().forEach(track => track.stop());

            // UI Updates
            recordBtn.classList.remove('recording');
            micContainer.classList.remove('recording');
            micIcon.classList.remove('fa-stop');
            micIcon.classList.add('fa-microphone');
            statusText.textContent = "Recording Finished";
            statusText.classList.remove('recording-status');
            
            // Stop timer
            clearInterval(timerInterval);
        }
    };

    // Toggle Record Button Handler
    recordBtn.addEventListener('click', () => {
        if (!isRecording) {
            startRecording();
        } else {
            stopRecording();
        }
    });

    // Download Audio
    downloadBtn.addEventListener('click', () => {
        if (audioUrl) {
            const a = document.createElement('a');
            a.style.display = 'none';
            a.href = audioUrl;
            
            // Create a nice filename with current timestamp
            const date = new Date();
            const timestamp = date.toISOString().replace(/[:.]/g, '-').split('T')[0] + '_' + 
                            date.getHours() + '-' + date.getMinutes() + '-' + date.getSeconds();
            a.download = `VoiceRecord_${timestamp}.webm`;
            
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
        }
    });

    // Discard Audio
    discardBtn.addEventListener('click', () => {
        // Reset state
        audioChunks = [];
        audioBlob = null;
        if (audioUrl) {
            URL.revokeObjectURL(audioUrl);
            audioUrl = null;
        }
        
        // UI Updates
        playbackSection.classList.add('hidden');
        audioPlayback.src = "";
        statusText.textContent = "Ready to Record";
        elapsedSeconds = 0;
        timerDisplay.textContent = "00:00";
    });
});
