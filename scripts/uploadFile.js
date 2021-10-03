class UploadSection {
	constructor() {
		this.Element	= document.getElementById("Upload");
		this.Cross		= document.getElementById("CrossUpload");
		this.UploadBTN	= document.getElementById("UploadButton")
		this.ErrorMSG	= document.getElementById("ErrorMsgUpload")

		// Handle click event on CrossUpload
		this.Cross.addEventListener("click", evt => this.Toggle());

		// Handle click on UploadButton
		this.UploadBTN.addEventListener("click", evt => this.UploadFiles(evt));

	}

	// Toggle upload section
	Toggle() {
		if (this.Element.classList.contains("appear")) {
			background.Hide();
			this.Element.classList.remove("appear");
		} else {
			background.Show();
			this.Element.classList.add("appear");
		}
	}

	async UploadFiles(e) {
		e.preventDefault();
		var file = document.getElementById("File").files[0];
		var picture = document.getElementById("Picture").files[0];

		// Check if file & picture exist
		if (file && picture) {
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
				this.ErrorMSG.innerHTML = "Merci de remplir tous les champs.";
				this.ErrorMSG.style.display = "block";
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
										library.getFiles("file_id", "DESC");
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
			this.ErrorMSG.innerHTML = "Aucun fichier n'a été choisi.";
			this.ErrorMSG.style.display = "block";
			return;
		}
	}
}

const uploadSection = new UploadSection();