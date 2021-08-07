// Shuffle an array
function shuffle(a) {
	for (let i = a.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[a[i], a[j]] = [a[j], a[i]];
	}
	return a;
}

// Decode html txt
function htmlDecode(input) {
	var doc = new DOMParser().parseFromString(input, "text/html");
	return doc.documentElement.textContent;
}

// Set Time to the right format
function getTime(t) {
	var m = ~~(t / 60),
	s = ~~(t % 60);
	return (m < 10 ? "0" + m : m) + ":" + (s < 10 ? "0" + s : s);
}

// Decode dataset to put in values
function decodeHTML(html) {
	var txt = document.createElement("textarea");
	txt.innerHTML = html;
	return txt.value;
}

// Dynamically read & print a new input's image
function readURL(input, bannerId) {
	if (input.files && input.files[0]) {
		var reader = new FileReader();

		reader.addEventListener("load", function(e) {
			document.getElementById(bannerId).style.backgroundImage = "url(" + e.target.result + ")"
		});

		reader.readAsDataURL(input.files[0]);
	}
}

// Get an url & return the public_id. ex: https://exemple/exemple/monfichier.jpg => monfichier
function getPublicIdFromUrl(url) {
	url = url.split("/");
	url = url.pop();
	url = url.split(".");
	url.pop();
	url = url.join("");
	return url;
}

// Check if PlaylistSection is visible & hide it if so
function checkPlaylistSection() {
	if (document.getElementById("DivPlaylist").classList.contains("playlist-div")) {
		document.getElementById("DivPlaylist").classList.remove("playlist-div");
		document.getElementById("DivPlaylist").classList.add("playlist-div-hide");
		return true;
	} else {
		return false;
	}
}

// Upload a file to Cloudinary
function uploadFileCloudinary(formDataMusic, barId, txtId, link) {
	return new Promise((resolve, reject) => {
		var url = server + "/functions/files/" + link;
		
		var xhr = new XMLHttpRequest();
	
		// Update progress for audio file
		xhr.upload.addEventListener("progress", function (e) {
			var progress = Math.round((e.loaded * 100.0) / e.total);
			document.getElementById(barId).style.width = progress + "%";
			document.getElementById(txtId).innerHTML = progress + "%";
		});

		xhr.onerror = () => reject("false");
		xhr.onreadystatechange = function () {
			if (this.readyState == 4 && this.status == 200) {
				document.getElementById(txtId).innerHTML = "Envoyé";
				resolve(this.responseText);
			}
		}
		xhr.open("POST", url, true);
		xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest");
		xhr.send(formDataMusic);
	});
}

// Toggle upload section
function toggleUploadSection() {
	if (document.getElementById("Upload").classList.contains("appear")) {
		background.Hide();
		document.getElementById("Upload").classList.remove("appear");		
	}else {
		background.Show();
		document.getElementById("Upload").classList.add("appear");
	}
}

