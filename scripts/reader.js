class Reader {
	constructor() {
		this.Loop
		this.Previous
		this.PlayPause
		this.Next
		this.Random
		this.Mute
		this.Volume
		this.ProgressBar
		this.PlaylistBtn
		this.Time			= document.getElementById("Time");
		this.Start			= document.getElementById("Start");
		this.Player = document.getElementById("MusicPlayer");
		
		// Handle the load of metadata of the MusicPlayer
		this.Player.addEventListener("loadedmetadata", this.Load());
		
		// Handle the on time update of the MusicPlayer
		this.Player.addEventListener("timeupdate", this.TimeUpdate());
		
		// Handle the on pause of the MusicPlayer
		this.Player.addEventListener("pause", this.TogglePlayPause());
		
		// Handle the on play of the MusicPlayer
		this.Player.addEventListener("play", this.TogglePlayPause());
		
		// Handle the volume change of the MusicPlayer
		this.Player.addEventListener("volumechange", this.VolumeChange());
		
		// Handle the on ended of the MusicPlayer
		this.Player.addEventListener("ended", this.Ended());
	}

	Hydrate() {
		this.PlaylistBtn	= new ReaderProgressBar();
		this.Loop			= new ReaderLoop();
		this.PlayPause		= new ReaderPlayPause();
		this.Random			= new ReaderRandom();
		this.Mute			= new ReaderMute();
		
		this.Next			= new ReaderNext();
		this.Volume			= new ReaderVolume();
		this.Previous		= new ReaderPrevious();
		this.ProgressBar	= new ReaderProgressBar();
	}

	Ended() {
		if (this.src != "") {
			reader.Next.Element.PlayNext(false);
		}
	}

	Load() {
		reader.ProgressBar.Element.max = this.duration;
		reader.Time.innerHTML = getTime(this.duration);
	}

	TimeUpdate() {
		reader.ProgressBar.Element.value = this.currentTime;
		reader.Start.innerHTML = getTime(this.currentTime);
		var percent = (reader.ProgressBar.Element.value / (reader.ProgressBar.Element.max - reader.ProgressBar.Element.min)) * 100;
		document.getElementById("ProgressBar").style.backgroundImage =	"-webkit-gradient(linear, left top, right top, " +
																		"color-stop(" + percent + "%, #FFF), " +
																		"color-stop(" + percent + "%, rgb(50, 50, 50))" +
																		")";
	}

	TogglePlayPause() {
		reader.PlayPause.Toggle();
	}

	VolumeChange() {
		if (this.volume != 0) {
			reader.Mute.src = "../../img/audio-on.png";
		}else {
			reader.Mute.src = "../../img/audio-off.png";
		}
		var percent = playerVolume * 100;
		reader.Volume.value = percent;
		reader.Volume.style.backgroundImage =	"-webkit-gradient(linear, left top, right top, " +
												"color-stop(" + percent + "%, #FFF), " +
												"color-stop(" + percent + "%, #0B0B0B)" +
												")";
	}
}

var reader = new Reader();

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

	// Handle the play of the previous music asked by the user
	PlayLastMusic() {
		var playedMusicId = document.getElementById("MusicPlayer").dataset.musicPlayed; // Getting the id of the played music
		var player = document.getElementById("MusicPlayer");
		// Choose witch playlist to use
		if (reader.Random.IsRandom) {
			var usedPlaylist = randomPlaylist.slice();
		}else {
			var usedPlaylist = playlist.slice();
		}
		
		var indexOfCurrentSong = usedPlaylist.indexOf(parseInt(playedMusicId)); // Getting the position of the current song in the playlist
		if (player.currentTime < 5) {
			if (indexOfCurrentSong == 0) { // Check if the played music is the first one
				var indexOfNextSong = 0;
			}else { // The player rollback the playlist
				var indexOfNextSong = indexOfCurrentSong - 1;
			}	
			// Play the previous music
			playMusic(usedPlaylist[indexOfNextSong]);
		} else {
			// Rollback the current music
			playMusic(usedPlaylist[indexOfCurrentSong]);
		}
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
		switch (reader.Player.paused) {
			case true: // Play the audio
				this.Element.src = "../../img/pause.png";
				reader.Player.play();
				break;
		
			case false: // Pause the audio
				this.Element.src = "../../img/play.png";
				reader.Player.pause();
				break;
		
			default: // Default: Pause the audio
				this.Element.src = "../../img/play.png";
				reader.Player.pause();
				break;
		}
	}
}

