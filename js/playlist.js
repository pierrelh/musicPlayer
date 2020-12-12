function openPlaylist(identifier) {
	if (identifier != undefined) {
		var musics = document.getElementById(identifier).dataset.musics;

		$.ajax({
			url: "../functions/files/getFilesById.php",
			type: "POST",
			data: {"musics": musics},
			success: function(data){
				data = JSON.parse(data);
				var library = document.getElementById("LibraryObjects");
				library.innerHTML = "";
				if (data.length != 0) {
					checkPlaylistSection();
					for (var i = 0; i < data.length; i++) (function(i) {
						var ul = document.createElement("ul");
						ul.id = "ul" + i;
						library.appendChild(ul);

						li = document.createElement("li");
						ul.appendChild(li);
						li.className = "view";
						li.id = i;
						li.dataset.url = data[i]["file_url"];
						li.dataset.artist = data[i]["file_author"];
						li.dataset.title = data[i]["file_name"];
						li.dataset.album = data[i]["file_album"];
						li.dataset.img = data[i]["file_image"];
						li.dataset.id = data[i]["file_id"];
						document.getElementById(i).onclick = function () {
							mediaPlayerAppear(i);
						};

						if (data[i]["file_image"] != "") {
							li.style.backgroundImage = "url('" + data[i]['file_image'] + "')";
						}

						var lip = document.createElement("li");
						ul.appendChild(lip);

						var p = document.createElement("p");
						lip.appendChild(p);
						p.innerHTML = data[i]["file_author"] + " - " + data[i]["file_name"];
						p.id = "p" + i;
						document.getElementById("p" + i).onclick = function () {
							mediaPlayerAppear(i);
						};
					})(i);
				}
			}
		});
	}
}

function addToPlaylist(identifier) {
	var li = document.getElementById("Add" + identifier);
	li.classList.remove("add");
	li.classList.add("check");
	document.getElementById("add" + identifier).setAttribute("onclick", "removeToPlaylist(" + identifier + ")");
	if (document.getElementById("buttonCreatePlaylist") == undefined) {
		var sidebarList = document.getElementById("sidebarList");

		var listPlaylistName = document.createElement("li");
		listPlaylistName.id = "playlistNameElement"
		sidebarList.appendChild(listPlaylistName);

		var playlistName = document.createElement("input");
		playlistName.id = "playlistName";
		playlistName.setAttribute("type", "text");
		playlistName.setAttribute("placeholder", "Nom de la Playlist");
		playlistName.classList.add("playlist-name");
		listPlaylistName.appendChild(playlistName);


		var listElement = document.createElement("li");
		listElement.id = "playlistButtonElement"
		sidebarList.appendChild(listElement);

		var buttonCreatePlaylist = document.createElement("input");
		buttonCreatePlaylist.id = "buttonCreatePlaylist";
		buttonCreatePlaylist.setAttribute("type", "submit");
		buttonCreatePlaylist.setAttribute("onclick", "sendPlaylist()");
		buttonCreatePlaylist.classList.add("button-create-playlist");
		buttonCreatePlaylist.value = "Créer la Playlist";
		listElement.appendChild(buttonCreatePlaylist);
	}
}

function removeToPlaylist(identifier) {
	var li = document.getElementById("add" + identifier);
	li.classList.remove("check");
	li.classList.add("add");
	document.getElementById("add" + identifier).setAttribute("onclick", "addToPlaylist(" + identifier + ")");
	var choosed = false;
	var library = document.getElementById("LibraryObjects").children;
	for (var i = 0; i < library.length; i++) {
		if (document.getElementById("add" + i).classList.contains("check")) {
			choosed = true;
		}
	}
	if (choosed == false) {
		document.getElementById("buttonCreatePlaylist").remove();
		document.getElementById("playlistName").remove();
		document.getElementById("playlistButtonElement").remove();
		document.getElementById("playlistNameElement").remove();
	}
}

function sendPlaylist() {
	var library = document.getElementById("LibraryObjects").children;
	var playlistName = document.getElementById("playlistName").value;
	var musicList = "";
	for (var i = 0; i < library.length; i++) {
		if (document.getElementById("add" + i).classList.contains("check")) {
			musicList += document.getElementById(i).dataset.id + "#STOP#";
		}
	}
	if (playlistName == "" || musicList == "") {
		alert("Merci de choisir des morceaux et de remplir le nom de la playlist.")
	}else {
		$.ajax({
			url: "../functions/playlist/createPlaylist.php",
			type: "POST",
			data: {"musics": musicList,
						 "playlistName": playlistName},
			success: function(data){
				hideAdd();
			}
		});
	}
}
