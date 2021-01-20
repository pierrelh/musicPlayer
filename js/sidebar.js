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
var Help = document.getElementById("HelpSidebar");

// Handle the my account button click
MyAccountSidebar.addEventListener("click", openAccountSection, false);

// Handle the create account button click
CreateAccountSidebar.addEventListener("click", function() {
	backgroundAppear();
	document.getElementById("CreateAccount").classList.add("appear");
});

// Handle the upload file button click
UploadFileSidebar.addEventListener("click", openUploadSection, false);

// Handle the edit file button click
EditFileSidebar.addEventListener("click", toggleEdit, false);

// Handle the delete file button click
DeleteFileSidebar.addEventListener("click", toggleDelete, false);

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
});

// Handle the create playlist button click
CreatePlaylistSidebar.addEventListener("click", function() {
	if (this.dataset.isActive == "true") {

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

		this.dataset.isActive = "true";
		
	}
});

// Handle the help button click
Help.addEventListener("click", openHelpSection, false);