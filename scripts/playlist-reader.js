const _playlistReader = new class {
	constructor() {
		this.Element	= document.getElementById('PlaylistReader');
		this.List		= document.getElementById('PlaylistReaderList');
		this.IsVisible	= false;
	}

	Toggle() {
		if (this.IsVisible)
			this.Hide();
		else
			this.Show();
	}

	Show() {
		this.Element.classList.add('show-playlist-reader');
		this.IsVisible = true;
	}

	Hide() {
		this.Element.classList.remove('show-playlist-reader');
		this.IsVisible = false;
	}

	Hydrate() {
		this.List.innerHTML = '';
		let playlist = _library.GetPlaylist();
		for (let index = 0; index < playlist.length; index++) {
			let elem = document.createElement('li');
			
			let elemTitle = document.createElement('p');
			elemTitle.innerHTML = playlist[index].Artist + ' - ' + playlist[index].Title;
			elem.appendChild(elemTitle);

			let elemPlayBTN = document.createElement('button');
			let elemPlayIMG = document.createElement('img');
			if (playlist[index].IsPlayed)
				elemPlayIMG.src = server + '/img/pause.png';
			else
				elemPlayIMG.src = server + '/img/play.png';
			elemPlayBTN.appendChild(elemPlayIMG);
			elemPlayBTN.addEventListener('click', evt => this.TogglePlayPause(playlist[index], elemPlayIMG), false);
			elem.appendChild(elemPlayBTN);

			let elemDeleteBTN = document.createElement('button');
			elemDeleteBTN.addEventListener('click', evt => this.Remove(elem, playlist[index]), false);
			let elemDeleteIMG = document.createElement('img');
			elemDeleteIMG.src = server + '/img/cross.png';
			elemDeleteBTN.appendChild(elemDeleteIMG);
			elem.appendChild(elemDeleteBTN);
			
			this.List.appendChild(elem);
		}
	}

	UpdatePlayed() {
		
	}

	TogglePlayPause(music, img) {
		if (music.IsPlayed) {
			if (_player.Element.paused)
				img.src = server + '/img/pause.png';
			else
				img.src = server + '/img/play.png';
			_playPause.Toggle();
		} else {
			music.Play();
			img.src = server + '/img/pause.png';
		}
	}

	Remove(elem, music) {		
		elem.remove();
		music.RemoveFromPlaylist();
	}
}