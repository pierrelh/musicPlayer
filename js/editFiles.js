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

// Handle click on BarSpan2Edit
document.getElementById("BarSpan2Edit").addEventListener("click", function() {
	var musicId = this.dataset.musicId;
	if (musicId != "undefined") {
		if (document.getElementById("PictureEdit").files.length == 0) {
			var picture = "undefined";
			var publicId = "undefined";
		}else {
			var publicId = document.getElementById("BarSpan2Edit").dataset.musicImg;
			publicId = publicId.split("/");
			publicId = publicId.pop();
			publicId = publicId.split(".");
			publicId.pop();
			publicId = publicId.join(".")
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
							document.getElementById("MyBarPlusEdit").style.width = Math.round((e.loaded / e.total)*100) + "%";
							document.getElementById("EditButton").innerHTML = Math.round((e.loaded / e.total)*100) + " %";
							document.getElementById("MyBarMoinsEdit").style.width = Math.round(100-(e.loaded / e.total)*100) + "%";
							document.getElementById("BarSpan2Edit").innerHTML = Math.round((e.loaded / e.total)*100) + " %";
						}
					};
					return xhr;
				}
			}).done(function() {
				getFiles("file_id", "DESC");
				backgroundHide();
				document.getElementById("Edit").className = "";
				document.getElementById("PictureEdit").value = "";
				document.getElementById("MyBarPlusEdit").style.width = "0%";
				document.getElementById("EditButton").innerHTML = "0 %";
				document.getElementById("MyBarMoinsEdit").style.width = "100%";
				document.getElementById("BarSpan2Edit").innerHTML = "ENVOYER";
			}).fail(function() {
				alert("upload failed");
			});
		}
	}else {
		alert("Une erreur s'est produite.")
	}

});