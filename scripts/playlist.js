// Get all musics of a playlist & print them
function openPlaylist(identifier) {
	if (identifier != undefined) {
		var playlistId = document.getElementById(identifier).dataset.id;

		$.ajax({
			url: server + "/functions/playlists/getPlaylistsMusics.php",
			type: "POST",
			data: {"playlist_id": playlistId},
			success: function(data){
				data = JSON.parse(data);
				var library = document.getElementById("LibraryObjects");
				library.innerHTML = "";
				if (data.length != 0) {
					checkPlaylistSection();
					MusicsPlaylist = [];
					for (var i = 0; i < data.length; i++) {
						var music = new Music(data[i], i).Create();
						library.appendChild(music);
					};
				}
			}
		});
	}
}

// Hide the playlist additions or checks
function hideAdd() {
	var addElements = Object.values(document.getElementsByClassName("add"));
	var checkElements = Object.values(document.getElementsByClassName("check"));
	if (addElements.length != 0 || checkElements.length != 0) {
		addElements.forEach(element => element.remove());
		checkElements.forEach(element => element.remove());
	}

	document.getElementById("PlaylistNameElement").remove();
	document.getElementById("PlaylistButtonElement").remove();
	document.getElementById("CreatePlaylistSidebar").dataset.isActive = "false";
}

// Toggle a music's class to be added to playlist
function addToPlaylist(identifier) {
	var li = document.getElementById("Add" + identifier);
	li.classList.remove("add");
	li.classList.add("check");
	document.getElementById("Add" + identifier).addEventListener("click", function() {
		removeFromPlaylist(identifier);
	}, false);
}

// Toggle a music's class to be remove from a playlist
function removeFromPlaylist(identifier) {
	var li = document.getElementById("Add" + identifier);
	li.classList.remove("check");
	li.classList.add("add");
	document.getElementById("Add" + identifier).addEventListener("click", function() {
		addToPlaylist(identifier);
	}, false);
}

// Create the playlist with the choosed musics
function sendPlaylist() {
	var library = document.getElementById("LibraryObjects").children;
	var playlistName = document.getElementById("PlaylistName").value;
	var musicList = [];
	for (var i = 0; i < library.length; i++) {
		if (document.getElementById("Add" + i).classList.contains("check")) {
			musicList.push(document.getElementById("Music" + i).dataset.id);
		}
	}
	if (playlistName == "" || musicList == "") {
		alert("Merci de choisir des morceaux et de remplir le nom de la playlist.")
	}else {
		$.ajax({
			url: server + "/functions/playlists/createPlaylist.php",
			type: "POST",
			data: {
				"musics": musicList,
				"playlistName": playlistName
			},
			success: function(){
				hideAdd();
			}
		});
	}
}
