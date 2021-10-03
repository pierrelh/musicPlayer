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

		this.Player.addEventListener("loadedmetadata", evt => this.Load());
		this.Player.addEventListener("timeupdate", evt => this.TimeUpdate());
		this.Player.addEventListener("pause", evt => this.TogglePlayPause());
		this.Player.addEventListener("play", evt => this.TogglePlayPause());
		this.Player.addEventListener("volumechange", evt => this.VolumeChange());
		this.Player.addEventListener("ended", evt => this.Ended());
		this.Loop.addEventListener("click", evt => this.ToggleLoop());
		this.Previous.addEventListener("click", evt => this.PlayPreviousMusic());
		this.PlayPause.addEventListener("click", evt => this.TogglePlayPauseButton());
		this.Random.addEventListener("click", evt => this.ToggleRandom());
		this.Next.addEventListener("click", evt => this.PlayNextMusic(true));
		this.Mute.addEventListener("click", evt => this.ToggleMute());
		this.VolumeBar.addEventListener("input", evt => this.VolumeBarChange())
		this.ProgressBar.addEventListener("input", evt => this.ChangeTime());
		this.PlaylistBtn.addEventListener("click", evt => this.TogglePlaylist());
	}

	ChangeTime() {
		this.Player.currentTime = this.Player.duration / this.ProgressBar.max * this.ProgressBar.value;
	}

	// Remove 10% to the player's volume
	DicreaseVolume() {
		if (this.Player.volume <= 0.1)
			this.Player.volume = 0;
		else
			this.Player.volume -= 0.1;
	}

	Ended() {
		if (this.src != "")
			this.PlayNextMusic(false);
	}

	// Set Time to the right format
	FormatTime(t) {
		let m = ~~(t / 60),
		s = ~~(t % 60);
		return (m < 10 ? "0" + m : m) + ":" + (s < 10 ? "0" + s : s);
	}

	// Add 10% to the player's volume
	IncreaseVolume() {
		if (this.Player.volume >= 0.9)
			this.Player.volume = 1;
		else
			this.Player.volume += 0.1;
	}

	Load() {
		this.ProgressBar.max = this.Player.duration;
		this.Time.innerHTML = this.FormatTime(this.Player.duration);
	}

	// Play the passed music
	PlayMusic(music) {
		// Adding the class to Library if needed
		var library = document.getElementById("Library");
		if (!library.classList.contains("library-reader-active"))
			library.classList.add("library-reader-active");

		// Adding the class to divPlaylist if needed
		var playlist = document.getElementById("DivPlaylist");
		if (!playlist.classList.contains("playlist-reader-showed"))
			playlist.classList.add("playlist-reader-showed");

		// Setting the mediaSession metadatas
		if (mediaSession.IsActive)
			mediaSession.SetData(music);

		this.PlayedMusic = music;
		this.MusicName.innerHTML = music.Artist + " - " + music.Title;
		this.Player.src = music.URL;
		music.SetPlayed();

		// Adding the class to audioPlayer if needed
		var audioPlayer = document.getElementById("AudioPlayer");
		if (!audioPlayer.classList.contains("show"))
			audioPlayer.classList.add("show");
	}

	// Handle the play of the next music asked by the user
	PlayNextMusic(isSkiped) {
		// Check if the reader should loop on the same music or not
		if (!isSkiped && this.LoopType == "one") {
			this.PlayMusic(this.PlayedMusic); // Replay the current music
		} else {
			// Choose witch playlist to use
			if (this.IsRandom)
				var usedPlaylist = library.MusicsRandomPlaylist.slice();
			else
				var usedPlaylist = library.MusicsPlaylist.slice();

			var indexOfCurrentMusic = usedPlaylist.findIndex(x => x.ID === this.PlayedMusic.ID); // Getting the position of the current music in the playlist
			if (indexOfCurrentMusic == (usedPlaylist.length) - 1) { // Check if the played music is the last one
				if (this.LoopType == "none") { // The player will not restart the playlist
					return;
				} else { // The player will restart the playlist
					var indexOfNextMusic = 0;
				}
			} else { // The player continu the playlist
				var indexOfNextMusic = indexOfCurrentMusic + 1;
			}
			this.PlayMusic(usedPlaylist[indexOfNextMusic]);
		}
	}

	// Handle the play of the previous music asked by the user
	PlayPreviousMusic() {
		// Choose witch playlist to use
		let usedPlaylist
		if (this.IsRandom)
			usedPlaylist = library.MusicsRandomPlaylist.slice();
		else
			usedPlaylist = library.MusicsPlaylist.slice();

		let indexOfCurrentMusic = usedPlaylist.findIndex(x => x.ID === this.PlayedMusic.ID); // Getting the position of the current music in the playlist
		if (this.Player.currentTime < 5) {
			if (indexOfCurrentMusic == 0) { // Check if the played music is the first one
				var indexOfNextMusic = 0;
			} else { // The player rollback the playlist
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
		this.Start.innerHTML = this.FormatTime(this.Player.currentTime);
		let percent = (this.ProgressBar.value / (this.ProgressBar.max - this.ProgressBar.min)) * 100;
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
		if (this.PlaylistBtn.classList.contains("show-playlist-reader"))
			this.PlaylistBtn.classList.remove("show-playlist-reader");
		else
			this.PlaylistBtn.classList.add("show-playlist-reader");
	}

	TogglePlayPause() {
		if (this.Player.paused)
			this.PlayPause.src = "../../img/play.png";
		else
			this.PlayPause.src = "../../img/pause.png";
	}

	TogglePlayPauseButton() {
		if (this.Player.paused)
			this.Player.play();
		else
			this.Player.pause();
	}

	// Handle the Random button actions
	ToggleRandom() {
		if (this.IsRandom) {
			this.IsRandom = false;
			this.Random.src = "../../img/no-random.png";
		} else {
			library.MusicsRandomPlaylist = library.MusicsPlaylist.slice();
			library.ShuffleMusics(); // Creating the random playlist
			this.IsRandom = true;
			this.Random.src = "../../img/random.png";
		}
	}

	VolumeBarChange() {
		this.Player.volume = this.VolumeBar.value / 100;
	}

	VolumeChange() {
		if (this.Player.volume != 0)
			this.Mute.src = "../../img/audio-on.png";
		else
			this.Mute.src = "../../img/audio-off.png";

		var percent = this.Player.volume * 100;
		this.VolumeBar.value = percent;
		this.VolumeBar.style.backgroundImage =	"-webkit-gradient(linear, left top, right top, " +
												"color-stop(" + percent + "%, #FFF), " +
												"color-stop(" + percent + "%, #0B0B0B)" +
												")";
	}
}

const reader = new Reader();