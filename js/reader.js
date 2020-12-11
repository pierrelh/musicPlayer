// Handle the loop button click
document.getElementById("Loop").addEventListener("click", function() {
    var loopType = this.dataset.loop;
    switch (loopType) {
        case "one":
            this.dataset.loop = "none";
            this.src = "../../img/no-loop.png";
            break;
    
        case "all":
            this.dataset.loop = "one";
            this.src = "../../img/loop-one.png";
            break;
    
        case "none":
            this.dataset.loop = "all";
            this.src = "../../img/loop.png";
            break;
    
        default:
            this.dataset.loop = "all";
            this.src = "../../img/loop.png";
            break;
    }
});

// Handle the Previous button click
document.getElementById("Previous").addEventListener("click", function() {
    console.log("Previous clicked")
})

// Handle the PlayPause button click
document.getElementById("PlayPause").addEventListener("click", function() {
    var player = document.getElementById('musicPlayer');
    var isPlaying = this.dataset.isPlaying;
    if (isPlaying == "true") { // Pause the audio
        this.src = "../../img/play.png";
        this.dataset.isPlaying = "false";
        player.pause();
    }else if (isPlaying == "false") { // Play the audio
        this.src = "../../img/pause.png";
        this.dataset.isPlaying = "true";
        player.play();
    }else {
        this.src = "../../img/play.png";
        this.dataset.isPlaying = "false";
        player.pause();
    }
})

// Handle the Next button click
document.getElementById("Next").addEventListener("click", function() {
    console.log("Next clicked")
})

// Handle the Random button click
document.getElementById("Random").addEventListener("click", function() {
    var randomType = this.dataset.random;
    switch (randomType) {
        case "true":
            this.dataset.random = "false";
            this.src = "../../img/no-random.png";
            break;
  
        case "false":
            randomPlaylist = shuffle(playlist);
            this.dataset.random = "true";
            this.src = "../../img/random.png";
            console.log(playlist);
            console.log(randomPlaylist);
            break;
  
        default:
            this.dataset.random = "false";
            this.src = "../../img/no-random.png";
            break;
    }
});

// Handle the Mute button click
document.getElementById("Mute").addEventListener("click", function() {
    var isMute = this.dataset.mute;
    var player = document.getElementById('musicPlayer');
    if (isMute == "true") {
        player.volume = this.dataset.volume;
        this.src = "../../img/audio-on.png";
        this.dataset.mute = "false";
    }else if (isMute == "false") {
        player.volume = 0;
        this.src = "../../img/audio-off.png";
        this.dataset.mute = "true";
    }else {
        player.volume = this.dataset.volume;
        this.src = "../../img/audio-on.png";
        this.dataset.mute = "false";
    }
})

// Handle the volume slider actions
document.getElementById("Volume").addEventListener("input", function() {
    var player = document.getElementById('musicPlayer');
    player.volume = this.value / 100;
    if (player.volume != 0) {
        document.getElementById("Mute").src = "../../img/audio-on.png";
    }else {
        document.getElementById("Mute").src = "../../img/audio-off.png";
    }
})
