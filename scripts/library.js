class Library {
	constructor() {
		this.Element				= document.getElementById("LibraryObjects");
		this.MusicsPlaylist			= [];
		this.MusicsRandomPlaylist	= [];
		this.GetFiles();
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
						self.Element.appendChild(new Music(data[i], i).Create());
					};
				}
			}
		});
	}
}

const library = new Library();