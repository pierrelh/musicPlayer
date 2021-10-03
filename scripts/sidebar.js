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
		this.Arrow				= document.getElementById("Arrow");
		this.MyAccount			= document.getElementById("MyAccountSidebar");
		this.CreateAccount		= document.getElementById("CreateAccountSidebar");
		this.Help				= document.getElementById("HelpSidebar");
		this.UploadFile			= document.getElementById("UploadFileSidebar");
		this.EditFile			= document.getElementById("EditFileSidebar");
		this.DeleteFile			= document.getElementById("DeleteFileSidebar");
		this.Filters			= new Filters();
		this.MyMusics			= document.getElementById("MyMusicsSidebar");
		this.MyPlaylists		= document.getElementById("MyPlaylistsSidebar");
		this.CreatePlaylist		= document.getElementById("CreatePlaylistSidebar");
		this.IsVisible			= false;

		this.Arrow.addEventListener("click", evt => this.ToggleVisibility(), false);

		// Handle the my account button click
		this.MyAccount.addEventListener("click", evt => account.Toggle(), false);

		// Handle the create account button click
		this.CreateAccount.addEventListener("click", evt => createAccount.Show(), false);

		// Handle the help button click
		this.Help.addEventListener("click", evt => help.Toggle(), false);

		// Handle the upload file button click
		this.UploadFile.addEventListener("click", evt => uploadSection.Toggle(), false);

		// Handle the edit file button click
		this.EditFile.addEventListener("click", evt => editLayouts.ToggleVisibility(), false);

		// Handle the delete file button click
		this.DeleteFile.addEventListener("click", evt => deleteLayouts.ToggleVisibility(), false);

		// Handle the my musics button click
		this.MyMusics.addEventListener("click", evt => library.GetFiles(), false);

		// Handle the my playlists button click
		this.MyPlaylists.addEventListener("click", evt => playlistSection.ToggleVisibility(), false);

		// Handle the create playlist button click
		this.CreatePlaylist.addEventListener("click", evt => addLayouts.ToggleVisibility(), false);
	}

	// Toggle sidebar section 
	ToggleVisibility() {
		if (this.IsVisible) {
			// Hide the sidebar and enlarge the librarys and the player
			this.Arrow.classList.remove("arrow-active");
			this.Element.classList.remove("sidebar-show");
			document.getElementById("Library").classList.remove("library-sidebar");
			document.getElementById("DivPlaylist").classList.add("playlist-sidebar-hided");
			document.getElementById("AudioPlayer").classList.add("left");
			this.IsVisible = false;
		} else {
			// Show the sidebar and reduce the librarys and the player
			this.Arrow.classList.add("arrow-active");
			this.Element.classList.add("sidebar-show");
			document.getElementById("Library").classList.add("library-sidebar");
			document.getElementById("DivPlaylist").classList.remove("playlist-sidebar-hided");
			document.getElementById("AudioPlayer").classList.remove("left");
			this.IsVisible = true;
		}
	}
}

const sidebar = new Sidebar();