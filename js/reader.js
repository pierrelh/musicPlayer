// Handle the loop button click
document.getElementById("Loop").addEventListener("click", function() {
    var loopType = this.dataset.loop;
    switch (loopType) {
        case "one": // Setting loop to none
            this.dataset.loop = "none";
            this.src = "../../img/no-loop.png";
            break;
    
        case "all": // Setting loop to one
            this.dataset.loop = "one";
            this.src = "../../img/loop-one.png";
            break;
    
        case "none": // Setting loop to all
            this.dataset.loop = "all";
            this.src = "../../img/loop.png";
            break;
    
        default: // Default: Setting loop to all
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
document.getElementById("PlayPause").addEventListener('click', playPause(), false);

// Handle the Next button click
document.getElementById("Next").addEventListener("click", function() {
    console.log("Next clicked")
})

// Handle the Random button click
document.getElementById("Random").addEventListener("click", function() {
    var randomType = this.dataset.random;
    switch (randomType) {
        case "true": // Setting random to false
            this.dataset.random = "false";
            this.src = "../../img/no-random.png";
            break;
  
        case "false": // Setting random to true
            randomPlaylist = playlist.slice();
            shuffle(randomPlaylist); // Creating the random playlist
            this.dataset.random = "true";
            this.src = "../../img/random.png";
            break;
  
        default: // Default: Setting random to false
            this.dataset.random = "false";
            this.src = "../../img/no-random.png";
            break;
    }
});

// Handle the Mute button click
document.getElementById("Mute").addEventListener("click", function() {
    var isMute = this.dataset.mute;
    var player = document.getElementById('musicPlayer');
    switch (isMute) {
        case "true": // Setting the audio on
            player.volume = this.dataset.volume;
            this.src = "../../img/audio-on.png";
            this.dataset.mute = "false";
    
        case "false": // Setting the audio off
            player.volume = 0;
            this.src = "../../img/audio-off.png";
            this.dataset.mute = "true";
    
        default: // Default: Setting the audio on
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
