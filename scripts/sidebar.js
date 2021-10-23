class Filters {
	constructor() {
		this.FilterArtist	= document.getElementById('FilterAuthor');
		this.FilterAlbum	= document.getElementById('FilterAlbum');
		this.FilterId		= document.getElementById('FilterId');
		this.FilterName		= document.getElementById('FilterName');
		this.Order			= 'ASC';

		this.FilterArtist.addEventListener('click', evt => this.ByArtist(), false);
		this.FilterAlbum.addEventListener('click', evt => this.ByAlbum(), false);
		this.FilterId.addEventListener('click', evt => this.ByID(), false);
		this.FilterName.addEventListener('click', evt => this.ByName(), false);

	}

	ByAlbum() {
		_library.GetFiles('file_album', this.Order);
		this.ChangeOrder();
	}

	ByArtist() {
		_library.GetFiles('file_author', this.Order);
		this.ChangeOrder();
	}

	ByID() {
		_library.GetFiles('file_id', this.Order);
		this.ChangeOrder();
	}

	ByName() {
		_library.GetFiles('file_name', this.Order);
		this.ChangeOrder();
	}

	ChangeOrder() {
		if (this.Order == 'ASC')
			this.Order = 'DESC';
		else
			this.Order = 'ASC';
	}
}

const _sidebar = new class {
	constructor() {
		this.Element			= document.getElementById('Sidebar');
		this.List				= document.getElementById('SidebarList');
		this.Arrow				= document.getElementById('Arrow');
		this.MyAccount			= document.getElementById('MyAccountSidebar');
		this.CreateAccount		= document.getElementById('CreateAccountSidebar');
		this.Help				= document.getElementById('HelpSidebar');
		this.UploadFile			= document.getElementById('UploadFileSidebar');
		this.EditFile			= document.getElementById('EditFileSidebar');
		this.DeleteFile			= document.getElementById('DeleteFileSidebar');
		this.Filters			= new Filters();
		this.MyMusics			= document.getElementById('MyMusicsSidebar');
		this.MyPlaylists		= document.getElementById('MyPlaylistsSidebar');
		this.CreatePlaylist		= document.getElementById('CreatePlaylistSidebar');
		this.IsVisible			= false;

		this.Arrow.addEventListener('click', evt => this.Toggle(), false);
		this.MyAccount.addEventListener('click', evt => _account.Toggle(), false);
		this.CreateAccount.addEventListener('click', evt => _createAccount.Toggle(), false);
		this.Help.addEventListener('click', evt => _help.Show(), false);
		this.UploadFile.addEventListener('click', evt => _uploadSection.Toggle(), false);
		this.EditFile.addEventListener('click', evt => _editLayouts.Toggle(), false);
		this.DeleteFile.addEventListener('click', evt => _deleteLayouts.Toggle(), false);
		this.MyMusics.addEventListener('click', evt => _library.GetFiles(), false);
		this.MyPlaylists.addEventListener('click', evt => _playlistSection.Toggle(), false);
		this.CreatePlaylist.addEventListener('click', evt => _addLayouts.Toggle(), false);
	}

	Show() {
		this.Arrow.classList.add('arrow-active');
		this.Element.classList.add('sidebar-show');
		document.getElementById('Library').classList.add('library-sidebar');
		document.getElementById('DivPlaylist').classList.remove('playlist-sidebar-hided');
		document.getElementById('AudioPlayer').classList.add('reader-sidebar');
		this.IsVisible = true;
	}

	Hide() {
		this.Arrow.classList.remove('arrow-active');
		this.Element.classList.remove('sidebar-show');
		document.getElementById('Library').classList.remove('library-sidebar');
		document.getElementById('DivPlaylist').classList.add('playlist-sidebar-hided');
		document.getElementById('AudioPlayer').classList.remove('reader-sidebar');
		this.IsVisible = false;
	}

	Toggle() {
		if (this.IsVisible)
			this.Hide();
		else
			this.Show();
	}
}