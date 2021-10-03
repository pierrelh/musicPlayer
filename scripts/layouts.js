class DeleteLayout {
	constructor(id) {
		this.Element = document.createElement("li");
		this.Element.classList.add("delete");

		// Add the event on this delete's click
		this.Element.addEventListener("click", evt => deleteSection.Show(library.MusicsPlaylist[id]));
		return this.Element;
	}
}

class EditLayout {
	constructor(id) {
		this.Element = document.createElement("li");
		this.Element.classList.add("edit");

		// Add the event on this edit's click
		this.Element.addEventListener("click", evt => editSection.Show(library.MusicsPlaylist[id]));
		return this.Element;
	}
}

var addLayouts = [];

class AddLayout {
	constructor(id) {
		this.Element = document.createElement("li");
		this.Element.classList.add("add");

		// Add the event on this edit's click
		this.Element.addEventListener("click", playlistSection.AddToPlaylist(this.Element, library.MusicsPlaylist[id]));
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

const playingLayout = new PlayingLayout();