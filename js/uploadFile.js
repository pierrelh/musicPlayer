document.getElementById("CrossUpload").addEventListener("click", function () {
	backgroundHide();
	var Upload = document.getElementById("Upload");
	Upload.className = "";
});

async function uploadMusic() {
	var file = document.getElementById("File").files[0];
	var picture = document.getElementById("Picture").files[0];
	if (file != undefined && picture != undefined) {
		var formData = new FormData(document.getElementById("FormUpload"));
		formData.delete("file");
		formData.delete("picture");
		if (document.getElementById("FileName").value == "" || document.getElementById("FileAuthor").value == "") {
			document.getElementById("ErrorMsgUpload").innerHTML = ""
			var errormsg = document.createTextNode("Merci de remplir tous les champs.");
			document.getElementById("ErrorMsgUpload").appendChild(errormsg);
			return;
		}

		await uploadFileCloudinary(file, "unsigned_video", "ProgressBarVideo", "TextProgressBarVideo").then( async (audioFileXhr) => {
			var response = JSON.parse(audioFileXhr.responseText);
			formData.set("file_url", response.secure_url)
			document.getElementById("TextProgressBarVideo").innerHTML = "Envoyé";

			await uploadFileCloudinary(picture, "unsigned_image", "ProgressBarPicture", "TextProgessBarPicture").then((pictureFileXhr) => {
				var response = JSON.parse(pictureFileXhr.responseText);
				formData.set("file_image", response.secure_url)
				document.getElementById("TextProgessBarPicture").innerHTML = "Envoyé";
				
				$.ajax({
					url: server + "/functions/files/uploadFile.php",
					type: "POST",
					dataType: "script",
					cache: false,
					contentType: false,
					processData: false,
					data: formData,
					success: function () {
						alert("upload succeed")
						getFiles("file_id", "DESC");
					}
				});
			})
		})

	} else {
		document.getElementById("ErrorMsgUpload").innerHTML = "";
		var errormsg = document.createTextNode("Aucun fichier n'a été choisi.");
		document.getElementById("ErrorMsgUpload").appendChild(errormsg);
	}
}

document.getElementById("BarSpan2").addEventListener("click", uploadMusic, false);