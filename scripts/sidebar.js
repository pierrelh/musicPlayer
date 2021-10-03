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
		library.GetFiles("file_album", this.Order);
		if (this.Order == "ASC") {
			this.Order = "DESC";
		} else {
			this.Order = "ASC";
		}
	}

	ByArtist() {
		library.GetFiles("file_author", this.Order);
		if (this.Order == "ASC") {
			this.Order = "DESC";
		} else {
			this.Order = "ASC";
		}
	}

	ByID() {
		library.GetFiles("file_id", this.Order);
		if (this.Order == "ASC") {
			this.Order = "DESC";
		} else {
			this.Order = "ASC";
		}
	}

	ByName() {
		library.GetFiles("file_name", this.Order);
		if (this.Order == "ASC") {
			this.Order = "DESC";
		} else {
			this.Order = "ASC";
		}
	}
}

class Sidebar {
	constructor() {
		this.Element			= document.getElementById("Sidebar");
		this.MyAccount			= document.getElementById("MyAccountSidebar");
		this.CreateAccount		= document.getElementById("CreateAccountSidebar");
		this.UploadFile			= document.getElementById("UploadFileSidebar");
		this.EditFile			= document.getElementById("EditFileSidebar");
		this.DeleteFile			= document.getElementById("DeleteFileSidebar");
		this.UploadFile			= document.getElementById("UploadFileSidebar");
		this.MyMusics			= document.getElementById("MyMusicsSidebar");
		this.MyPlaylists		= document.getElementById("MyPlaylistsSidebar");
		this.CreatePlaylist		= document.getElementById("CreatePlaylistSidebar");
		this.IsCreatingPlaylist	= false;
		this.Filters			= new Filters();
		this.Help				= document.getElementById("HelpSidebar");
		this.Arrow				= document.getElementById("Arrow");
		this.IsVisible			= false;

		this.Arrow.addEventListener("click", evt => this.Toggle());

		// Handle the my account button click
		this.MyAccount.addEventListener("click", evt => account.Toggle(), false);

		// Handle the create account button click
		this.CreateAccount.addEventListener("click", evt => createAccount.Show(), false);

		// Handle the upload file button click
		this.UploadFile.addEventListener("click", evt => uploadSection.Toggle(), false);

		// Handle the edit file button click
		this.EditFile.addEventListener("click", evt => this.ToggleEdit(), false);

		// Handle the delete file button click
		this.DeleteFile.addEventListener("click", evt => this.ToggleDelete(), false);

		// Handle the my musics button click
		this.MyMusics.addEventListener("click", evt => library.GetFiles(), false);

		// Handle the my playlists button click
		this.MyPlaylists.addEventListener("click", evt => playlistSection.ToggleVisibility(), false);

		// Handle the create playlist button click
		this.CreatePlaylist.addEventListener("click", evt => this.ToggleCreatePlaylist(), false);

		// Handle the help button click
		this.Help.addEventListener("click", evt => help.Toggle(), false);
	}

	// Toggle sidebar section 
	Toggle() {
		if (this.IsVisible) {
			// Hide the sidebar and enlarge the librarys and the player
			this.Arrow.classList.remove("arrow-active");
			this.Element.classList.remove("sidebar-show");
			document.getElementById("Library").classList.remove("library");
			document.getElementById("DivPlaylist").classList.add("playlist-sidebar-hided");
			document.getElementById("AudioPlayer").classList.add("left");
			this.IsVisible = false;
		} else {
			// Show the sidebar and reduce the librarys and the player
			this.Arrow.classList.add("arrow-active");
			this.Element.classList.add("sidebar-show");
			document.getElementById("Library").classList.add("library");
			document.getElementById("DivPlaylist").classList.remove("playlist-sidebar-hided");
			document.getElementById("AudioPlayer").classList.remove("left");
			this.IsVisible = true;
		}
	}

	// Toggle create a playlist
	ToggleCreatePlaylist() {
		if (this.IsCreatingPlaylist) {
			playlistSection.HideAdd();
			return;

		} else {
			// If elements with edit or delete's class exists then delete them
			var editElements = Object.values(document.getElementsByClassName("edit"));
			var deleteElements = Object.values(document.getElementsByClassName("delete"));
			if (editElements.length != 0) {
				editElements.forEach(element => element.remove());
			} else if (deleteElements.length != 0){
				deleteElements.forEach(element => element.remove());
			}

			// Creating the Add element & add it to the music's parent
			var libraryChildren = document.getElementById("LibraryObjects").children;
			for (var i = 0; i < libraryChildren.length; i++) {
				var addLayout = new AddLayout()
				var parent = libraryChildren[i];
				var child = parent.children[0];
				parent.insertBefore(addLayout, child);
			}

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
			buttonCreatePlaylist.addEventListener("click", playlistSection.SendPlaylist());
			buttonCreatePlaylist.classList.add("button-create-playlist");
			buttonCreatePlaylist.value = "Créer la Playlist";
			listElement.appendChild(buttonCreatePlaylist);

			this.IsCreatingPlaylist = true;
		}
	}

	// Toggle delete on musics
	ToggleDelete() {
		// If elements with edit's class exists then delete them & quit
		var deleteElements = Object.values(document.getElementsByClassName("delete"));
		if (deleteElements.length != 0) {
			deleteElements.forEach(element => element.remove());
			return;
		} else {
			// If elements with delete, add or check class exists then delete them
			var editElements = Object.values(document.getElementsByClassName("edit"));
			var addElements = Object.values(document.getElementsByClassName("add"));
			var checkElements = Object.values(document.getElementsByClassName("check"));
			if (editElements.length != 0) {
				editElements.forEach(element => element.remove());
			} else if (addElements.length != 0 || checkElements.length != 0) {
				playlistSection.HideAdd();
			}

			// Create the Delete elements & add it to the music's parent
			var libraryChildren = document.getElementById("LibraryObjects").children;
			for (var i = 0; i < libraryChildren.length; i++) {
				var deleteLayout = new DeleteLayout(i);
				var parent = libraryChildren[i];
				var child = parent.children[0];
				parent.insertBefore(deleteLayout, child);
			}
		}
	}

	// Toggle edit on musics
	ToggleEdit() {
		// If elements with edit's class exists then delete them & quit
		var editElements = Object.values(document.getElementsByClassName("edit"));
		if (editElements.length != 0) {
			editElements.forEach(element => element.remove());
			return;
		} else {
			// If elements with delete, add or check class exists then delete them
			var deleteElements = Object.values(document.getElementsByClassName("delete"));
			var addElements = Object.values(document.getElementsByClassName("add"));
			var checkElements = Object.values(document.getElementsByClassName("check"));
			if (deleteElements.length != 0) {
				deleteElements.forEach(element => element.remove());
			} else if (addElements.length != 0 || checkElements.length != 0) {
				playlistSection.HideAdd();
			}

			// Create the edit elements
			var libraryChildren = document.getElementById("LibraryObjects").children;
			for (var i = 0; i < libraryChildren.length; i++) {
				var editLayout = new EditLayout(i);
				var parent = libraryChildren[i];
				var child = parent.children[0];
				parent.insertBefore(editLayout, child);
			}
		}
	}
}

const sidebar = new Sidebar();