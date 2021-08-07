class Filters {
	constructor() {
		this.FilterArtist	= document.getElementById("FilterAuthor");
		this.FilterAlbum	= document.getElementById("FilterAlbum");
		this.FilterId		= document.getElementById("FilterId");
		this.FilterName		= document.getElementById("FilterName");
		this.Order			= "ASC";

		// Handle the filter author button click
		this.FilterArtist.addEventListener("click", evt => this.ByArtist());

		// Handle the filter album button click
		this.FilterAlbum.addEventListener("click", evt => this.ByAlbum());

		// Handle the filter id button click
		this.FilterId.addEventListener("click", evt => this.ByID());

		// Handle the filter name button click
		this.FilterName.addEventListener("click", evt => this.ByName());

	}

	ByAlbum() {
		checkPlaylistSection();
		getFiles("file_album", this.Order);
		if (this.Order == "ASC") {
			this.Order = "DESC";
		}else {
			this.Order = "ASC";
		}
	}

	ByArtist() {
		checkPlaylistSection();
		getFiles("file_author", this.Order);
		if (this.Order == "ASC") {
			this.Order = "DESC";
		}else {
			this.Order = "ASC";
		}
	}

	ByID() {
		checkPlaylistSection();
		getFiles("file_id", this.Order);
		if (this.Order == "ASC") {
			this.Order = "DESC";
		}else {
			this.Order = "ASC";
		}
	}

	ByName() {
		checkPlaylistSection();
		getFiles("file_name", this.Order);
		if (this.Order == "ASC") {
			this.Order = "DESC";
		}else {
			this.Order = "ASC";
		}
	}
}

class Sidebar {
	constructor() {
		this.Element				= document.getElementById("Sidebar")
		this.MyAccountSidebar		= document.getElementById("MyAccountSidebar");
		this.CreateAccountSidebar	= document.getElementById("CreateAccountSidebar");
		this.UploadFileSidebar		= document.getElementById("UploadFileSidebar");
		this.EditFileSidebar		= document.getElementById("EditFileSidebar");
		this.DeleteFileSidebar		= document.getElementById("DeleteFileSidebar");
		this.UploadFileSidebar		= document.getElementById("UploadFileSidebar");
		this.MyPlaylistsSidebar		= document.getElementById("MyPlaylistsSidebar");
		this.CreatePlaylistSidebar	= document.getElementById("CreatePlaylistSidebar");
		this.Filters				= new Filters();
		this.Help					= document.getElementById("HelpSidebar");
		this.Arrow					= document.getElementById("Arrow");

		this.Arrow.addEventListener("click", evt => this.Toggle());

		// Handle the my account button click
		this.MyAccountSidebar.addEventListener("click", evt => account.Toggle());

		// Handle the create account button click
		this.CreateAccountSidebar.addEventListener("click", evt => createAccount.Show());

		// Handle the upload file button click
		this.UploadFileSidebar.addEventListener("click", toggleUploadSection, false);

		// Handle the edit file button click
		this.EditFileSidebar.addEventListener("click", toggleEdit, false);

		// Handle the delete file button click
		this.DeleteFileSidebar.addEventListener("click", this.ToggleDelete());

		// Handle the my playlists button click
		this.MyPlaylistsSidebar.addEventListener("click", togglePlaylistSection, false);

		// Handle the create playlist button click
		this.CreatePlaylistSidebar.addEventListener("click", toggleCreatePlaylist, false);

		// Handle the help button click
		this.Help.addEventListener("click", evt => help.Toggle());
	}

	// Toggle sidebar section 
	Toggle() {
		if (document.getElementById("Library").classList.contains("library")) {
			// Hide the sidebar and enlarge the librarys and the player
			this.Arrow.classList.remove("arrow-active");
			this.Element.classList.add("sidebar-hide");
			document.getElementById("Library").classList.remove("library");
			document.getElementById("DivPlaylist").classList.add("playlist-sidebar-hided");
			document.getElementById("AudioPlayer").classList.add("left");
		}else {
			// Show the sidebar and reduce the librarys and the player
			this.Arrow.classList.add("arrow-active");
			this.Element.classList.remove("sidebar-hide");
			document.getElementById("Library").classList.add("library");
			document.getElementById("DivPlaylist").classList.remove("playlist-sidebar-hided");
			document.getElementById("AudioPlayer").classList.remove("left");
		}
	}	

	// Toggle delete on musics
	ToggleDelete() {
		// If elements with edit's class exists then delete them & quit
		var deleteElements = Object.values(document.getElementsByClassName("delete"));
		if (deleteElements.length != 0) {
			deleteElements.forEach(element => element.remove());
			return;
		}else {
			// If elements with delete, add or check class exists then delete them
			var editElements = Object.values(document.getElementsByClassName("edit"));
			var addElements = Object.values(document.getElementsByClassName("add"));
			var checkElements = Object.values(document.getElementsByClassName("check"));
			if (editElements.length != 0) {
				editElements.forEach(element => element.remove());
			}else if (addElements.length != 0 || checkElements.length != 0) {
				hideAdd();
			}

			// Create the Delete elements & add it to the music's parent
			var libraryChildren = document.getElementById("LibraryObjects").children;
			for (var i = 0; i < libraryChildren.length; i++) (function(i){
				var li = document.createElement("li");
				li.classList.add("delete");
				li.id = "Delete" + i;
				var parent = libraryChildren[i];
				var child = parent.children[0];
				parent.insertBefore(li, child);
			
				// Add the event on this delete's click
				document.getElementById("Delete" + i).onclick = function () {
					showDeleteSection(i);
				};
				
			})(i)
		}
	}
}

var sidebar = new Sidebar();