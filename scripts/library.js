class Library {
	constructor() {
		this.Element				= document.getElementById("Library");
		this.MusicsPlaylist			= [];
		this.MusicsRandomPlaylist	= [];
		this.GetFiles();
	}

	// Shuffle the musics playlist
	ShuffleMusics() {
		for (let i = this.MusicsPlaylist.length - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * (i + 1));
			[this.MusicsPlaylist[i], this.MusicsPlaylist[j]] = [this.MusicsPlaylist[j], this.MusicsPlaylist[i]];
		}
	}

	GetFiles(row = "file_id", type = "DESC") {
		if (typeof playlistSection !== "undefined") {
			playlistSection.Hide();
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
					self.MusicsPlaylist = [];
					for (let i = 0; i < data.length; i++) {
						let music = new Music(data[i], i);
						self.MusicsPlaylist.push(music);
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

const library = new Library();