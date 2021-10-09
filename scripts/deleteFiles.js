class DeleteLayouts {
	constructor() {
		this.IsActive	= false;
		this.Elements	= [];
	}

	// Toggle the visibility of the Delete's layouts
	ToggleVisibility() {
		if (this.IsActive)
			this.RemoveAll();
		else
			this.CreateAll();
	}

	// Create all the delete's layouts
	CreateAll() {
		if (addLayouts.IsActive)
			addLayouts.RemoveAll();
		if (editLayouts.IsActive)
			editLayouts.RemoveAll();

		for (let index = 0; index < library.MusicsPlaylist.length; index++) {
			let deleteLayout = new Layout({
				class: "delete",
				event: evt => deleteSection.Show(library.MusicsPlaylist[index])
			});
			this.Elements.push(deleteLayout);
			library.MusicsPlaylist[index].Element.prepend(deleteLayout);
		}
		this.IsActive = true;
	}

	// Remove all the delete's layouts
	RemoveAll() {
		this.Elements.forEach(element => element.remove());
		this.IsActive = false;
	}
}

const deleteLayouts = new DeleteLayouts();

class DeleteSection {
	constructor() {
		this.Element	= document.getElementById("Delete");
		this.Title		= document.getElementById("DeleteTitle")
		this.Yes		= document.getElementById("DeleteYes");
		this.No			= document.getElementById("DeleteNo");
		this.Music		= undefined;

		// Handle click on No button of Delete section
		this.No.addEventListener("click", evt => this.Hide(), false);

		// Handle click on Yes button of Delete section
		this.Yes.addEventListener("click", evt => this.DeleteMusic(), false);
	}

	DeleteMusic() {
		// Getting the id of the music to be deleted
		if (this.Music.MusicID != "undefined") { // Checking if the id exist
			$.ajax({
				url: server + "/functions/files/deleteFile.php",
				type: "POST",
				data: {
					"file_id":		this.Music.MusicID,
					"file_url":		this.Music.URL,
					"file_cover":	this.Music.Cover
				},
				success: function(data) {
					if (data == 1) {
						// Closing Delete section
						deleteSection.Hide();
						// Deleting the deleted music from the Library
						deleteSection.Music.Element.remove();
					} else {
						alert("Une erreur inatendue s'est produite, merci de réessayer plus tard.");
					}
				}
			});

		} else {
			alert("Une erreur s'est produite.");
		}
	}

	Hide() {
		background.Hide();
		this.Element.className = "";
	}

	Show(music) {
		this.Music = music
		this.Title.innerHTML = "Voulez-vous vraiment supprimer: " + music.Title + " de " + music.Artist + " ?";
		background.Show();
		this.Element.className = "appear";
	}
}

const deleteSection = new DeleteSection();