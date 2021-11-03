const _addLayouts = new class {
	constructor() {
		this.IsActive		= false;
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
		music.CreateLayout('bi-check2', evt => this.RemoveFromPlaylist(music));
	}

	RemoveFromPlaylist(music) {
		delete this.MusicsToAdd[music.MusicID];
		music.CreateLayout('bi-plus-lg', evt => this.AddToPlaylist(music));
	}

	CreateAll() {
		for (let index = 0; index < _library.Playlist.length; index++)
			_library.Playlist[index].CreateLayout('bi-plus-lg', evt => this.AddToPlaylist(_library.Playlist[index]));

		_sidebar.List.append(
			new Element({
				ElementType	: 'li',
				ID			: 'PlaylistNameElement',
				Children	: [
					new Element({
						ElementType	: 'input',
						ID			: 'PlaylistName',
						ClassList	: 'playlist-name',
						Type		: 'text',
						Placeholder	: 'Nom de la Playlist'
					})
				]
			}),
			new Element({
				ElementType	: 'li',
				ID			: 'PlaylistButtonElement',
				Children	: [
					new Element({
							ElementType	: 'input',
							ID			: 'ButtonCreatePlaylist',
							ClassList	: 'button-create-playlist',
							Type		: 'submit',
							Placeholder	: 'Créer la Playlist',
							EventType	: 'click',
							Listener	: evt => _playlistSection.SendPlaylist()
					})
				]
			})
		);
		this.IsActive = true;
	}

	RemoveAll() {
		_library.Playlist.forEach(music => music.RemoveLayout());
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
		this.Hydrate();
		this.Element.classList.add('playlist-div-show');
		this.IsVisible = true;
	}

	Hydrate() {
		let self = this;
		fetch(server + '/ajax/Playlist/GetAll.php')
		.then((response) => response.json())
		.then(function (response) {

			if (response.length == 0)
				return;

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
				li.className = 'table';
				li.addEventListener('click', evt => self.OpenPlaylist(index), false);

				let p = document.createElement('p');
				p.innerHTML = response[index]['playlist_name'];
				li.append(p);
				ul.append(li);
			})(index);
		});
	}

	Reduce() {
		if (!this.Element.classList.contains('playlist-reader-showed'))
			this.Element.classList.add('playlist-reader-showed');
	}

	OpenPlaylist(identifier) {
		if (!Number.isInteger(identifier))
			return;
		let playlistId = this.Playlists[identifier].id;

		$.ajax({
			url: server + '/ajax/Playlist/GetMusics.php',
			type: 'POST',
			data: {'playlist_id': playlistId},
			success: function(data) {
				data = JSON.parse(data);
				_library.Element.innerHTML = '';
				if (data.length == 0)
					return;
				_playlistSection.Hide();
				_library.Playlist = [];
				for (let index = 0; index < data.length; index++)
					new Music(data[index], index);
			}
		});
	}

	SendPlaylist() {
		if (_addLayouts.MusicsToAdd.length == 0)
			return _info.SetTitle('Veuillez choisir des morceaux.', 'red');
		let playlistName = document.getElementById('PlaylistName').value;
		if (playlistName == "")		
			return _info.SetTitle('Merci de choisir des morceaux et de remplir le nom de la playlist.', 'red');
		$.ajax({
			url: server + '/ajax/Playlist/Create.php',
			type: 'POST',
			data: {
				'musics': _addLayouts.MusicsToAdd.reverse(),
				'playlistName': playlistName
			},
			success: function() {
				_addLayouts.RemoveAll();
			}
		});
	}
}