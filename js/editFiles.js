function showEditSection(identifier){
	var element = document.getElementById(identifier);
	document.getElementById("fileNameEdit").value = decodeHTML(element.dataset.title);
	document.getElementById("fileAuthorEdit").value = decodeHTML(element.dataset.artist);
	document.getElementById("fileAlbumEdit").value = decodeHTML(element.dataset.album);
	$("#Banner").css("background-image", "url(" + element.dataset.img + ")");
	var editButton = document.getElementById("barSpan2Edit");
	editButton.setAttribute("onclick", "uploadEditedFile("+element.dataset.id+")");
	backgroundAppear();
	var edit = document.getElementById("edit");
	edit.className = "appear";
}

function hideEditSection(){
	backgroundHide();
	var edit = document.getElementById("edit");
	edit.className = "";
}

function readURL(input) {
	if (input.files && input.files[0]) {
		var reader = new FileReader();

		reader.onload = function(e) {
			$("#Banner").css("background-image", "url(" + e.target.result + ")");
		}

		reader.readAsDataURL(input.files[0]);
	}
}

$("#pictureEdit").change(function() {
	readURL(this);
});

function uploadEditedFile(identifier){
	if (document.getElementById("pictureEdit").files.length == 0) {
		var picture = "undefined";
	}else {
		var picture = $("#pictureEdit").prop("files")[0];
	}
	var name = document.getElementById("fileNameEdit").value;
	var author = document.getElementById("fileAuthorEdit").value;
	var album = document.getElementById("fileAlbumEdit").value;
	if (name == "" || author == "") {
		document.getElementById("error-msg-edit").innerHTML = "";
		var errormsg = document.createTextNode("Merci de remplir tous les champs.");
		document.getElementById("error-msg-edit").appendChild(errormsg);
	}else{
		var form_data = new FormData($("formUpload")[0]);
		form_data.append("file_id", identifier);
		form_data.append("file_image", picture);
		form_data.append("file_name", name);
		form_data.append("file_author", author);
		form_data.append("file_album", album);
		$.ajax({
			url: "../functions/files/editFile.php",
			type: "POST",
			dataType: "script",
			cache: false,
			contentType: false,
			processData: false,
			data: form_data,
			xhr: function () {
				var xhr = $.ajaxSettings.xhr();
				xhr.upload.onprogress = function (e) {
					if (e.lengthComputable) {
						var elem = document.getElementById("myBarPlusEdit");
						var elem1 = document.getElementById("myBarMoinsEdit");
						var span = document.getElementById("editButton");
						var span1 = document.getElementById("barSpan2Edit");
						elem.style.width = Math.round((e.loaded / e.total)*100) + "%";
						span.innerHTML = Math.round((e.loaded / e.total)*100) + " %";
						elem1.style.width = Math.round(100-(e.loaded / e.total)*100) + "%";
						span1.innerHTML = Math.round((e.loaded / e.total)*100) + " %";
					}
				};
				return xhr;
			}
		}).done(function (e) {
				alert("upload succeed")
				getFiles("file_id", "DESC");
				var elem = document.getElementById("myBarPlusEdit");
				var elem1 = document.getElementById("myBarMoinsEdit");
				var span = document.getElementById("editButton");
				var span1 = document.getElementById("barSpan2Edit");
				elem.style.width = "0%";
				span.innerHTML = "0 %";
				elem1.style.width = "100%";
				span1.innerHTML = "ENVOYER";
				var filter = document.getElementById("editFile");
				filter.setAttribute("onclick", "editFiles()");
		}).fail(function (e) {
				alert("upload failed");
				var filter = document.getElementById("editFile");
				filter.setAttribute("onclick", "editFiles()");
		});
	}
}
