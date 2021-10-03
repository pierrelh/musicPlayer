var addToPlaylist = [];

class PlaylistSection {
	constructor() {
		this.Element	= document.getElementById("DivPlaylist");
		this.IsVisible	= false;
	}

	ToggleVisibility() {
		if (this.IsVisible) {
			this.Hide();
			this.IsVisible = false;
		} else {
			this.Show();
			this.IsVisible = true;
		}
	}

	// Check if PlaylistSection is visible & hide it if so
	Hide() {
		if (this.Element.classList.contains("playlist-div")) {
			this.Element.classList.remove("playlist-div");
			this.Element.classList.add("playlist-div-hide");
		}
	}

	// Toggle playlist section
	Show() {
		var self = this;
		fetch(server + "/functions/playlists/getAllPlaylists.php")
		.then((response) => response.json())
		.then(function (response) {

			if (response.length != 0) {
				self.Element.innerHTML = "";

				var ul = document.createElement("ul");
				ul.id = "ListPlaylist";
				ul.className = "listPlaylist";
				self.Element.appendChild(ul);

				for (var i = 0; i < response.length; i++) (function(i) {
					li = document.createElement("li");
					ul.appendChild(li);
					li.className = "table";
					li.id = "PlaylistElement" + i;
					li.dataset.name = response[i]["playlist_name"];
					li.dataset.id = response[i]["playlist_id"];
					document.getElementById("PlaylistElement" + i).addEventListener("click", function(){
						playlistSection.OpenPlaylist("PlaylistElement" + i);
					}, false);

					var p = document.createElement("p");
					li.appendChild(p);
					p.innerHTML = response[i]["playlist_name"];
					p.id = "PlaylistText" + i;
				})(i);
				self.Element.classList.remove("playlist-div-hide");
				self.Element.classList.add("playlist-div");
			}
		});
	}

	AddToPlaylist(element, music) {
		addToPlaylist.push(music);
		element.classList.remove("add");
		element.classList.add("check");
		element.addEventListener("click", evt => this.RemoveFromPlaylist(element, music));
	}

	// Get all musics of a playlist & print them
	OpenPlaylist(identifier) {
		if (identifier) {
			var playlistId = document.getElementById(identifier).dataset.id;

			$.ajax({
				url: server + "/functions/playlists/getPlaylistsMusics.php",
				type: "POST",
				data: {"playlist_id": playlistId},
				success: function(data) {
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
			alert("Merci de choisir des morceaux et de remplir le nom de la playlist.");
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

const playlistSection = new PlaylistSection();