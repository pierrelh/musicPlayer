class PlayingLayout {
	constructor() {
		this.Element	= document.createElement("li");
		this.Element.id	= "PlayedMusic";
		this.Element.classList.add("playing");
	}

	Change(parent) {
		this.Element.remove();
		parent.insertBefore(this.Element, parent.children[0])
	}
}
var playingLayout = new PlayingLayout();

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
		this.Element.addEventListener("click", evt => reader.PlayMusic(this));
		MusicsPlaylist.push(this);
	}

	Create() {
		var cover = new MusicCover().Create(this.Cover)
		this.Element.appendChild(cover)
		
		var title = new MusicTitle().Create(this.Artist, this.Title)
		this.Element.appendChild(title)

		return this.Element;
	}

	SetPlayed() {
		this.Played = true;
		playingLayout.Change(this.Element);
	}
}

class MusicCover {
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

class MusicTitle {
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

