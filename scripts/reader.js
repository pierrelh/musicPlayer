class ReaderLoop {
	constructor() {
		this.Element 	= document.getElementById("Loop");
		this.Type 		= "all";

		// Handle the loop button click
		this.Element.addEventListener("click", evt => this.Toggle());
		return this;
	}

	Toggle() {
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

class ReaderPrevious {
	constructor() {
		this.Element 	= document.getElementById("Previous");
		this.Type 		= "all";

		// Handle the Previous button click
		this.Element.addEventListener("click", evt => this.PlayLastMusic());
		return this;
	}

	PlayLastMusic() {
		console.log("Playing last music")
	}
}

class ReaderPlayPause {
	constructor() {
		this.Element 	= document.getElementById("PlayPause");
		this.Type 		= "all";

		// Handle the Previous button click
		this.Element.addEventListener("click", evt => this.Toggle());
		return this;
	}

	Toggle() {
		console.log("Playing / Pausing")
		switch (reader.MusicPlayer.paused) {
			case true: // Play the audio
				this.Element.src = "../../img/pause.png";
				reader.MusicPlayer.play();
				break;
		
			case false: // Pause the audio
				this.Element.src = "../../img/play.png";
				reader.MusicPlayer.pause();
				break;
		
			default: // Default: Pause the audio
				this.Element.src = "../../img/play.png";
				reader.MusicPlayer.pause();
				break;
		}
	}
}

class Reader {
	constructor() {
		this.MusicPlayer	= document.getElementById("MusicPlayer");
		this.Loop			= new ReaderLoop();
		this.Previous		= new ReaderPrevious();
		this.PlayPause		= new ReaderPlayPause();
		this.Next			= document.getElementById("Next");
		this.Random			= document.getElementById("Random");
		this.Mute			= document.getElementById("Mute");
		this.Volume			= document.getElementById("Volume");
		this.ProgressBar	= document.getElementById("ProgressBar");
		this.Time			= document.getElementById("Time");
		this.Start			= document.getElementById("Start");
		this.PlaylistBtn	= document.getElementById("PlaylistBtn");
				
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

var reader = new Reader();