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
		this.Element.addEventListener("click", evt => playMusic(this));
	}

	Create() {
		console.log(this)
		var cover = new SongCover().Create(this.Cover)
		this.Element.appendChild(cover)
		
		var title = new SongTitle().Create(this.Artist, this.Title)
		this.Element.appendChild(title)

		return this.Element;

	}
}

class SongCover {
	constructor() {
		this.Element = document.createElement("li");
	}
	Create(cover) {		
		this.Element.className = "view";
		console.log(cover)
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

