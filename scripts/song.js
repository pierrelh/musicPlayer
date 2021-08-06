var playedMusic = -1;

class PlayingLayout {
	constructor() {
		this.Element	= document.createElement("li");
		this.Element.id	= "PlayedMusic";
		this.Element.classList.add("playing");
	}

	Change(parent) {
		this.Element.remove();
		parent.appendChild(this.Element)
	}
}
var playingLayout = new PlayingLayout();

class Song {
	constructor(data, id) {
		this.Element	= document.createElement("ul");
		this.Artist		= data["file_author"];
		this.Title		= data["file_name"];
		this.Album		= data["file_album"];
		this.URL		= data["file_url"];
		this.SongID		= data["file_id"];
		this.Cover		= data["file_image"];
		this.ID			= id;
		this.Played		= false;
		this.Element.addEventListener("click", evt => playMusic(this));
	}

	Create() {
		var cover = new SongCover().Create(this.Cover)
		this.Element.appendChild(cover)
		
		var title = new SongTitle().Create(this.Artist, this.Title)
		this.Element.appendChild(title)

		return this.Element;
	}

	SetPlayed() {
		this.Played = true;
		playingLayout.Change(this.Element);
	}
}

class SongCover {
	constructor() {
		this.Element = document.createElement("li");
	}
	Create(cover) {		
		this.Element.className = "view";
		if (cover != "") {
			this.Element.style.backgroundImage = "url('" + cover + "')";
		}
		return this.Element;
	}
}

class SongTitle {
	constructor() {
		this.Element = document.createElement("li");
		this.Title = document.createElement("p");
		this.Element.appendChild(this.Title)
	}
	Create(author, name) {
		this.Title.innerHTML = author + " - " + name;
		return this.Element;
	}
}

