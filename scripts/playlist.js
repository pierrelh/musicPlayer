var addToPlaylist = [];

class PlaylistSection {
	constructor() {
		this.Element = document.getElementById("DivPlaylist");
	}

	// Check if PlaylistSection is visible & hide it if so
	Check() {
		if (this.Element.classList.contains("playlist-div")) {
			this.Element.classList.remove("playlist-div");
			this.Element.classList.add("playlist-div-hide");
			return true;
		} else {
			return false;
		}
	}

	AddToPlaylist(element, music) {
		addToPlaylist.push(music)
		element.classList.remove("add");
		element.classList.add("check");
		element.addEventListener("click", evt => this.RemoveFromPlaylist(element, music));
	}

	// Get all musics of a playlist & print them
	OpenPlaylist(identifier) {
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
						playlistSection.Check();
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

	// Toggle a music's class to be remove from a playlist
	RemoveFromPlaylist(element, music) {
		var index = addToPlaylist.findIndex(x => x.ID === music.ID);
		if (index > -1) {
			addToPlaylist.splice(index, 1);
		}
		element.classList.remove("check");
		element.classList.add("add");
		element.addEventListener("click", evt => this.AddToPlaylist(element, music));
	}

	// Hide the playlist additions or checks
	HideAdd() {
		for (let index = 0; index < addLayouts.length; index++) {
			delete array[index];
		}

		document.getElementById("PlaylistNameElement").remove();
		document.getElementById("PlaylistButtonElement").remove();
		sidebar.IsCreatingPlaylist = false;
	}

	// Create the playlist with the choosed musics
	SendPlaylist() {
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
					playlistSection.HideAdd();
				}
			});
		}
	}
}

var playlistSection = new PlaylistSection()
