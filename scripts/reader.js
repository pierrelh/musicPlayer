class Reader {
	constructor() {
		this.Time			= document.getElementById("Time");
		this.Start			= document.getElementById("Start");
		this.Player 		= document.getElementById("MusicPlayer");
		this.PlaylistBtn	= document.getElementById("PlaylistBtn");
		this.Loop			= document.getElementById("Loop");
		this.LoopType		= "all"
		this.PlayPause		= document.getElementById("PlayPause");
		this.Random			= document.getElementById("Random");
		this.IsRandom 		= false;
		this.Mute			= document.getElementById("Mute");
		this.IsMute 		= false;	
		this.Next			= document.getElementById("Next");
		this.VolumeBar		= document.getElementById("Volume");
		this.Volume			= 0;
		this.Previous		= document.getElementById("Previous");
		this.ProgressBar	= document.getElementById("ProgressBar");
		this.MusicName		= document.getElementById("MusicName");
		this.PlayedMusic	= undefined;
		
		// Handle the load of metadata of the MusicPlayer
		this.Player.addEventListener("loadedmetadata", evt => this.Load());
		
		// Handle the on time update of the MusicPlayer
		this.Player.addEventListener("timeupdate", evt => this.TimeUpdate());
		
		// Handle the on pause of the MusicPlayer
		this.Player.addEventListener("pause", evt => this.TogglePlayPause());
		
		// Handle the on play of the MusicPlayer
		this.Player.addEventListener("play", evt => this.TogglePlayPause());
		
		// Handle the volume change of the MusicPlayer
		this.Player.addEventListener("volumechange", evt => this.VolumeChange());
		
		// Handle the on ended of the MusicPlayer
		this.Player.addEventListener("ended", evt => this.Ended());

		// Handle the loop button click
		this.Loop.addEventListener("click", evt => this.ToggleLoop());

		// Handle the Previous button click
		this.Previous.addEventListener("click", evt => this.PlayPreviousMusic());

		// Handle the Previous button click
		this.PlayPause.addEventListener("click", evt => this.TogglePlayPauseButton());
		
		// Handle the Random button click
		this.Random.addEventListener("click", evt => this.ToggleRandom());

		// Handle the Next button click
		this.Next.addEventListener("click", evt => this.PlayNextMusic(true));
		
		// Handle the Mute button click
		this.Mute.addEventListener("click", evt => this.ToggleMute());

		// Handle the volume slider actions
		this.VolumeBar.addEventListener("input", evt => this.VolumeBarChange())
		
		// Handle the input of the ProgressBar
		this.ProgressBar.addEventListener("input", evt => this.ChangeTime());
		
		// Handle the Playlist Reader button click
		this.PlaylistBtn.addEventListener("click", evt => this.TogglePlaylist());
	}

	ChangeTime() {
		this.Player.currentTime = this.Player.duration / this.ProgressBar.max * this.ProgressBar.value;
	}

	// Remove 10% to the player's volume
	DicreaseVolume() {
		if (this.Player.volume <= 0.1) {
			this.Player.volume = 0;		
		}else {
			this.Player.volume -= 0.1
		}
	}

	Ended() {
		if (this.src != "") {
			this.PlayNextMusic(false);
		}
	}

	// Add 10% to the player's volume
	IncreaseVolume() {
		if (this.Player.volume >= 0.9) {
			this.Player.volume = 1;		
		}else {
			this.Player.volume += 0.1
		}
	}

	Load() {
		this.ProgressBar.max = this.Player.duration;
		this.Time.innerHTML = getTime(this.Player.duration);
	}

	// Play the passed music
	PlayMusic(music) {
	
		// Adding the class to LibraryObjects if needed
		var library = document.getElementById("LibraryObjects");
		if (!library.classList.contains("library-reader-active")) {
			library.classList.add("library-reader-active");
		}
		
		// Adding the class to divPlaylist if needed
		var playlist = document.getElementById("DivPlaylist");
		if (!playlist.classList.contains("playlist-reader-showed")) {
			playlist.classList.add("playlist-reader-showed");
		}
	
		// Setting the mediaSession metadatas
		if ('mediaSession' in navigator) {
			mediaSessionSetData(music)
		}

		this.PlayedMusic = music;
		this.MusicName.innerHTML = music.Artist + " - " + music.Title;
		this.Player.src = music.URL;
		music.SetPlayed()
	
		// Adding the class to audioPlayer if needed
		var audioPlayer = document.getElementById("AudioPlayer");
		if (!audioPlayer.classList.contains("show")) {
			audioPlayer.classList.add("show");
		}
	}

	// Handle the play of the next music asked by the user
	PlayNextMusic(isSkiped) {	
		// Check if the reader should loop on the same music or not
		if (!isSkiped && this.LoopType == "one") {
			this.PlayMusic(this.PlayedMusic); // Replay the current music
		}else {
			// Choose witch playlist to use
			if (this.isRandom) {
				var usedPlaylist = MusicsRandomPlaylist.slice();
			}else {
				var usedPlaylist = MusicsPlaylist.slice();
			}

			var indexOfCurrentMusic = usedPlaylist.findIndex(x => x.ID === this.PlayedMusic.ID); // Getting the position of the current music in the playlist
			if (indexOfCurrentMusic == (usedPlaylist.length) - 1) { // Check if the played music is the last one
				if (this.LoopType == "none") { // The player will not restart the playlist
					return;
				}else { // The player will restart the playlist
					var indexOfNextMusic = 0;
				}
			}else { // The player continu the playlist
				var indexOfNextMusic = indexOfCurrentMusic + 1;
			}
			this.PlayMusic(usedPlaylist[indexOfNextMusic]);
		}
	}

	// Handle the play of the previous music asked by the user
	PlayPreviousMusic() {
		// Choose witch playlist to use
		if (this.IsRandom) {
			var usedPlaylist = MusicsRandomPlaylist.slice();
		}else {
			var usedPlaylist = MusicsPlaylist.slice();
		}
		
		var indexOfCurrentMusic = usedPlaylist.indexOf(parseInt(this.PlayedMusic)); // Getting the position of the current music in the playlist
		if (this.Player.currentTime < 5) {
			if (indexOfCurrentMusic == 0) { // Check if the played music is the first one
				var indexOfNextMusic = 0;
			}else { // The player rollback the playlist
				var indexOfNextMusic = indexOfCurrentMusic - 1;
			}	
			// Play the previous music
			this.PlayMusic(usedPlaylist[indexOfNextMusic]);
		} else {
			// Rollback the current music
			this.PlayMusic(usedPlaylist[indexOfCurrentMusic]);
		}
	}

	// Progress -10 secondes to the played music
	SeekBackward() {
		this.Player.currentTime -= 10;
	}

	// Progress +10 secondes to the played music
	SeekForward() {
		this.Player.currentTime += 10;
	}

	// Seek the music player to the wanted second
	SeekTo(data) {
		if (data.fastSeek) {
			startSeeking();
		} else {
			stopSeeking();
			this.Player.currentTime = data.seekTime;
		}
	}

	// Stop the music player
	StopMusic() {
		this.Player.pause();
		this.Player.currentTime = 0;
	}

	TimeUpdate() {
		this.ProgressBar.value = this.Player.currentTime;
		this.Start.innerHTML = getTime(this.Player.currentTime);
		var percent = (this.ProgressBar.value / (this.ProgressBar.max - this.ProgressBar.min)) * 100;
		this.ProgressBar.style.backgroundImage =	"-webkit-gradient(linear, left top, right top, " +
													"color-stop(" + percent + "%, #FFF), " +
													"color-stop(" + percent + "%, rgb(50, 50, 50))" +
													")";
	}

	ToggleLoop() {
		switch (this.LoopType) {
			case "one": // Setting loop to none
				this.LoopType = "none";
				this.Loop.src = "../../img/no-loop.png";
				break;
		
			case "all": // Setting loop to one
				this.LoopType = "one";
				this.Loop.src = "../../img/loop-one.png";
				break;
		
			case "none": // Setting loop to all
				this.LoopType = "all";
				this.Loop.src = "../../img/loop.png";
				break;
		
			default: // Default: Setting loop to all
				this.LoopType = "all";
				this.Loop.src = "../../img/loop.png";
				break;
		}
	}

	// Handle the Mute button actions
	ToggleMute() {
		if (this.IsMute) {
			this.Player.volume = this.Volume;
			this.Mute.src = "../../img/audio-on.png";
			this.IsMute = false;		
		} else {
			this.Volume = this.Player.volume;
			this.Player.volume = 0;
			this.Mute.src = "../../img/audio-off.png";
			this.IsMute = true;		
		}
	}

	// Toggle playlist reader section
	TogglePlaylist() {
		if (this.PlaylistBtn.classList.contains("show-playlist-reader")) {
			this.PlaylistBtn.classList.remove("show-playlist-reader");		
		}else {
			this.PlaylistBtn.classList.add("show-playlist-reader");
		}
	}

	TogglePlayPause() {
		switch (this.Player.paused) {
			case true: // Play the audio
				this.PlayPause.src = "../../img/play.png";
				break;
		
			case false: // Pause the audio
				this.PlayPause.src = "../../img/pause.png";
				break;
		}
	}

	TogglePlayPauseButton() {
		switch (this.Player.paused) {
			case true: // Play the audio
				this.Player.play();
				break;
		
			case false: // Pause the audio
				this.Player.pause();
				break;
		}
	}

	// Handle the Random button actions
	ToggleRandom() {
		if (this.IsRandom) {
			this.IsRandom = false;
			this.Random.src = "../../img/no-random.png";			
		} else {
			console.log("random")
			MusicsRandomPlaylist = MusicsPlaylist.slice();
			shuffle(MusicsRandomPlaylist); // Creating the random playlist
			console.log(MusicsRandomPlaylist)
			this.IsRandom = true;
			this.Random.src = "../../img/random.png";
		}
	}

	VolumeBarChange() {
		this.Player.volume = this.VolumeBar.value / 100;
	}

	VolumeChange() {
		if (this.Player.volume != 0) {
			this.Mute.src = "../../img/audio-on.png";
		}else {
			this.Mute.src = "../../img/audio-off.png";
		}
		var percent = this.Player.volume * 100;
		this.VolumeBar.value = percent;
		this.VolumeBar.style.backgroundImage =	"-webkit-gradient(linear, left top, right top, " +
												"color-stop(" + percent + "%, #FFF), " +
												"color-stop(" + percent + "%, #0B0B0B)" +
												")";
	}
}

var reader = new Reader();