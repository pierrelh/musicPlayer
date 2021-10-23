const _audioPlayer = new class {
	constructor() {
		this.Element	= document.getElementById('AudioPlayer');
		this.IsVisible	= false;
	}

	Show() {
		if (!this.Element.classList.contains('show')) {
			_library.Reduce();
			_playlistSection.Reduce();
			this.Element.classList.add('show');
		}
		this.IsVisible = true;
	}
}

const _musicName = new class {
	constructor() {
		this.Element = document.getElementById('MusicName');
	}

	Change(name) {
		this.Element.innerHTML = name;
	}
}

const _player = new class {
	constructor() {
		this.Element		= document.getElementById('MusicPlayer');
		this.PlayedMusic	= undefined;

		this.Element.addEventListener('loadedmetadata', evt => this.Load(), false);
		this.Element.addEventListener('timeupdate', evt => _progress.Update(), false);
		this.Element.addEventListener('volumechange', evt => _volume.Update(), false);
		this.Element.addEventListener('pause', evt => this.TogglePlayPause(), false);
		this.Element.addEventListener('play', evt => this.TogglePlayPause(), false);
		this.Element.addEventListener('ended', evt => this.Ended(), false);
	}

	StopMusic() {
		this.Element.pause();
		this.Element.currentTime = 0;
	}

	Play(music) {
		if (this.PlayedMusic)
			this.PlayedMusic.SetNotPlayed();
		this.PlayedMusic = music;
		this.PlayedMusic.SetPlayed();
		_musicName.Change(this.PlayedMusic.Artist + ' - ' + this.PlayedMusic.Title);
		this.Element.src = this.PlayedMusic.URL;
		this.Element.load();
		if (!_audioPlayer.IsVisible)
			_audioPlayer.Show();
		_mediaSession.SetData(this.PlayedMusic);
	}

	TogglePlayPause() {
		if (this.Element.paused) {
			_playPause.IMG.src = server + '/img/play.png';
			this.PlayedMusic.Elements.Reader.PlayIMG.src =server + '/img/play.png'; 
		}
		else {
			_playPause.IMG.src = server + '/img/pause.png';
			this.PlayedMusic.Elements.Reader.PlayIMG.src = server + '/img/pause.png';
		}
	}

	Ended() {
		if (this.Element.src != '')
			_next.Play(true);
	}

	Load() {
		_progress.Element.max = this.Element.duration;
		_endTime.Set(_progress.FormatTime(this.Element.duration));
	}
}

const _loop = new class {
	constructor() {
		this.Button	= document.getElementById('Loop');
		this.IMG	= document.getElementById('LoopIMG');
		this.Type	= 'all';

		this.Button.addEventListener('click', evt => this.Toggle(), false);
	}

	Toggle() {
		switch (this.Type) {
			case 'one':
				this.Type = 'none';
				this.IMG.src = server + '/img/no-loop.png';
				break;

			case 'all':
				this.Type = 'one';
				this.IMG.src = server + '/img/loop-one.png';
				break;

			case 'none':
			default:
				this.Type = 'all';
				this.IMG.src = server + '/img/loop.png';
				break;
		}
	}
}

