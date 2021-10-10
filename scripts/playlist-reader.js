class PlaylistReader {
    constructor() {
        this.Element    = document.getElementById("PlaylistReader");
        this.List       = document.getElementById("PlaylistReaderList");
        this.IsVisible  = false;
    }

	Toggle() {
		if (this.IsVisible)
            this.Hide();
		else
            this.Show();
	}

    Show() {
        this.Element.classList.add("show-playlist-reader");
    }

    Hide() {
        this.Element.classList.remove("show-playlist-reader");
    }
}

const _playlistReader = new PlaylistReader;