// Toggle create a playlist
function toggleCreatePlaylist() {
	var CreatePlaylistSidebar = document.getElementById("CreatePlaylistSidebar");
	if (CreatePlaylistSidebar.dataset.isActive == "true") {

		hideAdd();
		return;

	}else {
		// If elements with edit or delete's class exists then delete them
		var editElements = Object.values(document.getElementsByClassName("edit"));
		var deleteElements = Object.values(document.getElementsByClassName("delete"));
		if (editElements.length != 0) {
			editElements.forEach(element => element.remove());
		}else if (deleteElements.length != 0){
			deleteElements.forEach(element => element.remove());
		}

		// Creating the Add element & add it to the music's parent
		var libraryChildren = document.getElementById("LibraryObjects").children;
		for (var i = 0; i < libraryChildren.length; i++) (function(i){
			var li = document.createElement("li");
			li.classList.add("add");
			li.id = "Add" + i;
			var parent = libraryChildren[i];
			var child = parent.children[0];
			parent.insertBefore(li, child);
			
			// Add the event on this add's click
			document.getElementById("Add" + i).addEventListener("click", function(){
				addToPlaylist(i)
			}, false);
		})(i)

		var sidebarList = document.getElementById("SidebarList");

		// Create the li element for input playlist name
		var listPlaylistName = document.createElement("li");
		listPlaylistName.id = "PlaylistNameElement"
		sidebarList.appendChild(listPlaylistName);
		
		// Create the input element for playlist name
		var playlistName = document.createElement("input");
		playlistName.id = "PlaylistName";
		playlistName.setAttribute("type", "text");
		playlistName.setAttribute("placeholder", "Nom de la Playlist");
		playlistName.classList.add("playlist-name");
		listPlaylistName.appendChild(playlistName);
		
		// Create the li element for the input playlist create 
		var listElement = document.createElement("li");
		listElement.id = "PlaylistButtonElement"
		sidebarList.appendChild(listElement);
		
		// Create the input element for playlist create
		var buttonCreatePlaylist = document.createElement("input");
		buttonCreatePlaylist.id = "ButtonCreatePlaylist";
		buttonCreatePlaylist.setAttribute("type", "submit");
		buttonCreatePlaylist.addEventListener("click", sendPlaylist, false);
		buttonCreatePlaylist.classList.add("button-create-playlist");
		buttonCreatePlaylist.value = "Créer la Playlist";
		listElement.appendChild(buttonCreatePlaylist);

		CreatePlaylistSidebar.dataset.isActive = "true";
		
	}
}

// Toggle edit on musics
function toggleEdit() {
	// If elements with edit's class exists then delete them & quit
	var editElements = Object.values(document.getElementsByClassName("edit"));
	if (editElements.length != 0) {
		editElements.forEach(element => element.remove());
		return;
	}else {
		// If elements with delete, add or check class exists then delete them
		var deleteElements = Object.values(document.getElementsByClassName("delete"));
		var addElements = Object.values(document.getElementsByClassName("add"));
		var checkElements = Object.values(document.getElementsByClassName("check"));
		if (deleteElements.length != 0) {
			deleteElements.forEach(element => element.remove());
		}else if (addElements.length != 0 || checkElements.length != 0) {
			hideAdd();
		}

		// Create the edit elements
		var libraryChildren = document.getElementById("LibraryObjects").children;
		for (var i = 0; i < libraryChildren.length; i++) (function(i){
			var li = document.createElement("li");
			li.classList.add("edit");
			li.id = "Edit" + i;
			var parent = libraryChildren[i];
			var child = parent.children[0];
			parent.insertBefore(li, child);

			// Add the event on this delete's click
			document.getElementById("Edit" + i).onclick = function () {
				showEditSection(i);
			};
			
		})(i)
	}
}

// Toggle playlist section
function togglePlaylistSection() {
	var DivPlaylist = document.getElementById("DivPlaylist");
	
	// Check if DivPlaylist is already open to close it if needed
	if (checkPlaylistSection()) {
		return;
	}else {
		// If DivPlaylist is not open then call all the playlists
		fetch(server + "/functions/playlists/getAllPlaylists.php")
		.then((response) => response.json())
		.then(function (response) {
			
			if (response.length != 0) {
				DivPlaylist.innerHTML = "";
				DivPlaylist.classList.remove("playlist-div-hide");
				DivPlaylist.classList.add("playlist-div");

				var ul = document.createElement("ul");
				ul.id = "ListPlaylist";
				ul.className = "listPlaylist";
				DivPlaylist.appendChild(ul);

				for (var i = 0; i < response.length; i++) (function(i) {
					li = document.createElement("li");
					ul.appendChild(li);
					li.className = "table";
					li.id = "PlaylistElement" + i;
					li.dataset.name = response[i]["playlist_name"];
					li.dataset.id = response[i]["playlist_id"];
					document.getElementById("PlaylistElement" + i).addEventListener("click", function(){
						openPlaylist("PlaylistElement" + i);
					}, false);

					var p = document.createElement("p");
					li.appendChild(p);
					p.innerHTML = response[i]["playlist_name"];
					p.id = "PlaylistText" + i;
				})(i);
			}
		});
	}
}