const _previous = new class {
	constructor() {
		this.Button = document.getElementById('Previous');
		this.IMG	= document.getElementById('PreviousIMG');

		this.Button.addEventListener('click', evt => this.Play(), false);
	}

	Play() {
		let usedPlaylist = _library.GetPlaylist();

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

const _playPause = new class {
	constructor() {
		this.Button	= document.getElementById('PlayPause');
		this.IMG	= document.getElementById('PlayPauseIMG');

		this.Button.addEventListener('click', evt => this.Toggle(), false);
	}

	Toggle() {
		if (_player.Element.paused)
			_player.Element.play();
		else
			_player.Element.pause();
	}
}

const _next = new class {
	constructor() {
		this.Button = document.getElementById('Next');
		this.IMG	= document.getElementById('NextIMG');

		this.Button.addEventListener('click', evt => this.Play(), false);
	}

	Play(notSkiped = false) {
		if (notSkiped && _loop.Type == 'one') {
			_player.Play(_player.PlayedMusic);
		} else {
			let playlist = _library.GetPlaylist();
			let nextMusic = 0;
			let currentMusic = playlist.findIndex(x => x.ID === _player.PlayedMusic.ID); // Getting the position of the current music in the playlist
			if (currentMusic == (playlist.length) - 1 && _loop.Type == 'none')
				return;
			else if (currentMusic != (playlist.length) - 1)
				nextMusic = currentMusic + 1;
			_player.Play(playlist[nextMusic]);
		}
	}
}

const _currentTime = new class {
	constructor() {
		this.Element = document.getElementById('CurrentTime');
	}

	Set(time) {
		this.Element.innerHTML = time;
	}
}

const _progress = new class {
	constructor() {		
		this.Element = document.getElementById('ProgressBar');
		this.Element.addEventListener('input', evt => this.Change(), false);
	}

	// Set Time to the right format
	FormatTime(t) {
		let m = ~~(t / 60),
		s = ~~(t % 60);
		return (m < 10 ? '0' + m : m) + ':' + (s < 10 ? '0' + s : s);
	}
	
	Update() {
		this.Element.value = _player.Element.currentTime;
		_currentTime.Set(this.FormatTime(_player.Element.currentTime));
		let percent = (this.Element.value / (this.Element.max - this.Element.min)) * 100;
		this.Element.style.backgroundImage = 	'-webkit-gradient(linear, left top, right top, ' +
												'color-stop(' + percent + '%, #FFF), ' +
												'color-stop(' + percent + '%, rgb(50, 50, 50))' +
												')';
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

const _endTime = new class {
	constructor() {
		this.Element = document.getElementById('EndTime');
	}

	Set(time) {
		this.Element.innerHTML = time;
	}
}

const _random = new class {
	constructor() {
		this.Button		= document.getElementById('Random');
		this.IMG		= document.getElementById('RandomIMG');
		this.IsRandom	= false;

		this.Button.addEventListener('click', evt => this.Toggle(), false);
	}

	Toggle() {
		if (this.IsRandom)
			this.Disable();
		else
			this.Enable();
		_playlistReader.Hydrate();			
	}

	Enable() {
		this.IsRandom = true;
		this.IMG.src = server + '/img/random.png';
		_library.CreateRandomPlaylist();
	}

	Disable() {
		this.IsRandom = false;
		this.IMG.src = server + '/img/no-random.png';
	}
}

const _mute = new class {
	constructor() {
		this.Button	= document.getElementById('Mute');
		this.IMG	= document.getElementById('MuteIMG');
		this.IsMute	= false;

		this.Button.addEventListener('click', evt => this.Toggle(), false);
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
		this.IMG.src = server + '/img/audio-off.png';
		this.IsMute = true;
	}

	Disable() {
		_player.Element.volume = _volume.Level;
		this.IMG.src = server + '/img/audio-on.png';
		this.IsMute = false;
	}
}

const _volume = new class {
	constructor() {
		this.Element	= document.getElementById('Volume');
		this.Level		= 0;
		
		this.Element.addEventListener('input', evt => this.Change(), false)
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

	Update() {
		if (_player.Element.volume != 0)
			_mute.IMG.src = server + '/img/audio-on.png';
		else
			_mute.IMG.src = server + '/img/audio-off.png';
	
		let percent = _player.Element.volume * 100;
		this.Element.value = percent;
		this.Element.style.backgroundImage =	'-webkit-gradient(linear, left top, right top, ' +
												'color-stop(' + percent + '%, #FFF), ' +
												'color-stop(' + percent + '%, rgb(50, 50, 50))' +
												')';
	}
}

const _playlistReaderBTN = new class {
	constructor() {
		this.BTN = document.getElementById('PlaylistBtn');
		this.BTN.addEventListener('click', evt => _playlistReader.Toggle());
	}
}