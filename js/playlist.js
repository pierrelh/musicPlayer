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
					playlist = [];
					for (var i = 0; i < data.length; i++) (function(i) {
						var ul = document.createElement("ul");
						ul.id = "MusicList" + i;
						library.appendChild(ul);

						li = document.createElement("li");
						ul.appendChild(li);
						li.className = "view";
						li.id = "Music" + i;
						li.dataset.url = data[i]["file_url"];
						li.dataset.artist = data[i]["file_author"];
						li.dataset.title = data[i]["file_name"];
						li.dataset.album = data[i]["file_album"];
						li.dataset.img = data[i]["file_image"];
						li.dataset.id = data[i]["file_id"];
						document.getElementById("Music" + i).addEventListener("click", function(){playMusic(i)}, false);

						if (data[i]["file_image"] != "") {
							li.style.backgroundImage = "url('" + data[i]['file_image'] + "')";
						}

						var lip = document.createElement("li");
						ul.appendChild(lip);

						var p = document.createElement("p");
						lip.appendChild(p);
						p.innerHTML = data[i]["file_author"] + " - " + data[i]["file_name"];
						p.id = "Musicp" + i;
						document.getElementById("MusicP" + i).addEventListener("click", function(){playMusic(i)}, false);

						playlist.push(i);
					})(i);
				}
			}
		});
	}
}

// Hide the playlist addition
function hideAdd() {
	var library = document.getElementById("LibraryObjects").children;
	for (var i = 0; i < library.length; i++) {
		document.getElementById("Add" + i).remove();
	}
	document.getElementById("PlaylistNameElement").remove();
	document.getElementById("PlaylistButtonElement").remove();
	document.getElementById("MyPlaylistsSidebar").dataset.isActive = "false";
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
