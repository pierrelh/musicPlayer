class EditLayouts {
	constructor() {
		this.IsActive	= false;
		this.Elements	= [];
	}

	Toggle() {
		if (this.IsActive)
			this.RemoveAll();
		else
			this.CreateAll();
	}

	CreateAll() {
		if (_addLayouts.IsActive)
			_addLayouts.RemoveAll();
		if (_deleteLayouts.IsActive)
			_deleteLayouts.RemoveAll();

		for (let index = 0; index < _library.Playlist.length; index++) {
			let editLayout = new Layout({
				class: "edit",
				event: evt => _editSection.Show(_library.Playlist[index])
			});
			this.Elements.push(editLayout);
			_library.Playlist[index].Element.prepend(editLayout);
		}
		this.IsActive = true;
	}

	RemoveAll() {
		this.Elements.forEach(element => element.remove());
		this.IsActive = false;
	}
}

class EditSection {
	constructor() {
		this.Element		= document.getElementById("Edit");
		this.Cross			= document.getElementById("CrossEdit");
		this.CoverEdit		= document.getElementById("PictureEdit")
		this.NameEdit		= document.getElementById("FileNameEdit").value;
		this.AuthorEdit		= document.getElementById("FileAuthorEdit").value;
		this.AlbumEdit		= document.getElementById("FileAlbumEdit").value;
		this.Music			= undefined;
		this.EditBTN		= document.getElementById("EditButton");
		this.ProgressBar	= document.getElementById("ProgressBarEditCover");
		this.ProgressTxt	= document.getElementById("TextProgressBarEditCover");

		this.Cross.addEventListener("click", evt => this.Hide(), false);
		this.EditBTN.addEventListener("click", evt => this.Edit(evt), false);
		this.CoverEdit.addEventListener("change", evt => this.ReadURL(), false);
	}

	ReadURL() {
		if (this.CoverEdit.files && this.CoverEdit.files[0]) {
			let fileReader = new FileReader();

			fileReader.addEventListener("load", function(e) {
				document.getElementById("Banner").style.backgroundImage = "url(" + e.target.result + ")"
			}, false);

			fileReader.readAsDataURL(this.CoverEdit.files[0]);
		}
	}

	Edit(e) {
		e.preventDefault();
		let self = this;
		if (this.Music.MusicID != "undefined") {
			let picture = "undefined";
			let publicId = "undefined";
			if (this.CoverEdit.files.length != 0) {
				publicId = this.Music.Cover;
				picture = this.CoverEdit.files[0];
			}
			let name = this.NameEdit.value;
			let author = this.AuthorEdit.value;
			if (name || author) {
				document.getElementById("ErrorMsgEdit").innerHTML = "Merci de remplir tous les champs.";
				document.getElementById("ErrorMsgEdit").style.display = "block";
			} else {
				let form_data = new FormData(document.getElementById("FormEdit"));
				form_data.append("file_id", this.Music.MusicID);
				form_data.append("file_image", picture);
				form_data.append("public_id", publicId);
				$.ajax({
					url: server + "/functions/files/editFile.php",
					type: "POST",
					dataType: "script",
					cache: false,
					contentType: false,
					processData: false,
					data: form_data,
					xhr: function () {
						let xhr = $.ajaxSettings.xhr();
						xhr.upload.onprogress = function(e) {
							if (e.lengthComputable) {
								this.ProgressBar.style.width = Math.round((e.loaded / e.total)*100) + "%";
								this.ProgressTxt.innerHTML = Math.round((e.loaded / e.total)*100) + " %";
							}
						};
						return xhr;
					}
				}).done(function() {
					_library.GetFiles();
				}).fail(function() {
					alert("Edit failed");
				});

				self.Hide();
			}
		} else {
			alert("Une erreur s'est produite.");
		}
	}

	Hide() {
		_background.Hide();
		this.Element.className = "";
		this.CoverEdit.value = "";
	}

	Show(music) {
		this.Music = music;
		this.NameEdit.value = music.Title;
		this.AuthorEdit.value = music.Artist;
		this.AlbumEdit.value = music.Album;
		document.getElementById("Banner").style.backgroundImage = "url(" + music.Cover + ")";
		_background.Show();
		this.Element.className = "appear";
	}
}

const _editLayouts = new EditLayouts();
const _editSection = new EditSection();