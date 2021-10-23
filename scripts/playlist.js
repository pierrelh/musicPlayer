const _addLayouts = new class {
	constructor() {
		this.IsActive		= false;
		this.Elements		= [];
		this.MusicsToAdd	= [];
	}

	Toggle() {
		if (this.IsActive)
			this.RemoveAll();
		else
			this.CreateAll();
	}

	AddToPlaylist(music) {
		this.MusicsToAdd.push(music.MusicID);
		music.Element.children[0].classList.remove('add');
		music.Element.children[0].classList.add('check');
		music.Element.children[0].addEventListener('click', evt => this.RemoveFromPlaylist(music), false);
	}

	RemoveFromPlaylist(music) {
		delete this.MusicsToAdd[music.MusicID];
		music.Element.children[0].classList.remove('check');
		music.Element.children[0].classList.add('add');
		music.Element.children[0].addEventListener('click', evt => this.AddToPlaylist(music), false);
	}

	CreateAll() {
		if (_editLayouts.IsActive)
			_editLayouts.RemoveAll();
		if (_deleteLayouts.IsActive)
			_deleteLayouts.RemoveAll();

		for (let index = 0; index < _library.Playlist.length; index++) {
			let editLayout = new Layout({
				class: 'add',
				event: evt => this.AddToPlaylist(_library.Playlist[index])
			});
			this.Elements.push(editLayout);
			_library.Playlist[index].Elements.Library.Element.prepend(editLayout);
		}

		let sidebarList = document.getElementById('SidebarList');
		sidebarList.append(
			new Element(
				{
					ElementType	: 'li',
					ID			: 'PlaylistNameElement'
				}
			).append(
				new Element(
					{
						ElementType	: 'input',
						ID			: 'PlaylistName',
						ClassList	: 'playlist-name',
						Type		: 'text',
						Placeholder	: 'Nom de la Playlist'
					}
				)
			),
			new Element(
				{
					ElementType	: 'li',
					ID			: 'PlaylistButtonElement'
				}
			).append(new Element(
				{
					ElementType	: 'input',
					ID			: 'ButtonCreatePlaylist',
					ClassList	: 'button-create-playlist',
					Type		: 'submit',
					Placeholder	: 'Créer la Playlist',
					EventType	: 'click',
					Listener	: evt => _playlistSection.SendPlaylist()
				}
			))
		);
		
		this.IsActive = true;
	}

	RemoveAll() {
		this.Elements.forEach(element => element.remove());
		document.getElementById('PlaylistNameElement').remove();
		document.getElementById('PlaylistButtonElement').remove();
		this.IsActive = false;
	}
}

const _playlistSection = new class {
	constructor() {
		this.Element	= document.getElementById('DivPlaylist');
		this.IsVisible	= false;
		this.Playlists	= [];
	}

	Toggle() {
		if (this.IsVisible)
			this.Hide();
		else
			this.Show();
	}

	Hide() {
		if (this.Element.classList.contains('playlist-div-show'))
			this.Element.classList.remove('playlist-div-show');
		this.IsVisible = false;
	}

	Show() {
		let self = this;
		fetch(server + '/functions/playlists/getAllPlaylists.php')
		.then((response) => response.json())
		.then(function (response) {

			if (response.length != 0) {
				self.Element.innerHTML = '';

				let ul = document.createElement('ul');
				ul.id = 'ListPlaylist';
				ul.className = 'listPlaylist';
				self.Element.append(ul);

				for (let index = 0; index < response.length; index++) (function(index) {
					self.Playlists[index] = {
						id: response[index]['playlist_id'],
						name: response[index]['playlist_name']
					}
					let li = document.createElement('li');
					ul.append(li);
					li.className = 'table';
					li.addEventListener('click', evt => self.OpenPlaylist(index), false);

					let p = document.createElement('p');
					li.append(p);
					p.innerHTML = response[index]['playlist_name'];
				})(index);
				self.Element.classList.add('playlist-div-show');
				self.IsVisible = true;
			}
		});
	}

	Reduce() {
		if (!this.Element.classList.contains('playlist-reader-showed'))
			this.Element.classList.add('playlist-reader-showed');
	}

	OpenPlaylist(identifier) {
		if (Number.isInteger(identifier)) {
			let playlistId = this.Playlists[identifier].id;

			$.ajax({
				url: server + '/functions/playlists/getPlaylistsMusics.php',
				type: 'POST',
				data: {'playlist_id': playlistId},
				success: function(data) {
					data = JSON.parse(data);
					_library.Element.innerHTML = '';
					if (data.length != 0) {
						_playlistSection.Hide();
						_library.Playlist = [];
						for (let index = 0; index < data.length; index++) {
							new Music(data[index], index);
						}
					}
				}
			});
		}
	}

	SendPlaylist() {
		if (_addLayouts.MusicsToAdd.length) {
			let playlistName = document.getElementById('PlaylistName').value;
			if (playlistName) {
				$.ajax({
					url: server + '/functions/playlists/createPlaylist.php',
					type: 'POST',
					data: {
						'musics': _addLayouts.MusicsToAdd.reverse(),
						'playlistName': playlistName
					},
					success: function() {
						_addLayouts.RemoveAll();
					}
				});
			} else {
				alert('Merci de choisir des morceaux et de remplir le nom de la playlist.');
				return;
			}
		} else {
			alert('Veuillez choisir des morceaux.')
			return;
		}
	}
}