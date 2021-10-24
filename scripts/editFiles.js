const _editLayouts = new class {
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
			_library.Playlist[index].CreateLayout('edit', evt => _editSection.Show(_library.Playlist[index]));
		this.IsActive = true;
	}

	RemoveAll() {
		_library.Playlist.forEach(music => music.RemoveLayout());
		this.IsActive = false;
	}
}

const _editSection = new class {
	constructor() {
		this.Element		= document.getElementById('Edit');
		this.Cross			= document.getElementById('CrossEdit');
		this.CoverEdit		= document.getElementById('PictureEdit');
		this.Banner			= document.getElementById('Banner');
		this.NameEdit		= document.getElementById('FileNameEdit');
		this.AuthorEdit		= document.getElementById('FileAuthorEdit');
		this.AlbumEdit		= document.getElementById('FileAlbumEdit');
		this.Music			= undefined;
		this.EditBTN		= document.getElementById('EditButton');
		this.ProgressBar	= document.getElementById('ProgressBarEditCover');
		this.ProgressTxt	= document.getElementById('TextProgressBarEditCover');

		this.Cross.addEventListener('click', evt => this.Hide(), false);
		this.EditBTN.addEventListener('click', evt => this.Edit(evt), false);
		this.CoverEdit.addEventListener('change', evt => this.ReadURL(), false);
	}

	ReadURL() {
		if (this.CoverEdit.files && this.CoverEdit.files[0]) {
			let fileReader = new FileReader();

			fileReader.addEventListener('load', function(e) {
				document.getElementById('Banner').style.backgroundImage = 'url(' + e.target.result + ')'
			}, false);

			fileReader.readAsDataURL(this.CoverEdit.files[0]);
		}
	}

	Edit(e) {
		e.preventDefault();
		if (this.Music === undefined)		
			return _info.SetTitle('Aucun fichier n\'est sélectionné', 'red');

		let name = this.NameEdit.value;
		let author = this.AuthorEdit.value;
		if (name == '' || author == '')
			return _info.SetTitle('Merci de remplir tous les champs.', 'red');

		let picture = 'undefined';
		let publicId = 'undefined';
		if (this.CoverEdit.files.length != 0) {
			publicId = this.Music.Covers;
			picture = this.CoverEdit.files[0];
		}
				
		let form_data = new FormData(document.getElementById('FormEdit'));
		form_data.append('file_id', this.Music.MusicID);
		form_data.append('file_image', picture);
		form_data.append('public_id', publicId);
		let self = this;
		$.ajax({
			url: server + '/functions/files/editFile.php',
			type: 'POST',
			dataType: 'script',
			cache: false,
			contentType: false,
			processData: false,
			data: form_data,
			xhr: function () {
				let xhr = $.ajaxSettings.xhr();
				xhr.upload.onprogress = function(e) {
					if (e.lengthComputable) {
						self.ProgressBar.style.width = Math.round((e.loaded / e.total)*100) + '%';
						self.ProgressTxt.innerHTML = Math.round((e.loaded / e.total)*100) + ' %';
					}
				};
				return xhr;
			}
		}).done(function() {
			_library.GetFiles();
		}).fail(function() {
			return _info.SetTitle('Une erreur s\'est produite lors de l\'édition de votre fichier', 'red');
		});

		this.Hide();
	}

	Hide() {
		_background.Hide();
		this.Element.className = '';
		this.CoverEdit.value = '';
		this.Music = undefined;
	}

	Show(music) {
		this.Music = music;
		this.NameEdit.value = this.Music.Title;
		this.AuthorEdit.value = this.Music.Artist;
		this.AlbumEdit.value = this.Music.Album;
		this.Banner.style.backgroundImage = 'url(' + this.Music.Covers.x512 + ')';
		_background.Show();
		this.Element.className = 'appear';
	}
}