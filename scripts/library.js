class Library {
	constructor() {
		this.Element		= document.getElementById("Library");
		this.Playlist		= [];
		this.RandomPlaylist	= [];
		this.GetFiles();
	}

	GetPlaylist() {		
		if (_random.IsRandom)
			return this.RandomPlaylist.slice();
		else
			return this.Playlist.slice();
	}

	ShuffleMusics() {
		for (let i = this.Playlist.length - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * (i + 1));
			[this.Playlist[i], this.Playlist[j]] = [this.Playlist[j], this.Playlist[i]];
		}
	}

	GetFiles(row = "file_id", type = "DESC") {
		if (typeof _playlistSection !== "undefined") {
			_playlistSection.Hide();
		}
		let self = this;
		$.ajax({
			url: server + "/functions/files/getAllFiles.php",
			type: "POST",
			data: {
				"row": row,
				"type": type
			},
			success: function(data){
				data = JSON.parse(data);
				if (data.length != 0) {
					self.Element.innerHTML = "";
					self.Playlist = [];
					for (let i = 0; i < data.length; i++) {
						let music = new Music(data[i], i);
						self.Playlist.push(music);
						self.Element.appendChild(music.Create());
					};
				}
			}
		});
	}

	Reduce() {
		if (this.Element.classList.contains("library-reader-active"))
			this.Element.classList.add("library-reader-active");
	}
}

const _library = new Library();