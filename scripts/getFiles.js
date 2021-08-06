function getFiles(row, type){
	$.ajax({
		url: server + "/functions/files/getAllFiles.php",
		type: "POST",
		data: {
			"row": row,
			"type": type
		},
		success: function(data){
			data = JSON.parse(data);
			var library = document.getElementById("LibraryObjects");
			library.innerHTML = "";
			if (data.length != 0) {
				MusicsPlaylist = [];
				for (var i = 0; i < data.length; i++) {
					var music = new Music(data[i], i).Create();
					library.appendChild(music);
				};
			}
		}
	});
}
