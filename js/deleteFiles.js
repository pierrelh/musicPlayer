function showDeleteSection(identifier){
	backgroundAppear();
	var del = document.getElementById("delete");
	del.className = "appear";
	var element = document.getElementById(identifier);
	document.getElementById("deleteTitle").innerHTML = "Voulez-vous vraiment supprimer: " + element.dataset.title + " de " + element.dataset.artist + " ?";
	document.getElementById("deleteYes").onclick = function () {
		deleteFileConfirm(element.dataset.id);
	};
}

function deleteFileConfirm(identifier){
	$.ajax({
		url: "../functions/files/deleteFile.php",
		type: "POST",
		data: {"file_id": identifier},
		success: function(data){
			if (data == 1) {
				backgroundHide();
				var del = document.getElementById("delete");
				del.className = "";
				var library = document.querySelector("#Library");
				var li = library.querySelectorAll("li[data-id='"+identifier+"']")[0];
				var ul = document.getElementById("ul" + li.id);
				ul.remove();
			}else {
				alert("Une erreur inatendue s'est produite, merci de réeassyer plus tard.")
			}
		}
	});
}

function hideDeleteSection(){
	backgroundHide();
	var del = document.getElementById("delete");
	del.className = "";
}
