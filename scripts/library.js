class Library {
	constructor() {
		this.Element				= document.getElementById("LibraryObjects");
		this.MusicsPlaylist			= [];
		this.MusicsRandomPlaylist	= [];
		this.getFiles();
	}

	getFiles(row = "file_id", type = "ASC") {
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