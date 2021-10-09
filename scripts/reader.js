// class Reader {
// 	constructor() {
// 		// this.PlaylistBtn	= document.getElementById("PlaylistBtn");
// 		// this.ReaderPlaylist	= document.getElementById("PlaylistReader");
// 		this.Previous		= document.getElementById("Previous");
// 		this.PlayedMusic	= undefined;

// 		this.Mute.addEventListener("click", evt => this.ToggleMute());
// 		this.VolumeBar.addEventListener("input", evt => this.VolumeBarChange())
// 		this.PlaylistBtn.addEventListener("click", evt => this.TogglePlaylist());
// 	}

// 	// Remove 10% to the player's volume
// 	DicreaseVolume() {
// 		if (this.Player.volume <= 0.1)
// 			this.Player.volume = 0;
// 		else
// 			this.Player.volume -= 0.1;
// 	}

// 	// Add 10% to the player's volume
// 	IncreaseVolume() {
// 		if (this.Player.volume >= 0.9)
// 			this.Player.volume = 1;
// 		else
// 			this.Player.volume += 0.1;
// 	}

// 	// Progress -10 secondes to the played music
// 	SeekBackward() {
// 		this.Player.currentTime -= 10;
// 	}

// 	// Progress +10 secondes to the played music
// 	SeekForward() {
// 		this.Player.currentTime += 10;
// 	}

// 	// Seek the music player to the wanted second
// 	SeekTo(data) {
// 		if (data.fastSeek) {
// 			startSeeking();
// 		} else {
// 			stopSeeking();
// 			this.Player.currentTime = data.seekTime;
// 		}
// 	}

// 	// Stop the music player
// 	StopMusic() {
// 		this.Player.pause();
// 		this.Player.currentTime = 0;
// 	}

// 	// Set Time to the right format
// 	FormatTime(t) {
// 		let m = ~~(t / 60),
// 		s = ~~(t % 60);
// 		return (m < 10 ? "0" + m : m) + ":" + (s < 10 ? "0" + s : s);
// 	}

// 	TimeUpdate() {
// 		this.ProgressBar.value = this.Player.currentTime;
// 		this.Start.innerHTML = this.FormatTime(this.Player.currentTime);
// 		let percent = (this.ProgressBar.value / (this.ProgressBar.max - this.ProgressBar.min)) * 100;
// 		this.ProgressBar.style.backgroundImage =	"-webkit-gradient(linear, left top, right top, " +
// 													"color-stop(" + percent + "%, #FFF), " +
// 													"color-stop(" + percent + "%, rgb(50, 50, 50))" +
// 													")";
// 	}

// 	// Toggle playlist reader section
// 	TogglePlaylist() {
// 		if (this.ReaderPlaylist.classList.contains("show-playlist-reader"))
// 			this.ReaderPlaylist.classList.remove("show-playlist-reader");
// 		else
// 			this.ReaderPlaylist.classList.add("show-playlist-reader");
// 	}

// 	VolumeChange() {
// 		if (this.Player.volume != 0)
// 			this.Mute.src = server + "/img/audio-on.png";
// 		else
// 			this.Mute.src = server + "/img/audio-off.png";

// 		var percent = this.Player.volume * 100;
// 		this.VolumeBar.value = percent;
// 		this.VolumeBar.style.backgroundImage =	"-webkit-gradient(linear, left top, right top, " +
// 												"color-stop(" + percent + "%, #FFF), " +
// 												"color-stop(" + percent + "%, rgb(50, 50, 50))" +
// 												")";
// 	}
// }

class MusicName {
	constructor() {
		this.Element	= document.getElementById("MusicName");
	}

	Change(name) {
		this.Element.innerHTML = name;
	}
}

const _musicName = new MusicName;

class Player {
	constructor() {
		this.Element		= document.getElementById("MusicPlayer");
		this.PlayedMusic	= undefined;

		this.Element.addEventListener("loadedmetadata", evt => this.Load);
		// this.Element.addEventListener("timeupdate", evt => this.TimeUpdate);
		// this.Element.addEventListener("volumechange", evt => this.VolumeChange);
		this.Element.addEventListener("ended", evt => this.Ended);
	}

	PlayMusic(music) {
		// Adding the class to Library if needed
		library.Reduce;
		playlistSection.Reduce;

		// Setting the mediaSession metadatas
		if (mediaSession.IsActive)
			mediaSession.SetData(music);

		_musicName.Change(music.Artist + " - " + music.Title);
		this.Element.src = music.URL;
		music.SetPlayed();

		// Adding the class to audioPlayer if needed
		var audioPlayer = document.getElementById("AudioPlayer");
		if (!audioPlayer.classList.contains("show"))
			audioPlayer.classList.add("show");
	}

	Ended() {
		if (this.Element.src != "")
			this.PlayNextMusic();
	}

	Load() {
		this.ProgressBar.max = this.Player.duration;
		this.Time.innerHTML = this.FormatTime(this.Player.duration);
	}
}

const _player = new Player;

class LoopButton {
	constructor() {
		this.Button	= document.getElementById("Loop");
		this.IMG	= document.getElementById("LoopIMG");
		this.Type	= "all";

		this.Button.addEventListener("click", evt => this.Toggle);
	}

