const _deleteLayouts = new class {
	constructor() {
		this.IsActive	= false;
	}

	Toggle() {
		if (this.IsActive)
			this.RemoveAll();
		else
			this.CreateAll();
	}

	CreateAll() {
		for (let index = 0; index < _library.Playlist.length; index++)
			_library.Playlist[index].CreateLayout('bi-trash', evt => _deleteSection.Show(_library.Playlist[index]));
		this.IsActive = true;
	}

	RemoveAll() {
		_library.Playlist.forEach(music => music.RemoveLayout());
		this.IsActive = false;
	}
}

const _deleteSection = new class {
	constructor() {
		this.Element	= document.getElementById('Delete');
		this.Title		= document.getElementById('DeleteTitle')
		this.Yes		= document.getElementById('DeleteYes');
		this.No			= document.getElementById('DeleteNo');
		this.Music		= undefined;

		this.No.addEventListener('click', evt => this.Hide(), false);
		this.Yes.addEventListener('click', evt => this.DeleteMusic(), false);
	}

	DeleteMusic() {
		if (!this.Music.MusicID)		
			return _info.SetTitle('Une erreur s\'est produite.', 'red');
		const self = this;
		$.ajax({
			url: server + '/ajax/Files/Delete.php',
			type: 'POST',
			data: {
				'file_id':		this.Music.MusicID,
				'file_url':		this.Music.URL,
				'file_covers':	JSON.stringify(this.Music.Covers)
			},
			success: function(data) {
				if (data != 1)
					return _info.SetTitle('Une erreur inatendue s\'est produite, merci de réessayer plus tard.', 'red');
				self.Hide();
				self.Music.Elements.Library.Main.remove();
				self.Music.Elements.Reader.Main.remove();
			}
		});
	}

	Hide() {
		_background.Hide();
		this.Element.className = '';
	}

	Show(music) {
		this.Music = music
		this.Title.innerHTML = 'Voulez-vous vraiment supprimer: ' + music.Title + ' de ' + music.Artist + ' ?';
		_background.Show();
		this.Element.className = 'appear';
	}
}