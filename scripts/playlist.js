class AddLayouts {
	constructor() {
		this.IsActive		= false;
		this.Elements		= [];
		this.MusicsToAdd	= [];
	}

	ToggleVisibility() {
		if (this.IsActive)
			this.RemoveAll();
		else
			this.CreateAll();
	}

	AddToPlaylist(music) {
		this.MusicsToAdd.push(music.MusicID);
		music.Element.children[0].classList.remove("add");
		music.Element.children[0].classList.add("check");
		music.Element.children[0].addEventListener("click", evt => this.RemoveFromPlaylist(music), false);
	}

	// Toggle a music's class to be remove from a playlist
	RemoveFromPlaylist(music) {
		delete this.MusicsToAdd[music.MusicID];
		music.Element.children[0].classList.remove("check");
		music.Element.children[0].classList.add("add");
		music.Element.children[0].addEventListener("click", evt => this.AddToPlaylist(music));
	}

	CreateAll() {
		if (editLayouts.IsActive)
			editLayouts.RemoveAll();
		if (deleteLayouts.IsActive)
			deleteLayouts.RemoveAll();

		for (let index = 0; index < library.MusicsPlaylist.length; index++) {
			let editLayout = new Layout({
				class: "add",
				event: evt => this.AddToPlaylist(library.MusicsPlaylist[index])
			});
			this.Elements.push(editLayout);
			library.MusicsPlaylist[index].Element.prepend(editLayout);
		}

		let sidebarList = document.getElementById("SidebarList");

		// Create the li element for input playlist name
		let listPlaylistName = document.createElement("li");
		listPlaylistName.id = "PlaylistNameElement"
		sidebarList.appendChild(listPlaylistName);

		// Create the input element for playlist name
		let playlistName = document.createElement("input");
		playlistName.id = "PlaylistName";
		playlistName.setAttribute("type", "text");
		playlistName.setAttribute("placeholder", "Nom de la Playlist");
		playlistName.classList.add("playlist-name");
		listPlaylistName.appendChild(playlistName);

		// Create the li element for the input playlist create 
		let listElement = document.createElement("li");
		listElement.id = "PlaylistButtonElement"
		sidebarList.appendChild(listElement);

		// Create the input element for playlist create
		let buttonCreatePlaylist = document.createElement("input");
		buttonCreatePlaylist.id = "ButtonCreatePlaylist";
		buttonCreatePlaylist.setAttribute("type", "submit");
		buttonCreatePlaylist.classList.add("button-create-playlist");
		buttonCreatePlaylist.value = "Créer la Playlist";
		listElement.appendChild(buttonCreatePlaylist);
		buttonCreatePlaylist.addEventListener("click", evt => playlistSection.SendPlaylist(), false);
		this.IsActive = true;
	}

	RemoveAll() {
		this.Elements.forEach(element => element.remove());
		document.getElementById("PlaylistNameElement").remove();
		document.getElementById("PlaylistButtonElement").remove();
		this.IsActive = false;
	}
}

const addLayouts = new AddLayouts();

class PlaylistSection {
	constructor() {
		this.Element	= document.getElementById("DivPlaylist");
		this.IsVisible	= false;
		this.Playlists	= [];
	}

	// Toggle the playlist section's visibility
	ToggleVisibility() {
		if (this.IsVisible)
			this.Hide();
		else
			this.Show();
	}

	// Hide the playlist section
	Hide() {
		if (this.Element.classList.contains("playlist-div-show"))
			this.Element.classList.remove("playlist-div-show");
		this.IsVisible = false;
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

					let p = document.createElement("p");
					li.appendChild(p);
					p.innerHTML = response[index]["playlist_name"];
				})(index);
				self.Element.classList.add("playlist-div-show");
				self.IsVisible = true;
			}
		});
	}

	Reduce() {
		if (!this.Element.classList.contains("playlist-reader-showed"))
			playlist.classList.add("playlist-reader-showed");
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
					library.Element.innerHTML = "";
					if (data.length != 0) {
						playlistSection.Hide();
						library.MusicsPlaylist = [];
						for (let index = 0; index < data.length; index++) {
							let music = new Music(data[index], index).Create();
							library.Element.appendChild(music);
						}
					}
				}
			});
		}
	}

	// Create the playlist with the choosed musics
	SendPlaylist() {
		if (addLayouts.MusicsToAdd.length) {
			let playlistName = document.getElementById("PlaylistName").value;
			if (playlistName) {
				$.ajax({
					url: server + "/functions/playlists/createPlaylist.php",
					type: "POST",
					data: {
						"musics": addLayouts.MusicsToAdd.reverse(),
						"playlistName": playlistName
					},
					success: function() {
						addLayouts.RemoveAll();
					}
				});
			} else {
				alert("Merci de choisir des morceaux et de remplir le nom de la playlist.");
				return;
			}
		} else {
			alert("Veuillez choisir des morceaux.")
			return;
		}
	}
}

const playlistSection = new PlaylistSection();