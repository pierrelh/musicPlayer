function showDeleteSection(musicId){
	backgroundAppear();
	var Delete = document.getElementById("Delete");
	Delete.className = "appear";
	var Music = document.getElementById(musicId);
	document.getElementById("DeleteTitle").innerHTML = "Voulez-vous vraiment supprimer: " + Music.dataset.title + " de " + Music.dataset.artist + " ?";
	document.getElementById("DeleteYes").dataset.musicId = musicId;
}

// Handle click on Yes button of Delete section
document.getElementById("DeleteYes").addEventListener("click", function() {
	// Getting the id of the music to be deleted
	var musicId = this.dataset.musicId;
	if (musicId != undefined) { // Checking if the id exist
		
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
					var library = document.querySelector("#LibraryObjects");
					var li = library.querySelectorAll("li[data-id='"+musicId+"']")[0];
					var ul = document.getElementById("ul" + li.id);
					ul.remove();
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