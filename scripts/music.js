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
				Main		: document.createElement('ul'),
				Cover		: document.createElement('li'),
				Title		: document.createElement('li'),
				TitleText	: document.createElement('p'),
			},
			Reader: {
				Main		: document.createElement('li'),
				Title		: document.createElement('p'),
				PlayBTN		: document.createElement('button'),
				PlayIMG		: document.createElement('img'),
				DeleteBTN	: document.createElement('button'),
				DeleteIMG	: document.createElement('img'),
			}
		}

		this.CreateInLibrary();
		this.CreateInReader();
		return this;
	}

	CreateInLibrary() {
		this.Elements.Library.Cover.classList.add('view');
		if (this.Cover)
			this.Elements.Library.Cover.style.backgroundImage = 'url("' + this.Cover + '")';

		this.Elements.Library.Title.append(this.Elements.Library.TitleText)
		this.Elements.Library.TitleText.innerHTML = this.Artist + ' - ' + this.Title;

		this.Elements.Library.Cover.addEventListener('click', evt => this.Play(), false);
		this.Elements.Library.Title.addEventListener('click', evt => this.Play(), false);

		this.Elements.Library.Main.append(this.Elements.Library.Cover, this.Elements.Library.Title);
		_library.Element.append(this.Elements.Library.Main);
	}

	CreateInReader() {
		this.Elements.Reader.Title.innerHTML = this.Artist + ' - ' + this.Title;

		if (this.IsPlayed)
			this.Elements.Reader.PlayIMG.src = server + '/img/pause.png';
		else
			this.Elements.Reader.PlayIMG.src = server + '/img/play.png';
			
		this.Elements.Reader.PlayBTN.append(this.Elements.Reader.PlayIMG);
		this.Elements.Reader.PlayBTN.addEventListener('click', evt => this.ReaderTogglePlayPause(), false);

		this.Elements.Reader.DeleteBTN.addEventListener('click', evt => this.RemoveFromReader(), false);
		this.Elements.Reader.DeleteIMG.src = server + '/img/cross.png';
		this.Elements.Reader.DeleteBTN.append(this.Elements.Reader.DeleteIMG);

		this.Elements.Reader.Main.append(this.Elements.Reader.Title, this.Elements.Reader.PlayBTN, this.Elements.Reader.DeleteBTN);		
		_playlistReader.List.append(this.Elements.Reader.Main);
	}

	SetPlayed() {
		this.IsPlayed = true;
		_playingLayout.Change(this.Elements.Library.Main);
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
		this.Elements.Reader.Main.remove();
		_library.RemoveFromPlaylist(this);
	}

	RemoveFromReader() {
		if(!this.IsPlayed)
			this.RemoveFromPlaylist();
	}

	ReaderTogglePlayPause() {
		if (this.IsPlayed)
			_playPause.Toggle();
		else
			this.Play();
	}

	CreateLayout(layoutClass, layoutEvent) {
		this.RemoveLayout();
		this.Elements.Library.Main.prepend(new Layout({
			class: layoutClass,
			event: layoutEvent
		}));
	}

	RemoveLayout() {
		if (this.Elements.Library.Main.getElementsByClassName('layout')[0])
			this.Elements.Library.Main.removeChild(this.Elements.Library.Main.getElementsByClassName('layout')[0]);
	}
}