class DeleteSection {
	constructor() {
		this.Element = document.getElementById("Delete");
		this.Title = document.getElementById("DeleteTitle")
		this.Yes = document.getElementById("DeleteYes");
		this.No = document.getElementById("DeleteNo");
		this.Music = undefined;

		// Handle click on No button of Delete section
		this.No.addEventListener("click", evt => this.Hide());

		// Handle click on Yes button of Delete section
		this.Yes.addEventListener("click", evt => this.DeleteMusic());
	}

	DeleteMusic() {
		// Getting the id of the music to be deleted
		if (this.Music.MusicID != "undefined") { // Checking if the id exist
			$.ajax({
				url: server + "/functions/files/deleteFile.php",
				type: "POST",
				data: {
					"file_id": this.Music.MusicID,
					"file_url": this.Music.URL,
					"file_cover": this.Music.Cover
				},
				success: function(data, this){
					if (data == 1) {
						// Closing Delete section
						background.Hide();
						this.Element.className = "";
						// Deleting the deleted music from the Library
						document.getElementById("MusicList" + this.Music.ID).remove();
					}else {
						alert("Une erreur inatendue s'est produite, merci de réessayer plus tard.")
					}
				}
			});
	
		}else {
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

var deleteSection = new DeleteSection()