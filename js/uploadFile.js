function uploadAppear(){
  backgroundAppear();
  var upload = document.getElementById('upload');
  upload.className = 'appear';
}

function uploadHide(){
  backgroundHide();
  var upload = document.getElementById('upload');
  upload.className = '';
}

document.getElementById("barSpan2").addEventListener("click", function(){
  var file = document.getElementById('file').files[0];
  var picture = document.getElementById('picture').files[0];
  if (file != undefined && picture != undefined) {
    var formData = new FormData(document.getElementById('formUpload'));
    formData.delete('file');
    formData.delete('picture');
    if (document.getElementById('fileName').value == "" || document.getElementById('fileAuthor').value == "") {
      document.getElementById('error-msg').innerHTML = ""
      var errormsg = document.createTextNode("Merci de remplir tous les champs.");
      document.getElementById("error-msg").appendChild(errormsg);
      return;
    }
    var url = `https://api.cloudinary.com/v1_1/htko7uqqo/upload`;
    var xhr = new XMLHttpRequest();
    var audioFile = new FormData();
    var pictureFile = new FormData();
    audioFilexhr.open('POST', url, true);
    audioFilexhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
    pictureFilexhr.open('POST', url, true);
    pictureFilexhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');

    // Update progress
    audioFilexhr.upload.addEventListener("progress", function(e) {
      var percent = Math.round((data.loaded * 100.0) / data.total);
      $('.progress-bar-file').css('width', percent + '%');
      $('.progress-file .text-file').text(percent + '%');
    });

    // Update progress
    pictureFilexhr.upload.addEventListener("progress", function(e) {
      var percent = Math.round((data.loaded * 100.0) / data.total);
      $('.progress-bar-picture').css('width', percent + '%');
      $('.progress-picture .text-picture').text(percent + '%');
    });

    function uploadFile() {
      var server = "https://" + window.location.hostname;
      $.ajax({
        url: server + "/functions/files/uploadFile.php",
        type: "POST",
        dataType: 'script',
        cache: false,
        contentType: false,
        processData: false,
        data: formData,
        success: function(data){
          console.log("success")
        }
      });
    }

    audioFile.append('upload_preset', 'unsigned_video');
    audioFile.append('tags', 'browser_upload'); // Optional - add tag for image admin in Cloudinary
    audioFile.append('file', file);
    audioFilexhr.send(audioFile);
    audioFilexhr.onreadystatechange = function(e) {
      if (audioFilexhr.readyState == 4 && audioFilexhr.status == 200) {
        var response = JSON.parse(audioFilexhr.responseText);
        formData.set('file_url', response.secure_url)

        pictureFile.append('upload_preset', 'unsigned_image');
        pictureFile.append('tags', 'browser_upload'); // Optional - add tag for image admin in Cloudinary
        pictureFile.append('picture', picture);
        pictureFilexhr.send(pictureFile);
        pictureFilexhr.onreadystatechange = function(e) {
          if (pictureFilexhr.readyState == 4 && pictureFilexhr.status == 200) {
            var response = JSON.parse(pictureFilexhr.responseText);
            formData.set('file_image', response.public_id)
            uploadFile();
          }else {
            console.log("Failed to upload picture");
            return;
          }
        };

      }else {
        console.log("Failed to upload video.")
        return;
      }
    };
  }else {
    document.getElementById('error-msg').innerHTML = "";
    var errormsg = document.createTextNode("Aucun fichier n'a été choisi.");
    document.getElementById("error-msg").appendChild(errormsg);
  }
});
//
//
// function uploadFile(){
//   var file = document.getElementById("file").dataset.name;
//   var picture = document.getElementById("picture").dataset.name;
//   var name = document.getElementById('fileName').value;
//   var author = document.getElementById('fileAuthor').value;
//   var album = document.getElementById('fileAlbum').value;
//   if (file == "" || file == undefined) {
//     if (document.getElementById('error-msg').innerHTML == "") {
//       var errormsg = document.createTextNode("Aucun fichier n'a été choisi.");
//       document.getElementById("error-msg").appendChild(errormsg);
//     }
//   }else if (file == "uploading" || picture == "uploading") {
//     document.getElementById('error-msg').innerHTML = ""
//     var errormsg = document.createTextNode("Veuillez attendre que les fichiers aient fini d'être uploadé.");
//     document.getElementById("error-msg").appendChild(errormsg);
//   }else if (name == '' || author == '') {
//     document.getElementById('error-msg').innerHTML = ""
//     var errormsg = document.createTextNode("Merci de remplir tous les champs.");
//     document.getElementById("error-msg").appendChild(errormsg);
//   }else{
//     var form_data = new FormData($('formUpload')[0]);
//     form_data.append('file', file);
//     form_data.append('picture', picture);
//     form_data.append('name', name);
//     form_data.append('author', author);
//     form_data.append('album', album);
//     $.ajax({
//       url: "../functions/files/uploadFile.php",
//       type: "POST",
//       dataType: 'script',
//       cache: false,
//       contentType: false,
//       processData: false,
//       data: form_data,
//       xhr: function () {
//         var xhr = $.ajaxSettings.xhr();
//         xhr.upload.onprogress = function (e) {
//           if (e.lengthComputable) {
//             var elem = document.getElementById("myBarPlus");
//             var elem1 = document.getElementById("myBarMoins");
//             var span = document.getElementById("sendButton");
//             var span1 = document.getElementById("barSpan2");
//             elem.style.width = Math.round((e.loaded / e.total)*100) + "%";
//             span.innerHTML = Math.round((e.loaded / e.total)*100) + " %";
//             elem1.style.width = Math.round(100-(e.loaded / e.total)*100) + "%";
//             span1.innerHTML = Math.round((e.loaded / e.total)*100) + " %";
//           }
//         };
//         return xhr;
//       }
//     }).done(function (e) {
//         alert("upload succeed")
//         getFiles('file_id', 'DESC');
//         var library = document.getElementById('LibraryObjects');
//         var elem = document.getElementById("myBarPlus");
//         var elem1 = document.getElementById("myBarMoins");
//         var span = document.getElementById("sendButton");
//         var span1 = document.getElementById("barSpan2");
//         elem.style.width = "0%";
//         span.innerHTML = "0 %";
//         elem1.style.width = "100%";
//         span1.innerHTML = "ENVOYER";
//     }).fail(function (e) {
//         alert("upload failed");
//     });
//   }
// }
