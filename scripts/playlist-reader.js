const _playlistReader = new class {
	constructor() {
		this.Element	= document.getElementById('PlaylistReader');
		this.List		= document.getElementById('PlaylistReaderList');
		this.PlayBTN	= [];
		this.IsVisible	= false;
	}

	Toggle() {
		if (this.IsVisible)
			this.Hide();
		else
			this.Show();
	}

	Show() {
		this.Element.classList.add('show-playlist-reader');
		this.IsVisible = true;
	}

	Hide() {
		this.Element.classList.remove('show-playlist-reader');
		this.IsVisible = false;
	}

	Hydrate() {
		this.List.innerHTML = '';
		let playlist = _library.GetPlaylist();
		for (let index = 0; index < playlist.length; index++) {
			playlist[index].CreateInReader();
		}
	}
}