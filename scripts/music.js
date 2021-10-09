class Music {
	constructor(data, id) {
		this.Element	= document.createElement("ul");
		this.Artist		= data["file_author"];
		this.Title		= data["file_name"];
		this.Album		= data["file_album"];
		this.URL		= data["file_url"];
		this.MusicID	= data["file_id"];
		this.Cover		= data["file_image"];
		this.ID			= id;
		this.Played		= false;
		this.Layout		= false;
	}

	Create() {
		let cover = document.createElement("li");
		cover.className = "view";
		if (this.Cover) {
			cover.style.backgroundImage = "url('" + this.Cover + "')";
		}
		this.Element.appendChild(cover);

		let liTitle = document.createElement("li");
		let pTitile = document.createElement("p");
		liTitle.appendChild(pTitile)
		pTitile.innerHTML = this.Artist + " - " + this.Title;
		this.Element.appendChild(liTitle);

		cover.addEventListener("click", evt => _player.PlayMusic(this));
		liTitle.addEventListener("click", evt => _player.PlayMusic(this));

		return this.Element;
	}

	SetPlayed() {
		this.Played = true;
		playingLayout.Change(this.Element);
	}
}