var addToPlaylist = [];

class PlaylistSection {
	constructor() {
		this.Element	= document.getElementById("DivPlaylist");
		this.IsVisible	= false;
		this.Playlists	= [];
	}

	// Toggle the playlist section's visibility
	ToggleVisibility() {
		if (this.IsVisible) {
			this.Hide();
			this.IsVisible = false;
		} else {
			this.Show();
			this.IsVisible = true;
		}
	}

	// Hide the playlist section
	Hide() {
		if (this.Element.classList.contains("playlist-div")) {
			this.Element.classList.remove("playlist-div");
			this.Element.classList.add("playlist-div-hide");
		}
	}

	// Show the playlist section
	Show() {
		let self = this;
		fetch(server + "/functions/playlists/getAllPlaylists.php")
		.then((response) => response.json())
		.then(function (response) {

			if (response.length != 0) {
				self.Element.innerHTML = "";

				let ul = document.createElement("ul");
				ul.id = "ListPlaylist";
				ul.className = "listPlaylist";
				self.Element.appendChild(ul);

				for (let index = 0; index < response.length; index++) (function(index) {
					self.Playlists[index] = {
						id: response[index]["playlist_id"],
						name: response[index]["playlist_name"]
					}
					let li = document.createElement("li");
					ul.appendChild(li);
					li.className = "table";
					li.addEventListener("click", evt => self.OpenPlaylist(index), false);

					let  p = document.createElement("p");
					li.appendChild(p);
					p.innerHTML = response[index]["playlist_name"];
				})(index);
				self.Element.classList.remove("playlist-div-hide");
				self.Element.classList.add("playlist-div");
			}
		});
	}

	AddToPlaylist(element, music) {
		addToPlaylist.push(music);
		element.classList.remove("add");
		element.classList.add("check");
		element.addEventListener("click", evt => this.RemoveFromPlaylist(element, music), false);
	}

	// Get all musics of a playlist & print them
	OpenPlaylist(identifier) {
		if (Number.isInteger(identifier)) {
			let playlistId = this.Playlists[identifier].id;

			$.ajax({
				url: server + "/functions/playlists/getPlaylistsMusics.php",
				type: "POST",
				data: {"playlist_id": playlistId},
				success: function(data) {
					data = JSON.parse(data);
					console.log(data);
					library.Element.innerHTML = "";
					if (data.length != 0) {
						playlistSection.Hide();
						library.MusicsPlaylist = [];
						for (let index = 0; index < data.length; index++) {
							let music = new Music(data[index], index).Create();
							library.appendChild(music);
						}
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
		} else {
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