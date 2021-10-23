class Music {
	constructor(data, id) {
		this.Artist		= data['file_author'];
		this.Title		= data['file_name'];
		this.Album		= data['file_album'];
		this.URL		= data['file_url'];
		this.MusicID	= data['file_id'];
		this.Cover		= data['file_image'];
		this.ID			= id;
		this.IsPlayed	= false;
		this.Elements	= {
			Library: {
				Element:	document.createElement('ul'),
				Cover:		document.createElement('li'),
				Title:		document.createElement('li'),
				TitleText:	document.createElement('p'),
			},
			Reader: {
				Element:	document.createElement('li'),
				Title:		document.createElement('p'),
				PlayBTN:	document.createElement('button'),
				PlayIMG:	document.createElement('img'),
				DeleteBTN:	document.createElement('button'),
				DeleteIMG:	document.createElement('img'),
			}
		}

		this.CreateInLibrary();
		this.CreateInReader();
		return this;
	}

	CreateInLibrary() {
		this.Elements.Library.Cover.className = 'view';
		if (this.Cover)
			this.Elements.Library.Cover.style.backgroundImage = 'url("' + this.Cover + '")';
		this.Elements.Library.Element.appendChild(this.Elements.Library.Cover);

		this.Elements.Library.Title.appendChild(this.Elements.Library.TitleText)
		this.Elements.Library.TitleText.innerHTML = this.Artist + ' - ' + this.Title;
		this.Elements.Library.Element.appendChild(this.Elements.Library.Title);

		this.Elements.Library.Cover.addEventListener('click', evt => this.Play(), false);
		this.Elements.Library.Title.addEventListener('click', evt => this.Play(), false);

		_library.Element.appendChild(this.Elements.Library.Element);
	}

	CreateInReader() {		
		this.Elements.Reader.Title.innerHTML = this.Artist + ' - ' + this.Title;
		this.Elements.Reader.Element.appendChild(this.Elements.Reader.Title);

		if (this.IsPlayed)
			this.Elements.Reader.PlayIMG.src = server + '/img/pause.png';
		else
			this.Elements.Reader.PlayIMG.src = server + '/img/play.png';
		this.Elements.Reader.PlayBTN.appendChild(this.Elements.Reader.PlayIMG);
		this.Elements.Reader.PlayBTN.addEventListener('click', evt => this.ReaderTogglePlayPause(), false);
		this.Elements.Reader.PlayBTN.push(this.Elements.Reader.PlayIMG);
		this.Elements.Reader.Element.appendChild(this.Elements.Reader.PlayBTN);

		this.Elements.Reader.DeleteBTN.addEventListener('click', evt => this.RemoveFromReader(), false);
		this.Elements.Reader.DeleteIMG.src = server + '/img/cross.png';
		this.Elements.Reader.DeleteBTN.appendChild(this.Elements.Reader.DeleteIMG);
		this.Elements.Reader.Element.appendChild(this.Elements.Reader.DeleteBTN);
		
		_playlistReader.List.appendChild(this.Elements.Reader.Element);
	}

	SetPlayed() {
		this.IsPlayed = true;
		_playingLayout.Change(this.Elements.Library.Element);
		this.Elements.Reader.PlayIMG.src = server + '/img/pause.png';
	}

	SetNotPlayed() {
		this.IsPlayed = false;
		this.Elements.Reader.PlayIMG.src = server + '/img/play.png';
	}

	Play() {
		_player.Play(this);
		this.SetPlayed();
	}

	RemoveFromPlaylist() {
		_library.RemoveFromPlaylist(this);
	}

	RemoveFromReader() {
		if(!this.IsPlayed) {
			this.Elements.Reader.Element.remove();
			this.RemoveFromPlaylist();
		}
	}

	ReaderTogglePlayPause() {
		if (this.IsPlayed) {
			if (_player.Element.paused)
				this.Elements.Reader.PlayIMG.src = server + '/img/pause.png';
			else
				this.Elements.Reader.PlayIMG.src = server + '/img/play.png';
			_playPause.Toggle();
		} else {
			this.Play();
			this.Elements.Reader.PlayIMG.src = server + '/img/pause.png';
		}
	}
}