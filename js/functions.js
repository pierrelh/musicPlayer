// Shuffle an array
function shuffle(a) {
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}

// Show the assets Background
function backgroundAppear() {
    var background = document.getElementById('background');
    background.className = 'background-appear';
}

// Hide the assets Background
function backgroundHide() {
    var background = document.getElementById('background');
    background.className = '';
}

// Handle the play/pause actions
function playPause() {
    var player = document.getElementById('musicPlayer');
    var isPlaying = document.getElementById("PlayPause").dataset.isPlaying;
    switch (isPlaying) {
        case "true": // Pause the audio
            document.getElementById("PlayPause").src = "../../img/play.png";
            document.getElementById("PlayPause").dataset.isPlaying = "false";
            player.pause();
            break;
    
        case "false": // Play the audio
            document.getElementById("PlayPause").src = "../../img/pause.png";
            document.getElementById("PlayPause").dataset.isPlaying = "true";
            player.play();
            break;
    
        default: // Default: Pause the audio
            document.getElementById("PlayPause").src = "../../img/play.png";
            document.getElementById("PlayPause").dataset.isPlaying = "false";
            player.pause();
            break;
    }
}