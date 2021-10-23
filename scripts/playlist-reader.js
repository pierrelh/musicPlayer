const _playlistReader = new class {
	constructor() {
		this.Element	= document.getElementById("PlaylistReader");
		this.List		= document.getElementById("PlaylistReaderList");
		this.IsVisible	= false;
	}

	Toggle() {
		if (this.IsVisible)
			this.Hide();
		else
			this.Show();
	}

	Show() {
		this.Element.classList.add("show-playlist-reader");
		this.IsVisible = true;
	}

	Hide() {
		this.Element.classList.remove("show-playlist-reader");
		this.IsVisible = false;
	}

	Hydrate() {
		this.List.innerHTML = '';
		let playlist = _library.GetPlaylist();
		console.log(playlist);
		for (let index = 0; index < playlist.length; index++) {
			let elem = document.createElement('li');
			
			let elemTitle = document.createElement('p');
			elemTitle.innerHTML = playlist[index].Artist + ' - ' + playlist[index].Title;
			elem.appendChild(elemTitle);

			let elemPlayBTN = document.createElement('button');
			let elemPlayIMG = document.createElement('img');
			elemPlayIMG.src = server + '/img/play.png';
			elemPlayBTN.appendChild(elemPlayIMG);
			elem.appendChild(elemPlayBTN);

			let elemDeleteBTN = document.createElement('button');
			let elemDeleteIMG = document.createElement('img');
			elemDeleteIMG.src = server + '/img/cross.png';
			elemDeleteBTN.appendChild(elemDeleteIMG);
			elem.appendChild(elemDeleteBTN);
			
			this.List.appendChild(elem);
		}
	}
}