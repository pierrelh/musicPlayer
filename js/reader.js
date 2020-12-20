var MusicPlayer = document.getElementById("MusicPlayer");
var Loop = document.getElementById("Loop");
var Previous = document.getElementById("Previous");
var PlayPause = document.getElementById("PlayPause");
var Next = document.getElementById("Next");
var Random = document.getElementById("Random");
var Mute = document.getElementById("Mute");
var Volume = document.getElementById("Volume");
var ProgressBar = document.getElementById("ProgressBar");
var Time = document.getElementById("Time");
var Start = document.getElementById("Start");
console.log(MusicPlayer.volume);

// Handle the loop button click
Loop.addEventListener("click", function() {
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
Previous.addEventListener("click", playLastMusic, false);

// Handle the PlayPause button click
PlayPause.addEventListener("click", togglePlayPause, false);

// Handle the Next button click
Next.addEventListener("click", playNextMusic, false);

// Handle the Random button click
Random.addEventListener("click", function() {
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
Mute.addEventListener("click", toggleMute, false);

// Handle the volume slider actions
Volume.addEventListener("input", function() {
	MusicPlayer.volume = this.value / 100;
	if (MusicPlayer.volume != 0) {
		Mute.src = "../../img/audio-on.png";
	}else {
		Mute.src = "../../img/audio-off.png";
	}
	var percent = (this.value / 100) * 100;
	this.style.backgroundImage = "-webkit-gradient(linear, left top, right top, " +
								 "color-stop(" + percent + "%, #FFF), " +
								 "color-stop(" + percent + "%, #0B0B0B)" +
								 ")";
})

// Handle the load of metadata of the MusicPlayer
MusicPlayer.addEventListener("loadedmetadata", function() {
	ProgressBar.max = this.duration;
	Time.innerHTML = getTime(this.duration);
});

// Handle the on time update of the MusicPlayer
MusicPlayer.addEventListener("timeupdate", function() {
	ProgressBar.value = this.currentTime;
	Start.innerHTML = getTime(this.currentTime);
	var percent = (ProgressBar.value / (ProgressBar.max - ProgressBar.min)) * 100;
	document.getElementById("ProgressBar").style.backgroundImage = "-webkit-gradient(linear, left top, right top, " +
															  "color-stop(" + percent + "%, #FFF), " +
															  "color-stop(" + percent + "%, #0B0B0B)" +
															  ")";
});

// Handle the on pause of the MusicPlayer
MusicPlayer.addEventListener("pause", function() {
	PlayPause.src = "../../img/play.png";
});

// Handle the on play of the MusicPlayer
MusicPlayer.addEventListener("play", function() {
	PlayPause.src = "../../img/pause.png";
});

// Handle the volume change of the MusicPlayer
MusicPlayer.addEventListener("volumechange", volumeChange, false);

// Handle the on ended of the MusicPlayer
MusicPlayer.addEventListener("ended", function() {
	if (this.src != "") {
		playNextMusic(false);
	}
});

// Handle the input of the ProgressBar
ProgressBar.addEventListener("input", function() {
	MusicPlayer.currentTime = MusicPlayer.duration / this.max * this.value;
});
