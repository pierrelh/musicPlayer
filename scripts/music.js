class DeleteLayout {
	constructor(id) {
		this.Element = document.createElement("li");
		this.Element.classList.add("delete");

		// Add the event on this delete's click
		this.Element.addEventListener("click", evt => deleteSection.Show(MusicsPlaylist[id]));
		return this.Element;
	}
}

class EditLayout {
	constructor(id) {
		this.Element = document.createElement("li");
		this.Element.classList.add("edit");

		// Add the event on this edit's click
		this.Element.addEventListener("click", evt => editSection.Show(MusicsPlaylist[id]));
		return this.Element;
	}
}

var addLayouts = [];

class AddLayout {
	constructor(id) {
		this.Element = document.createElement("li");
		this.Element.classList.add("add");

		// Add the event on this edit's click
		this.Element.addEventListener("click", playlistSection.AddToPlaylist(this.Element, MusicsPlaylist[id]));
		addLayouts.push(this);
		return this.Element;
	}
}

class PlayingLayout {
	constructor() {
		this.Element	= document.createElement("li");
		this.Element.id	= "PlayedMusic";
		this.Element.classList.add("playing");
	}

	Change(parent) {
		this.Element.remove();
		parent.insertBefore(this.Element, parent.children[0]);
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
		MusicsPlaylist.push(this);
	}

	Create() {
		var cover = new MusicCover(this).Create(this.Cover);
		this.Element.appendChild(cover);
		
		var title = new MusicTitle(this).Create(this.Artist, this.Title);
		this.Element.appendChild(title);

		return this.Element;
	}

	SetPlayed() {
		this.Played = true;
		playingLayout.Change(this.Element);
	}
}

class MusicCover {
	constructor(datas) {
		this.Element = document.createElement("li");
		this.Element.addEventListener("click", evt => reader.PlayMusic(datas));
	}

	Create(cover) {
		this.Element.className = "view";
		if (cover) {
			this.Element.style.backgroundImage = "url('" + cover + "')";
		}
		return this.Element;
	}
}

class MusicTitle {
	constructor(datas) {
		this.Element	= document.createElement("li");
		this.Title		= document.createElement("p");
		
		this.Element.appendChild(this.Title)
		this.Element.addEventListener("click", evt => reader.PlayMusic(datas));
	}

	Create(author, name) {
		this.Title.innerHTML = author + " - " + name;
		return this.Element;
	}
}

