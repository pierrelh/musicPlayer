class EditLayouts {
	constructor() {
		this.IsActive	= false;
		this.Elements	= [];
	}

	ToggleVisibility() {
		if (this.IsActive) {
			this.RemoveAll();
		} else {
			this.CreateAll();
		}
	}

	CreateAll() {
		for (let index = 0; index < library.MusicsPlaylist.length; index++) {
			let editLayout = new Layout({
				class: "edit",
				event: editSection.Show(library.MusicsPlaylist[index])
			});
			this.Elements.push(editLayout);
			library.MusicsPlaylist[index].Element.prepend(editLayout);
		}
		this.IsActive = true;
	}

	RemoveAll() {
		this.Elements.forEach(element => element.remove());
		this.IsActive = false;
	}
}

const editLayouts = new EditLayouts();

class EditSection {
	constructor() {
		this.Element	= document.getElementById("Edit");
		this.Cross		= document.getElementById("CrossEdit");
		this.CoverEdit	= document.getElementById("PictureEdit")
		this.Music		= undefined;
		this.EditBTN	= document.getElementById("EditButton");

		// Handle click on CrossEdit
		this.Cross.addEventListener("click", evt => this.Hide());

		this.EditBTN.addEventListener("click", evt => this.Edit(evt));

		// Handle change on PictureEdit
		this.CoverEdit.addEventListener("change", evt => this.ReadURL());
	}

	// Dynamically read & print a new input's image
	ReadURL() {
		if (this.CoverEdit.files && this.CoverEdit.files[0]) {
			var fileReader = new FileReader();

			fileReader.addEventListener("load", function(e) {
				document.getElementById("Banner").style.backgroundImage = "url(" + e.target.result + ")"
			});

			fileReader.readAsDataURL(this.CoverEdit.files[0]);
		}
	}

	// Handle click on EditButton
	Edit(e) {
		e.preventDefault();
		if (this.Music.MusicID != "undefined") {
			if (this.CoverEdit.files.length == 0) {
				var picture = "undefined";
				var publicId = "undefined";
			} else {
				// Formating the publicId of the music's cover to overwrite it
				var publicId = this.Music.Cover;
				var picture = this.CoverEdit.files[0];
			}
			var name = document.getElementById("FileNameEdit").value;
			var author = document.getElementById("FileAuthorEdit").value;
			if (name == "" || author == "") {
				document.getElementById("ErrorMsgEdit").innerHTML = "Merci de remplir tous les champs.";
				document.getElementById("ErrorMsgEdit").style.display = "block";
			} else {
				var form_data = new FormData(document.getElementById("FormEdit"));
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
						var xhr = $.ajaxSettings.xhr();
						xhr.upload.onprogress = function(e) {
							if (e.lengthComputable) {
								document.getElementById("ProgressBarEditCover").style.width = Math.round((e.loaded / e.total)*100) + "%";
								document.getElementById("TextProgressBarEditCover").innerHTML = Math.round((e.loaded / e.total)*100) + " %";
							}
						};
						return xhr;
					}
				}).done(function() {
					library.GetFiles();
				}).fail(function() {
					alert("Edit failed");
				});

				background.Hide();
				this.Element.className = "";
				this.CoverEdit.value = "";
			}
		} else {
			alert("Une erreur s'est produite.");
		}

	}

	Hide() {
		background.Hide();
		this.Element.className = "";
		this.CoverEdit.value = "";
	}

	Show(music) {
		this.Music = music;
		document.getElementById("FileNameEdit").value = music.Title;
		document.getElementById("FileAuthorEdit").value = music.Artist;
		document.getElementById("FileAlbumEdit").value = music.Album;
		document.getElementById("Banner").style.backgroundImage = "url(" + music.Cover + ")";
		background.Show();
		this.Element.className = "appear";
	}
}

const editSection = new EditSection();