	Toggle() {
		switch (this.Type) {
			case "one": // Setting loop to none
				this.Type = "none";
				this.IMG.src = server + "/img/no-loop.png";
				break;

			case "all": // Setting loop to one
				this.Type = "one";
				this.IMG.src = server + "/img/loop-one.png";
				break;

			case "none": // Setting loop to all
				this.Type = "all";
				this.IMG.src = server + "/img/loop.png";
				break;

			default: // Default: Setting loop to all
				this.Type = "all";
				this.IMG.src = server + "/img/loop.png";
				break;
		}
	}
}

const _loopButton = new LoopButton;

class PreviousButton {
	constructor() {
		this.Button = document.getElementById("Previous");
		this.IMG	= document.getElementById("PreviousIMG");

		this.Button.addEventListener("click", evt => this.PlayPreviousMusic);
	}

	PlayPreviousMusic() {
		let usedPlaylist;
		if (_randomButton.IsRandom)
			usedPlaylist = library.MusicsRandomPlaylist.slice();
		else
			usedPlaylist = library.MusicsPlaylist.slice();

		let indexOfCurrentMusic = usedPlaylist.findIndex(x => x.ID === _player.PlayedMusic.ID); // Getting the position of the current music in the playlist
		if (this.Player.currentTime < 5) {
			let indexOfNextMusic = 0;
			if (indexOfCurrentMusic != 0)
				indexOfNextMusic = indexOfCurrentMusic - 1;
			// Play the previous music
			_player.PlayMusic(usedPlaylist[indexOfNextMusic]);
		} else {
			// Rollback the current music
			_player.PlayMusic(usedPlaylist[indexOfCurrentMusic]);
		}
	}
}

const _previousButton = new PreviousButton;

class PlayPauseButton {
	constructor() {
		this.Button	= document.getElementById("PlayPause");
		this.IMG	= document.getElementById("PlayPauseIMG");

		this.Button.addEventListener("click", evt => this.Toggle);
	}

	Toggle() {
		if (_player.Element.paused)
			_player.play();
		else
			_player.pause();
	}
}

const _playPauseButton = new PlayPauseButton;

class NextButton {
	constructor() {
		this.Button = document.getElementById("Next");
		this.IMG	= document.getElementById("NextIMG");

		this.Button.addEventListener("click", evt => this.PlayNextMusic);
	}

	PlayNextMusic(notSkiped = false) {
		// Check if the reader should loop on the same music or not
		if (notSkiped && this.LoopType == "one") {
			_player.PlayMusic(_player.PlayedMusic); // Replay the current music
		} else {
			let usedPlaylist;
			if (this.IsRandom)
				usedPlaylist = library.MusicsRandomPlaylist.slice();
			else
				usedPlaylist = library.MusicsPlaylist.slice();

			let indexOfNextMusic = 0;
			let indexOfCurrentMusic = usedPlaylist.findIndex(x => x.ID === _player.PlayedMusic.ID); // Getting the position of the current music in the playlist
			if (indexOfCurrentMusic == (usedPlaylist.length) - 1 && this.LoopType == "none")
				return;
			else if (indexOfCurrentMusic != (usedPlaylist.length) - 1)
				indexOfNextMusic = indexOfCurrentMusic + 1;
			_player.PlayMusic(usedPlaylist[indexOfNextMusic]);
		}
	}
}

const _nextButton = new NextButton;

class StartTime {
	constructor() {
		this.Element = document.getElementById("StartTime");
	}
}

const _startTime = new StartTime;

class AudioBar {
	constructor() {		
		this.Element	= document.getElementById("ProgressBar");
		this.Element.addEventListener("input", evt => this.ChangeTime);
	}

	ChangeTime() {
		this.Player.currentTime = this.Player.duration / this.ProgressBar.max * this.ProgressBar.value;
	}

}

const _audioBar = new AudioBar;

class EndTime {
	constructor() {
		this.Element = document.getElementById("EndTime");
	}
}

const _endTime = new EndTime;

class RandomButton {
	constructor() {
		this.Button		= document.getElementById("Random");
		this.IMG		= document.getElementById("RandomIMG");
		this.IsRandom	= false;

		this.Button.addEventListener("click", evt => this.Toggle);
	}

	// Handle the Random button actions
	Toggle() {
		if (this.IsRandom) {
			this.IsRandom = false;
			this.IMG.src = server + "/img/no-random.png";
		} else {
			library.MusicsRandomPlaylist = library.MusicsPlaylist.slice();
			library.ShuffleMusics(); // Creating the random playlist
			this.IsRandom = true;
			this.IMG.src = server + "/img/random.png";
		}
	}
}

const _randomButton = new RandomButton;

class MuteButton {
	constructor() {
		this.Button	= document.getElementById("Mute");
		this.IMG	= document.getElementById("MuteIMG");
		this.IsMute	= false;

		this.Button.addEventListener("click", evt => this.Toggle);
	}

	Toggle() {
		if (this.IsMute) {
			this.Player.volume = this.Volume;
			this.IMG.src = server + "/img/audio-on.png";
			this.IsMute = false;
		} else {
			this.Volume = this.Player.volume;
			this.Player.volume = 0;
			this.IMG.src = server + "/img/audio-off.png";
			this.IsMute = true;
		}
	}
}

const _muteButton = new MuteButton;

class VolumeBar {
	constructor() {
		this.Element		= document.getElementById("Volume");
		this.Volume			= 0;
	}

	VolumeBarChange() {
		this.Player.volume = this.Element.value / 100;
	}

}

const _volumeBar = new VolumeBar;

// const reader = new Reader();