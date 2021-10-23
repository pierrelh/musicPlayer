class Music {
	constructor(data, id) {
		this.Element	= document.createElement('ul');
		this.Artist		= data['file_author'];
		this.Title		= data['file_name'];
		this.Album		= data['file_album'];
		this.URL		= data['file_url'];
		this.MusicID	= data['file_id'];
		this.Cover		= data['file_image'];
		this.ID			= id;
		this.IsPlayed	= false;
		this.Layout		= false;
	}

	Create() {
		let cover = document.createElement('li');
		cover.className = 'view';
		if (this.Cover)
			cover.style.backgroundImage = 'url("' + this.Cover + '")';
		this.Element.appendChild(cover);

		let liTitle = document.createElement('li');
		let pTitile = document.createElement('p');
		liTitle.appendChild(pTitile)
		pTitile.innerHTML = this.Artist + ' - ' + this.Title;
		this.Element.appendChild(liTitle);

		cover.addEventListener('click', evt => this.Play(), false);
		liTitle.addEventListener('click', evt => this.Play(), false);

		return this.Element;
	}

	SetPlayed() {
		this.IsPlayed = true;
		_playingLayout.Change(this.Element);
	}

	SetNotPlayed() {
		this.IsPlayed = false;
	}

	Play() {
		_player.Play(this);
		this.SetPlayed();
	}

	RemoveFromPlaylist() {
		_library.RemoveFromPlaylist(this);
	}
}