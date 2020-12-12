function showDeleteSection(musicId){
	backgroundAppear();
	var Delete = document.getElementById("Delete");
	Delete.className = "appear";
	var Music = document.getElementById("Music" + musicId);
	document.getElementById("DeleteTitle").innerHTML = "Voulez-vous vraiment supprimer: " + Music.dataset.title + " de " + Music.dataset.artist + " ?";
	document.getElementById("DeleteYes").dataset.musicId = Music.dataset.id;
	document.getElementById("DeleteYes").dataset.listId = musicId;
}

// Handle click on Yes button of Delete section
document.getElementById("DeleteYes").addEventListener("click", function() {
	// Getting the id of the music to be deleted
	var musicId = this.dataset.musicId;
	var listId = this.dataset.listId;
	if (musicId != "undefined" && listId != "undefined") { // Checking if the id exist
		
		$.ajax({
			url: server + "/functions/files/deleteFile.php",
			type: "POST",
			data: {"file_id": musicId},
			success: function(data){
				if (data == 1) {
					// Closing Delete section
					backgroundHide();
					var Delete = document.getElementById("Delete");
					Delete.className = "";
					// Deleting the deleted music from the Library
					document.getElementById("MusicList" + listId).remove();
				}else {
					alert("Une erreur inatendue s'est produite, merci de réessayer plus tard.")
				}
			}
		});

	}else {
		alert("Une erreur s'est produite.");
	}
});

// Handle click on No button of Delete section
document.getElementById("DeleteNo").addEventListener("click", function() {
	backgroundHide();
	var Delete = document.getElementById("Delete");
	Delete.className = "";
});