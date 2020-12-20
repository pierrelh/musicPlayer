// Function to upload a music
async function uploadMusic() {
	var file = document.getElementById("File").files[0];
	var picture = document.getElementById("Picture").files[0];

	// Check if file & picture exist
	if (file != undefined && picture != undefined) {
		var formData = new FormData(document.getElementById("FormUpload"));
		// Delete default from data values for file & picture
		formData.delete("file");
		formData.delete("picture");
		var formDataMusic = new FormData();
		formDataMusic.append("music", file);
		var formDataCover = new FormData();
		formDataCover.append("cover", picture);

		// Check if the music has a name & an author
		if (document.getElementById("FileName").value == "" || document.getElementById("FileAuthor").value == "") {
			document.getElementById("ErrorMsgUpload").innerHTML = ""
			var errormsg = document.createTextNode("Merci de remplir tous les champs.");
			document.getElementById("ErrorMsgUpload").appendChild(errormsg);
			return;
		} else {
			// Uploading the music
			await uploadFileCloudinary(formDataMusic, "ProgressBarVideo", "TextProgressBarVideo", "uploadMusic.php")
			.then( async (response) => {
				if (response != "false") {

					formData.append("file_url", response);
					
					// Uploading the cover
					await uploadFileCloudinary(formDataCover, "ProgressBarPicture", "TextProgessBarPicture", "uploadCover.php")
					.then( async (response) => {
						if (response != "false") {

							formData.append("file_image", response);

							// Sending the new music's informations to the db
							$.ajax({
								url: server + "/functions/files/uploadFile.php",
								type: "POST",
								dataType: "script",
								cache: false,
								contentType: false,
								processData: false,
								data: formData,
								success: function () {
									getFiles("file_id", "DESC");
								}
							});

						}else {
							alert("Une erreur s'est produite lors de l'envoi de la cover");
							return;
						}
					});
					
				}else {
					alert("Une erreur s'est produite lors de l'envoi de la musique");
					return;
				}
			});
		}
	} else {
		document.getElementById("ErrorMsgUpload").innerHTML = "";
		var errormsg = document.createTextNode("Aucun fichier n'a été choisi.");
		document.getElementById("ErrorMsgUpload").appendChild(errormsg);
		return;
	}
}

// Handle click event on CrossUpload
document.getElementById("CrossUpload").addEventListener("click", function () {
	backgroundHide();
	var Upload = document.getElementById("Upload");
	Upload.className = "";
});

// Handle click on UploadButton
document.getElementById("UploadButton").addEventListener("click", uploadMusic, false);