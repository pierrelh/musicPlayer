class Music {
	constructor(data, id) {
		this.Artist		= data['file_author'];
		this.Title		= data['file_name'];
		this.Album		= data['file_album'];
		this.URL		= data['file_url'];
		this.MusicID	= data['file_id'];
		this.ID			= id;
		this.IsPlayed	= false;
		this.Covers		= {
			x96		: data['file_cover_96'],
			x128	: data['file_cover_128'],
			x192	: data['file_cover_192'],
			x256	: data['file_cover_256'],
			x384	: data['file_cover_384'],
			x512	: data['file_cover_512'],
		};
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
				PlayI		: document.createElement('i'),
				DeleteBTN	: document.createElement('button'),
				DeleteI		: document.createElement('i'),
			}
		}

		this.CreateInLibrary();
		this.CreateInReader();
		return this;
	}

	CreateInLibrary() {
		this.Elements.Library.Cover.classList.add('view');
		if (this.Covers.x192)
			this.Elements.Library.Cover.style.backgroundImage = 'url("' + this.Covers.x192 + '")';

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
			this.Elements.Reader.PlayI.classList.add(['bi', 'bi-pause']);
		else
			this.Elements.Reader.PlayI.classList.add(['bi', 'bi-play']);
			
		this.Elements.Reader.PlayBTN.append(this.Elements.Reader.PlayI);
		this.Elements.Reader.PlayBTN.addEventListener('click', evt => this.ReaderTogglePlayPause(), false);

		this.Elements.Reader.DeleteBTN.addEventListener('click', evt => this.RemoveFromReader(), false);
		this.Elements.Reader.DeleteI.classList.add(['bi', 'bi-x-lg']);
		this.Elements.Reader.DeleteBTN.append(this.Elements.Reader.DeleteI);

		this.Elements.Reader.Main.append(this.Elements.Reader.Title, this.Elements.Reader.PlayBTN, this.Elements.Reader.DeleteBTN);		
		_playlistReader.List.append(this.Elements.Reader.Main);
	}

	SetPlayed() {
		this.IsPlayed = true;
		_playingLayout.Change(this.Elements.Library.Main);
		this.Elements.Reader.PlayI.classList.replace('bi-play', 'bi-pause');
	}

	SetNotPlayed() {
		this.IsPlayed = false;
		this.Elements.Reader.PlayI.classList.replace('bi-pause', 'bi-play');
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