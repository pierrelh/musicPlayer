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
			await uploadMusic(formDataMusic, "ProgressBarVideo", "TextProgressBarVideo").then( response => {
				console.log(response)
				if (response) {

					// await uploadCover(formDataCover, "ProgressBarPicture", "TextProgessBarPicture").then( async (response) => {
					// 	if (response) {
					// 		alert("Upload Done")
					// 	}else {
					// 		alert("Une erreur s'est produite lors de l'envoi de la cover");
					// 		return;
					// 	}
					// });
					
				}else {
					alert("Une erreur s'est produite lors de l'envoi de la musique");
				}
			});
		}
	} else {
		document.getElementById("ErrorMsgUpload").innerHTML = "";
		var errormsg = document.createTextNode("Aucun fichier n'a été choisi.");
		document.getElementById("ErrorMsgUpload").appendChild(errormsg);
	}
}
// async function uploadMusic() {
// 	var file = document.getElementById("File").files[0];
// 	var picture = document.getElementById("Picture").files[0];

// 	// Check if file & picture exist
// 	if (file != undefined && picture != undefined) {
// 		var formData = new FormData(document.getElementById("FormUpload"));
// 		// Delete default from data values for file & picture
// 		formData.delete("file");
// 		formData.delete("picture");

// 		// Check if the music has a name & an author
// 		if (document.getElementById("FileName").value == "" || document.getElementById("FileAuthor").value == "") {
// 			document.getElementById("ErrorMsgUpload").innerHTML = ""
// 			var errormsg = document.createTextNode("Merci de remplir tous les champs.");
// 			document.getElementById("ErrorMsgUpload").appendChild(errormsg);
// 			return;
// 		}

// 		// Uploadind the music to cloudinary
// 		await uploadFileCloudinary(file, "unsigned_video", "ProgressBarVideo", "TextProgressBarVideo").then( async (audioFileXhr) => {
// 			var response = JSON.parse(audioFileXhr.responseText);
// 			formData.set("file_url", response.secure_url)
// 			document.getElementById("TextProgressBarVideo").innerHTML = "Envoyé";

// 			// Uploading the cover to cloudinary
// 			await uploadFileCloudinary(picture, "unsigned_image", "ProgressBarPicture", "TextProgessBarPicture").then((pictureFileXhr) => {
// 				var response = JSON.parse(pictureFileXhr.responseText);
// 				formData.set("file_image", response.secure_url)
// 				document.getElementById("TextProgessBarPicture").innerHTML = "Envoyé";
				
// 				// Sending the datas to the db
// 				$.ajax({
// 					url: server + "/functions/files/uploadFile.php",
// 					type: "POST",
// 					dataType: "script",
// 					cache: false,
// 					contentType: false,
// 					processData: false,
// 					data: formData,
// 					success: function () {
// 						getFiles("file_id", "DESC");
// 					}
// 				});
// 			})
// 		})

// 	} else {
// 		document.getElementById("ErrorMsgUpload").innerHTML = "";
// 		var errormsg = document.createTextNode("Aucun fichier n'a été choisi.");
// 		document.getElementById("ErrorMsgUpload").appendChild(errormsg);
// 	}
// }

// Handle click event on CrossUpload
document.getElementById("CrossUpload").addEventListener("click", function () {
	backgroundHide();
	var Upload = document.getElementById("Upload");
	Upload.className = "";
});

// Handle click on BarSpan2
document.getElementById("BarSpan2").addEventListener("click", uploadMusic, false);