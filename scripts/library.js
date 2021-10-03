class Library {
	constructor() {
		this.Element				= document.getElementById("LibraryObjects");
		this.MusicsPlaylist			= [];
		this.MusicsRandomPlaylist	= [];
		this.getFiles('file_id', 'DESC');
	}

	getFiles(row, type){
		let self = this;
		console.log(this.Element);
		console.log(self.Element);
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
					console.log(self);
					self.Element.innerHTML = "";
					self.MusicsPlaylist = [];
					for (var i = 0; i < data.length; i++) {
						library.appendChild(new Music(data[i], i).Create());
					};
				}
			}
		});
	}
}

const library = new Library();