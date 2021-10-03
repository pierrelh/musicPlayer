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
		library.MusicsPlaylist.push(this);

		this.Element.addEventListener("click", evt => reader.PlayMusic(this));
	}

	Create() {
		let cover = document.createElement("li");
		cover.className = "view";
		if (this.Cover) {
			cover.style.backgroundImage = "url('" + cover + "')";
		}
		this.Element.appendChild(cover);

		let liTitle = document.createElement("li");
		let pTitile = document.createElement("p");
		liTitle.appendChild(pTitile)
		pTitile.innerHTML = this.Artist + " - " + this.Title;
		this.Element.appendChild(liTitle);

		return this.Element;
	}

	SetPlayed() {
		this.Played = true;
		playingLayout.Change(this.Element);
	}
}