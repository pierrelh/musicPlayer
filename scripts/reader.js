class AudioPlayer {
	constructor() {
		this.Element = document.getElementById("AudioPlayer");
		// this.PlaylistBtn	= document.getElementById("PlaylistBtn");
		// this.ReaderPlaylist	= document.getElementById("PlaylistReader");
		// this.Previous		= document.getElementById("Previous");
		// this.PlayedMusic	= undefined;

		// this.Mute.addEventListener("click", evt => this.ToggleMute());
		// this.PlaylistBtn.addEventListener("click", evt => this.TogglePlaylist());
	}
	Show() {
		if (!this.Element.classList.contains("show"))
			this.Element.classList.add("show");
	}

	// Toggle playlist reader section
	// TogglePlaylist() {
	// 	if (this.ReaderPlaylist.classList.contains("show-playlist-reader"))
	// 		this.ReaderPlaylist.classList.remove("show-playlist-reader");
	// 	else
	// 		this.ReaderPlaylist.classList.add("show-playlist-reader");
	// }
}


class MusicName {
	constructor() {
		this.Element = document.getElementById("MusicName");
	}

	Change(name) {
		this.Element.innerHTML = name;
	}
}


class Player {
	constructor() {
		this.Element		= document.getElementById("MusicPlayer");
		this.PlayedMusic	= undefined;

		this.Element.addEventListener("loadedmetadata", evt => this.Load(), false);
		this.Element.addEventListener("timeupdate", evt => _progress.Update(), false);
		this.Element.addEventListener("volumechange", evt => _volume.Change(), false);
		this.Element.addEventListener("pause", evt => this.TogglePlayPause(), false);
		this.Element.addEventListener("play", evt => this.TogglePlayPause(), false);
		this.Element.addEventListener("ended", evt => this.Ended(), false);
	}

	// Stop the music player
	StopMusic() {
		this.Element.pause();
		this.Element.currentTime = 0;
	}

	Play(music) {
		_musicName.Change(music.Artist + " - " + music.Title);
		this.Element.src = music.URL;
		library.Reduce();
		playlistSection.Reduce();
		_audioPlayer.Show();
		_mediaSession.SetData(music);
		music.SetPlayed();
	}

	TogglePlayPause() {
		if (this.Element.paused)
			_playPause.IMG.src = server + "/img/play.png";
		else
			_playPause.IMG.src = server + "/img/pause.png";
	}

	Ended() {
		if (this.Element.src != "")
			_next.Play();
	}

	Load() {
		_progress.Element.max = this.Element.duration;
		_currentTime.innerHTML = this.FormatTime(this.Element.duration);
	}
}


