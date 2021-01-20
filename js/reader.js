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

// Handle the loop button click
Loop.addEventListener("click", toggleLoop, false);

// Handle the Previous button click
Previous.addEventListener("click", playLastMusic, false);

// Handle the PlayPause button click
PlayPause.addEventListener("click", togglePlayPause, false);

// Handle the Next button click
Next.addEventListener("click", playNextMusic, false);

// Handle the Random button click
Random.addEventListener("click", toggleRandom, false);

// Handle the Mute button click
Mute.addEventListener("click", toggleMute, false);

// Handle the volume slider actions
Volume.addEventListener("input", function() {
	MusicPlayer.volume = this.value / 100;
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
															  "color-stop(" + percent + "%, rgb(50, 50, 50))" +
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
MusicPlayer.addEventListener("volumechange", function() {
	var playerVolume = this.volume;
	if (playerVolume != 0) {
		Mute.src = "../../img/audio-on.png";
	}else {
		Mute.src = "../../img/audio-off.png";
	}
	var percent = playerVolume * 100;
	document.getElementById("Volume").value = percent;
	document.getElementById("Volume").style.backgroundImage = "-webkit-gradient(linear, left top, right top, " +
								 							  "color-stop(" + percent + "%, #FFF), " +
								 							  "color-stop(" + percent + "%, #0B0B0B)" +
								 							  ")";
});

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