class ReaderRandom {
	constructor() {
		this.Element 	= document.getElementById("Random");
		this.IsRandom 		= false;
		
		// Handle the Random button click
		this.Element.addEventListener("click", evt => this.Toggle());
		return this;
	}

	// Handle the Random button actions
	Toggle() {
		if (this.IsRandom) {
			this.IsRandom = false;
			this.Element.src = "../../img/no-random.png";			
		} else {
			randomPlaylist = playlist.slice();
			shuffle(randomPlaylist); // Creating the random playlist
			this.IsRandom = true;
			this.Element.src = "../../img/random.png";
		}
	}
}

class ReaderNext {
	constructor() {
		this.Element = document.getElementById("Next");
				
		// Handle the Next button click
		this.Element.addEventListener("click", evt => this.PlayNext(true));
		return this;
	}

	// Handle the play of the next music asked by the user
	PlayNext(isSkiped) {
		var isRandom = document.getElementById("Random").dataset.random; // Getting the random setting
		var playedMusicId = document.getElementById("MusicPlayer").dataset.musicPlayed; // Getting the id of the played music
		var loop = document.getElementById("Loop").dataset.loop; // Getting the loop setting
		if (isSkiped === undefined) {
			isSkiped = true;// Setting a default value if undefined
		}
	
		// Check if the reader should loop on the same music or not
		if (!isSkiped && loop == "one") {
			var indexOfNextSong = document.getElementById("MusicPlayer").dataset.musicPlayed; // Getting the id of the current music
		}else {
			// Choose witch playlist to use
			if (isRandom == "true") {
				var usedPlaylist = randomPlaylist.slice();
			}else {
				var usedPlaylist = playlist.slice();
			}
	
			var indexOfCurrentSong = usedPlaylist.indexOf(parseInt(playedMusicId)); // Getting the position of the current song in the playlist
			if (indexOfCurrentSong == (usedPlaylist.length) - 1) { // Check if the played music is the last one
				if (document.getElementById("Loop").dataset.loop == "none") { // The player will not restart the playlist
					return;
				}else { // The player will restart the playlist
					var indexOfNextSong = 0;
				}
			}else { // The player continu the playlist
				var indexOfNextSong = indexOfCurrentSong + 1;
			}
	
		}    
		// Play the next music
		playMusic(usedPlaylist[indexOfNextSong]);
	}
}

class ReaderMute {
	constructor() {
		this.Element = document.getElementById("Mute")
		this.IsMute = false;
		this.Volume = 0;
		
		// Handle the Mute button click
		this.Element.addEventListener("click", evt => this.Toggle());
		return this;
	}

	// Handle the Mute button actions
	Toggle() {
		if (this.IsMute) {
			reader.Player.volume = this.Volume;
			this.Element.src = "../../img/audio-on.png";
			this.IsMute = false;		
		} else {
			reader.Player.volume = 0;
			this.Element.src = "../../img/audio-off.png";
			this.IsMute = true;		
		}
	}
}

class ReaderVolume {
	constructor() {
		this.Element = document.getElementById("Volume")

		// Handle the volume slider actions
		this.Element.addEventListener("input", Change())
		return this;
	}

	Change() {
		reader.Player.volume = this.value / 100;
	}
}

class ReaderProgressBar {
	constructor() {
		this.Element = document.getElementById("ProgressBar")
		
		// Handle the input of the ProgressBar
		this.Element.addEventListener("input", this.ChangeTime());
		return this;
	}

	ChangeTime() {
		reader.Player.currentTime = reader.Player.duration / this.max * this.value;
	}
}

class ReaderPlaylist {
	constructor() {
		this.Element = document.getElementById("PlaylistBtn")
		
		// Handle the Playlist Reader button click
		this.Element.addEventListener("click", this.Toggle());
		return this;
	}

	// Toggle playlist reader section
	Toggle() {
		if (this.classList.contains("show-playlist-reader")) {
			this.classList.remove("show-playlist-reader");		
		}else {
			this.classList.add("show-playlist-reader");
		}
	}
}

reader.Hydrate()