function showEditSection(musicId){
	var Music = document.getElementById("Music" + musicId);
	document.getElementById("FileNameEdit").value = decodeHTML(Music.dataset.title);
	document.getElementById("FileAuthorEdit").value = decodeHTML(Music.dataset.artist);
	document.getElementById("FileAlbumEdit").value = decodeHTML(Music.dataset.album);
	document.getElementById("Banner").style.backgroundImage = "url(" + Music.dataset.img + ")";
	document.getElementById("BarSpan2Edit").dataset.musicId = Music.dataset.id;
	document.getElementById("BarSpan2Edit").dataset.musicImg = Music.dataset.img;
	backgroundAppear();
	var Edit = document.getElementById("Edit");
	Edit.className = "appear";
}

// Handle click on CrossEdit
document.getElementById("CrossEdit").addEventListener("click", function() {
	backgroundHide();
	document.getElementById("Edit").className = "";
	document.getElementById("PictureEdit").value = "";
});

// Handle change on PictureEdit
document.getElementById("PictureEdit").addEventListener("change", function() {
	readURL(this, "Banner");
});

// Handle click on EditButton
document.getElementById("EditButton").addEventListener("click", function() {
	var musicId = this.dataset.musicId;
	if (musicId != "undefined") {
		if (document.getElementById("PictureEdit").files.length == 0) {
			var picture = "undefined";
			var publicId = "undefined";
		}else {
			// Formating the publicId of the music's cover to overwrite it
			var publicId = document.getElementById("BarSpan2Edit").dataset.musicImg;
			publicId = getPublicIdFromUrl(publicId)
			var picture = document.getElementById("PictureEdit").files[0];
		}
		var name = document.getElementById("FileNameEdit").value;
		var author = document.getElementById("FileAuthorEdit").value;
		if (name == "" || author == "") {
			document.getElementById("ErrorMsgEdit").innerHTML = "";
			var errormsg = document.createTextNode("Merci de remplir tous les champs.");
			document.getElementById("ErrorMsgEdit").appendChild(errormsg);
		}else{
			var form_data = new FormData(document.getElementById("FormEdit"));
			form_data.append("file_id", musicId);
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
				getFiles("file_id", "DESC");
			}).fail(function() {
				alert("Edit failed");
			});

			backgroundHide();
			document.getElementById("Edit").className = "";
			document.getElementById("PictureEdit").value = "";
		}
	}else {
		alert("Une erreur s'est produite.")
	}

});