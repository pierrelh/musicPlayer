class Reader {
	constructor() {
		this.MusicPlayer	= document.getElementById("MusicPlayer");
		this.Loop			= new Loop();
		this.Previous		= document.getElementById("Previous");
		this.PlayPause		= document.getElementById("PlayPause");
		this.Next			= document.getElementById("Next");
		this.Random			= document.getElementById("Random");
		this.Mute			= document.getElementById("Mute");
		this.Volume			= document.getElementById("Volume");
		this.ProgressBar	= document.getElementById("ProgressBar");
		this.Time			= document.getElementById("Time");
		this.Start			= document.getElementById("Start");
		this.PlaylistBtn	= document.getElementById("PlaylistBtn");
		
		// Handle the Previous button click
		this.Previous.addEventListener("click", playLastMusic, false);
		
		// Handle the PlayPause button click
		this.PlayPause.addEventListener("click", togglePlayPause, false);
		
		// Handle the Next button click
		this.Next.addEventListener("click", playNextMusic, false);
		
		// Handle the Random button click
		this.Random.addEventListener("click", toggleRandom, false);
		
		// Handle the Mute button click
		this.Mute.addEventListener("click", toggleMute, false);

		// Handle the volume slider actions
		this.Volume.addEventListener("input", evt => function() {
			this.MusicPlayer.volume = this.Volume.value / 100;
		})
		
		// Handle the load of metadata of the MusicPlayer
		this.MusicPlayer.addEventListener("loadedmetadata", evt => function() {
			this.ProgressBar.max = this.MusicPlayer.duration;
			this.Time.innerHTML = getTime(this.MusicPlayer.duration);
		});
		
		// Handle the on time update of the MusicPlayer
		this.MusicPlayer.addEventListener("timeupdate", evt => function() {
			this.ProgressBar.value = this.MusicPlayer.currentTime;
			this.Start.innerHTML = getTime(this.MusicPlayer.currentTime);
			var percent = (this.ProgressBar.value / (this.ProgressBar.max - this.ProgressBar.min)) * 100;
			document.getElementById("ProgressBar").style.backgroundImage =	"-webkit-gradient(linear, left top, right top, " +
																			"color-stop(" + percent + "%, #FFF), " +
																			"color-stop(" + percent + "%, rgb(50, 50, 50))" +
																			")";
		});
		
		// Handle the on pause of the MusicPlayer
		this.MusicPlayer.addEventListener("pause", evt => function() {
			this.PlayPause.src = "../../img/play.png";
		});
		
		// Handle the on play of the MusicPlayer
		this.MusicPlayer.addEventListener("play", evt => function() {
			this.PlayPause.src = "../../img/pause.png";
		});
		
		// Handle the volume change of the MusicPlayer
		this.MusicPlayer.addEventListener("volumechange", evt => function() {
			var playerVolume = this.volume;
			if (playerVolume != 0) {
				this.Mute.src = "../../img/audio-on.png";
			}else {
				this.Mute.src = "../../img/audio-off.png";
			}
			var percent = playerVolume * 100;
			document.getElementById("Volume").value = percent;
			document.getElementById("Volume").style.backgroundImage =	"-webkit-gradient(linear, left top, right top, " +
																		"color-stop(" + percent + "%, #FFF), " +
																		"color-stop(" + percent + "%, #0B0B0B)" +
																		")";
		});
		
		// Handle the on ended of the MusicPlayer
		this.MusicPlayer.addEventListener("ended", function() {
			if (this.src != "") {
				playNextMusic(false);
			}
		});
		
		// Handle the input of the ProgressBar
		this.ProgressBar.addEventListener("input", evt => this.ChangeTime());
		
		// Handle the Playlist Reader button click
		this.PlaylistBtn.addEventListener("click", togglePlaylistReaderSection, false);
	}

	ChangeTime() {
		this.MusicPlayer.currentTime = this.MusicPlayer.duration / this.ProgressBar.max * this.ProgressBar.value;
	}
}

class Loop {
	constructor() {
		this.Element 	= document.getElementById("Loop");
		this.Type 		= "all";

		// Handle the loop button click
		this.Element.addEventListener("click", this.Toggle());
	}

	Toggle() {
		console.log("toggle")
		switch (this.Type) {
			case "one": // Setting loop to none
				this.Type = "none";
				this.Element.src = "../../img/no-loop.png";
				break;
		
			case "all": // Setting loop to one
				this.Type = "one";
				this.Element.src = "../../img/loop-one.png";
				break;
		
			case "none": // Setting loop to all
				this.Type = "all";
				this.Element.src = "../../img/loop.png";
				break;
		
			default: // Default: Setting loop to all
				this.Type = "all";
				this.Element.src = "../../img/loop.png";
				break;
		}
	}
}

var reader = new Reader();