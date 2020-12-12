document.getElementById("CrossUpload").addEventListener("click", function () {
	backgroundHide();
	var Upload = document.getElementById("Upload");
	Upload.className = "";
});

document.getElementById("BarSpan2").addEventListener("click", function () {
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
		var url = "https://api.cloudinary.com/v1_1/htko7uqqo/upload";
		var audioFile = new FormData();
		var audioFileXhr = new XMLHttpRequest();
		audioFileXhr.open("POST", url, true);
		audioFileXhr.setRequestHeader("X-Requested-With", "XMLHttpRequest");

		var pictureFile = new FormData();
		var pictureFileXhr = new XMLHttpRequest();
		pictureFileXhr.open("POST", url, true);
		pictureFileXhr.setRequestHeader("X-Requested-With", "XMLHttpRequest");

		// Update progress for audio file
		audioFileXhr.upload.addEventListener("progress", function (e) {
			var progress = Math.round((e.loaded * 100.0) / e.total);
			document.getElementById("ProgressBarVideo").style.width = progress + "%";
			document.getElementById("TextProgressBarVideo").innerHTML = progress + "%";
		});

		// Update progress for picture file
		pictureFileXhr.upload.addEventListener("progress", function (e) {
			var progress = Math.round((e.loaded * 100.0) / e.total);
			document.getElementById("progressBarPicture").style.width = progress + "%";
			document.getElementById("TextProgessBarPicture").innerHTML = progress + "%";
		});

		function uploadFile() {
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
		}

		audioFile.append("upload_preset", "unsigned_video");
		audioFile.append("tags", "browser_upload"); // Optional - add tag for image admin in Cloudinary
		audioFile.append("file", file);
		audioFileXhr.send(audioFile);
		audioFileXhr.onreadystatechange = function (e) {
			if (audioFileXhr.readyState == 4 && audioFileXhr.status == 200) {
				var response = JSON.parse(audioFileXhr.responseText);
				formData.set("file_url", response.secure_url)
				document.getElementById("TextProgressBarVideo").innerHTML = "Envoyé";
				pictureFile.append("upload_preset", "unsigned_image");
				pictureFile.append("tags", "browser_upload"); // Optional - add tag for image admin in Cloudinary
				pictureFile.append("file", picture);
				pictureFileXhr.send(pictureFile);
				pictureFileXhr.onreadystatechange = function (e) {
					if (pictureFileXhr.readyState == 4 && pictureFileXhr.status == 200) {
						var response = JSON.parse(pictureFileXhr.responseText);
						formData.set("file_image", response.secure_url)
						document.getElementById("TextProgessBarPicture").innerHTML = "Envoyé";
						uploadFile();
					}
				};
			}
		};
	} else {
		document.getElementById("ErrorMsgUpload").innerHTML = "";
		var errormsg = document.createTextNode("Aucun fichier n'a été choisi.");
		document.getElementById("ErrorMsgUpload").appendChild(errormsg);
	}
});