class Loop {
	constructor() {
		this.Button	= document.getElementById("Loop");
		this.IMG	= document.getElementById("LoopIMG");
		this.Type	= "all";

		this.Button.addEventListener("click", evt => this.Toggle(), false);
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


class Previous {
	constructor() {
		this.Button = document.getElementById("Previous");
		this.IMG	= document.getElementById("PreviousIMG");

		this.Button.addEventListener("click", evt => this.Play(), false);
	}

	Play() {
		let usedPlaylist;
		if (_randomButton.IsRandom)
			usedPlaylist = library.MusicsRandomPlaylist.slice();
		else
			usedPlaylist = library.MusicsPlaylist.slice();

		let indexOfCurrentMusic = usedPlaylist.findIndex(x => x.ID === _player.PlayedMusic.ID); // Getting the position of the current music in the playlist
		if (_player.Element.currentTime < 5) {
			let indexOfNextMusic = 0;
			if (indexOfCurrentMusic != 0)
				indexOfNextMusic = indexOfCurrentMusic - 1;
			// Play the previous music
			_player.Play(usedPlaylist[indexOfNextMusic]);
		} else {
			// Rollback the current music
			_player.Play(usedPlaylist[indexOfCurrentMusic]);
		}
	}
}


class PlayPause {
	constructor() {
		this.Button	= document.getElementById("PlayPause");
		this.IMG	= document.getElementById("PlayPauseIMG");

		this.Button.addEventListener("click", evt => this.Toggle(), false);
	}

	Toggle() {
		if (_player.Element.paused)
			_player.Element.play();
		else
			_player.Element.pause();
	}
}


class Next {
	constructor() {
		this.Button = document.getElementById("Next");
		this.IMG	= document.getElementById("NextIMG");

		this.Button.addEventListener("click", evt => this.Play(), false);
	}

	Play(notSkiped = false) {
		// Check if the reader should loop on the same music or not
		if (notSkiped && this.LoopType == "one") {
			_player.Play(_player.PlayedMusic); // Replay the current music
		} else {
			let usedPlaylist;
			if (_random.IsRandom)
				usedPlaylist = library.MusicsRandomPlaylist.slice();
			else
				usedPlaylist = library.MusicsPlaylist.slice();

			let indexOfNextMusic = 0;
			let indexOfCurrentMusic = usedPlaylist.findIndex(x => x.ID === _player.PlayedMusic.ID); // Getting the position of the current music in the playlist
			if (indexOfCurrentMusic == (usedPlaylist.length) - 1 && this.LoopType == "none")
				return;
			else if (indexOfCurrentMusic != (usedPlaylist.length) - 1)
				indexOfNextMusic = indexOfCurrentMusic + 1;
			_player.Play(usedPlaylist[indexOfNextMusic]);
		}
	}
}


class CurrentTime {
	constructor() {
		this.Element = document.getElementById("CurrentTime");
	}
}


class Progress {
	constructor() {		
		this.Element = document.getElementById("ProgressBar");
		this.Element.addEventListener("input", evt => this.Change(), false);
	}

	// Set Time to the right format
	FormatTime(t) {
		let m = ~~(t / 60),
		s = ~~(t % 60);
		return (m < 10 ? "0" + m : m) + ":" + (s < 10 ? "0" + s : s);
	}
	
	Update() {
		this.Element.value = _player.Element.currentTime;
		_currentTime.innerHTML = this.FormatTime(_player.Element.currentTime);
		let percent = (this.Element.value / (this.Element.max - this.Element.min)) * 100;
		this.Element.style.backgroundImage = 	"-webkit-gradient(linear, left top, right top, " +
												"color-stop(" + percent + "%, #FFF), " +
												"color-stop(" + percent + "%, rgb(50, 50, 50))" +
												")";
	}

	Change() {
		_player.Element.currentTime = _player.Element.duration / this.Element.max * this.Element.value;
	}

	// Progress -10 secondes to the played music
	Backward() {
		_player.Element.currentTime -= 10;
	}

	// Progress +10 secondes to the played music
	Forward() {
		_player.Element.currentTime += 10;
	}
	
	// Seek the music player to the wanted second
	To(data) {
		if (data.fastSeek)
			startSeeking();
		else
			stopSeeking();
		_player.Element.currentTime = data.seekTime;
	}
}


class EndTime {
	constructor() {
		this.Element = document.getElementById("EndTime");
	}
}


class Random {
	constructor() {
		this.Button		= document.getElementById("Random");
		this.IMG		= document.getElementById("RandomIMG");
		this.IsRandom	= false;

		this.Button.addEventListener("click", evt => this.Toggle(), false);
	}

	// Handle the Random button actions
	Toggle() {
		if (this.IsRandom)
			this.Disable();
		else
			this.Enable();
	}

	Enable() {
		library.ShuffleMusics();
		this.IsRandom = true;
		this.IMG.src = server + "/img/random.png";
	}

	Disable() {
		this.IsRandom = false;
		this.IMG.src = server + "/img/no-random.png";
	}
}


class Mute {
	constructor() {
		this.Button	= document.getElementById("Mute");
		this.IMG	= document.getElementById("MuteIMG");
		this.IsMute	= false;

		this.Button.addEventListener("click", evt => this.Toggle(), false);
	}

	Toggle() {
		if (this.IsMute)
			this.Disable();
		else
			this.Enable();
	}

	Enable() {
		_volume.Level = _player.Element.volume;
		_player.Element.volume = 0;
		this.IMG.src = server + "/img/audio-off.png";
		this.IsMute = true;
	}

	Disable() {
		_player.Element.volume = _volume.Level;
		this.IMG.src = server + "/img/audio-on.png";
		this.IsMute = false;
	}
}


class Volume {
	constructor() {
		this.Element	= document.getElementById("Volume");
		this.Level		= 0;
		
		this.Element.addEventListener("input", evt => this.Change(), false)
	}

	Change() {
		_player.Element.volume = this.Element.value / 100;
	}

	Dicrease() {
		if (_player.Element.volume <= 0.1)
			_player.volume = 0;
		else
			_player.volume -= 0.1;
	}

	Increase() {
		if (_player.Element.volume >= 0.9)
			_player.Element.volume = 1;
		else
			_player.Element.volume += 0.1;
	}

	VolumeChange() {
		if (_player.Element.volume != 0)
			_mute.Element.src = server + "/img/audio-on.png";
		else
			_mute.Element.src = server + "/img/audio-off.png";
	
		let percent = _player.Element.volume * 100;
		this.Element.value = percent;
		this.Element.style.backgroundImage =	"-webkit-gradient(linear, left top, right top, " +
												"color-stop(" + percent + "%, #FFF), " +
												"color-stop(" + percent + "%, rgb(50, 50, 50))" +
												")";
	}

}

const _audioPlayer	= new AudioPlayer;
const _musicName	= new MusicName;
const _loop			= new Loop;
const _previous		= new Previous;
const _playPause	= new PlayPause;
const _next			= new Next;
const _currentTime	= new CurrentTime;
const _progress		= new Progress;
const _endTime		= new EndTime;
const _random		= new Random;
const _mute			= new Mute;
const _volume		= new Volume;
const _player		= new Player;