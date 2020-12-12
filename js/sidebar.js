var MyAccountSidebar = document.getElementById("MyAccountSidebar");
var CreateAccountSidebar = document.getElementById("CreateAccountSidebar");
var UploadFileSidebar = document.getElementById("UploadFileSidebar");
var EditFileSidebar = document.getElementById("EditFileSidebar");
var DeleteFileSidebar = document.getElementById("DeleteFileSidebar");
var UploadFileSidebar = document.getElementById("UploadFileSidebar");
var FilterAuthor = document.getElementById("FilterAuthor");
var FilterAlbum = document.getElementById("FilterAlbum");
var FilterId = document.getElementById("FilterId");
var FilterName = document.getElementById("FilterName");
var MyPlaylistsSidebar = document.getElementById("MyPlaylistsSidebar");
var CreatePlaylistSidebar = document.getElementById("CreatePlaylistSidebar");

// Handle the my account button click
MyAccountSidebar.addEventListener("click", function() {
	console.log("Opening: My account settings");
});

// Handle the create account button click
CreateAccountSidebar.addEventListener("click", function() {
	console.log("Opening: Create account");
});

// Handle the upload file button click
UploadFileSidebar.addEventListener("click", function() {
	backgroundAppear();
	var Upload = document.getElementById("Upload");
	Upload.classList.add("appear");
});

// Handle the edit file button click
EditFileSidebar.addEventListener("click", function() {
	var library = document.getElementById("LibraryObjects").children;
	for (var i = 0; i < library.length; i++) (function(i) {
		// Check if library is already in editing mode
		if (document.getElementById("Edit" + i) != undefined) {
			document.getElementById("Edit" + i).remove();
		}else {
			// Check if library is already on delete or add to playlist mode & remove it if needed
			if (document.getElementById("Delete" + i) != undefined) {
				document.getElementById("Delete" + i).remove();
			}else if (document.getElementById("Add" + i) != undefined) {
				document.getElementById("Add" + i).remove();
			}

			// Creating the Delete element & add it to the music's parent
			var li = document.createElement("li");
			li.classList.add("edit");
			li.id = "Edit" + i;
			var parent = document.getElementById("MusicList" + i);
			var child = document.getElementById("Music" + i);
			parent.insertBefore(li, child);

			// Add the event on this delete's click
			document.getElementById("Edit" + i).onclick = function () {
				showEditSection(i);
			};
		}        
	})(i);
});

// Handle the delete file button click
DeleteFileSidebar.addEventListener("click", function() {
	var library = document.getElementById("LibraryObjects").children;
	for (var i = 0; i < library.length; i++) (function(i) {
		// Check if library is already in delete mode
		if (document.getElementById("Delete" + i) != undefined) {
			document.getElementById("Delete" + i).remove();
		}else {

			// Check if library is already on delete or add to playlist mode & remove it if needed
			if (document.getElementById("Edit" + i) != undefined) {
				document.getElementById("Edit" + i).remove();
			}else if (document.getElementById("Add" + i) != undefined) {
				document.getElementById("Add" + i).remove();
			}

			// Creating the Delete element & add it to the music's parent
			var li = document.createElement("li");
			li.classList.add("delete");
			li.id = "Delete" + i;        
			var parent = document.getElementById("MusicList" + i);
			var child = document.getElementById("Music" + i);
			parent.insertBefore(li, child);
		
			// Add the event on this delete's click
			document.getElementById("Delete" + i).onclick = function () {
			  showDeleteSection(i);
			};
		}
	})(i);
});

// Handle the filter author button click
FilterAuthor.addEventListener("click", function() {
	checkPlaylistSection();
	getFiles("file_author", this.dataset.order);
	if (this.dataset.order == "ASC") {
		this.dataset.order = "DESC";
	}else {
		this.dataset.order = "ASC";
	}
});

// Handle the filter album button click
FilterAlbum.addEventListener("click", function() {
	checkPlaylistSection();
	getFiles("file_album", this.dataset.order);
	if (this.dataset.order == "ASC") {
		this.dataset.order = "DESC";
	}else {
		this.dataset.order = "ASC";
	}
});

// Handle the filter id button click
FilterId.addEventListener("click", function() {
	checkPlaylistSection();
	getFiles("file_id", this.dataset.order);
	if (this.dataset.order == "ASC") {
		this.dataset.order = "DESC";
	}else {
		this.dataset.order = "ASC";
	}
});

// Handle the filter name button click
FilterName.addEventListener("click", function() {
	checkPlaylistSection();
	getFiles("file_name", this.dataset.order);
	if (this.dataset.order == "ASC") {
		this.dataset.order = "DESC";
	}else {
		this.dataset.order = "ASC";
	}
});

// Handle the my playlists button click
MyPlaylistsSidebar.addEventListener("click", function() {
	var DivPlaylist = document.getElementById("DivPlaylist");
	
	// Check if DivPlaylist is already open to close it if needed
	if (DivPlaylist.classList.contains("playlist-div")) {
		DivPlaylist.classList.add("playlist-div-hide");
		DivPlaylist.classList.remove("playlist-div");
	}else {
		// If DivPlaylist is not open then call all the playlists
		$.ajax({
			url: server + "/functions/playlist/getAllPlaylists.php",
			type: "POST",
			success: function(data){
			  data = JSON.parse(data);
			  if (data.length != 0) {
				DivPlaylist.innerHTML = "";
				DivPlaylist.classList.remove("playlist-div-hide");
				DivPlaylist.classList.add("playlist-div");
		
				var ul = document.createElement("ul");
				ul.id = "ListPlaylist";
				ul.className = "listPlaylist";
				DivPlaylist.appendChild(ul);
		
				for (var i = 0; i < data.length; i++) (function(i) {
				  li = document.createElement("li");
				  ul.appendChild(li);
				  li.className = "table";
				  li.id = "PlaylistElement" + i;
				  li.dataset.name = data[i]["playlist_name"];
				  li.dataset.musics = data[i]["playlist_musics"];
				  li.dataset.owner = data[i]["playlist_owner"];
				  li.dataset.id = data[i]["playlist_id"];
				  document.getElementById("PlaylistElement" + i).onclick = function () {
					openPlaylist("playlistElement" + i);
				  };
		
				  var p = document.createElement("p");
				  li.appendChild(p);
				  p.innerHTML = data[i]["playlist_name"];
				  p.id = "PlaylistText" + i;
				})(i);
			  }
			}
		});
	}
});

// Handle the create playlist button click
CreatePlaylistSidebar.addEventListener("click", function() {
	var library = document.getElementById("LibraryObjects").children;
	for (var i = 0; i < library.length; i++) (function(i) {
		// Check if library is already in add mode
		if (document.getElementById("Add" + i) != undefined) {
			document.getElementById("Add" + i).remove();
		}else {
			// Check if library is already on delete or edit mode & remove it if needed
			if (document.getElementById("Delete" + i) != undefined) {
				document.getElementById("Delete" + i).remove();
			}else if (document.getElementById("Edit" + i) != undefined) {
				document.getElementById("Edit" + i).remove();
			}
		
			// Creating the Add element & add it to the music's parent
			var li = document.createElement("li");
			li.classList.add("add");
			li.id = "Add" + i;  
			var parent = document.getElementById("MusicList" + i);
			var child = document.getElementById("Music" + i);
			parent.insertBefore(li, child);
		  
			// Add the event on this add's click
			document.getElementById("Add" + i).onclick = function () {
				addToPlaylist(i);
			};
		}      
	})(i);
});
