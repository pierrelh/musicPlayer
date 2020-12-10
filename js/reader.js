// Handle the loop button actions
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

// Handle the Previous button actions
document.getElementById('Previous').addEventListener("click", function() {
    console.log("Previous clicked")
})

// Handle the PlayPause button actions
document.getElementById('PlayPause').addEventListener("click", function() {
    var player = document.getElementById('musicPlayer');
    var isPlaying = this.dataset.isPlaying;
    if (isPlaying == "play") { // Pause the audio
        this.src = "../../img/play.png";
        this.dataset.isPlaying = "pause";
        player.pause();
    }else if (isPlaying == "play") { // Play the audio
        this.src = "../../img/pause.png";
        this.dataset.isPlaying = "play";
        player.play();
    }else {
        this.src = "../../img/play.png";
        this.dataset.isPlaying = "pause";
        player.pause();
    }
})

// Handle the Next button actions
document.getElementById('Next').addEventListener("click", function() {
    console.log("Next clicked")
})

// Handle the Random button actions
document.getElementById('Random').addEventListener("click", function() {
    var randomType = this.dataset.random;
    switch (randomType) {
      case true:
        this.dataset.random = false;
        this.src = "../../img/no-random.png";
        break;
  
      case false:
        this.dataset.random = true;
        this.src = "../../img/random.png";
        break;
  
      default:
        this.dataset.random = true;
        this.src = "../../img/random.png";
        break;
    }
});

// Handle the Mute button actions
document.getElementById('Mute').addEventListener("click", function() {
    var isMute = this.dataset.mute;
    var player = document.getElementById('musicPlayer');
    if (isMute) {
        player.volume = this.dataset.volume;
        this.src = "../../img/audio-on.png";
        this.dataset.mute = false;
    }else if (!isMute) {
        player.volume = 0;
        this.src = "../../img/audio-off.png";
        this.dataset.mute = true;
    }else {
        player.volume = this.dataset.volume;
        this.src = "../../img/audio-on.png";
        this.dataset.mute = false;
    }
})