document.getElementById("barSpan2").addEventListener("click", function(){
  function uploadFile() {
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
      xhr.open('POST', url, true);
      xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');

      // Update progress
      xhr.upload.addEventListener("progress", function(e) {
        console.log(e);
        console.log(this);
        console.log(Math.round((e.loaded * 100.0) / e.total))
        // var progress = Math.round((e.loaded * 100.0) / e.total);
        // document.getElementById('progressBar').style.width = progress + "%";
        // document.getElementById('progressBarText').innerHTML = progress + "%";
      });

      xhr.onreadystatechange = function(e) {
        if (xhr.readyState == 4 && xhr.status == 200) { // Upload Success
          var response = JSON.parse(xhr.responseText);
          // document.getElementById('progressBarText').innerHTML = "Envoyé !";


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
        }else { // Upload failed
          document.getElementById('error-msg').innerHTML = "";
          var errormsg = document.createTextNode("Une erreur inattendue s'est produite, veuillez réessayer plus tard.");
          document.getElementById("error-msg").appendChild(errormsg);
        }
      };

      audioFile.append('upload_preset', 'unsigned_video');
      audioFile.append('tags', 'browser_upload'); // Optional - add tag for image admin in Cloudinary
      audioFile.append('file', file);
      xhr.send(audioFile);
      if (xhr.readyState == 4 && xhr.status == 200) {
        var response = JSON.parse(xhr.responseText);
        formData.set('file_url', response.secure_url)

        pictureFile.append('upload_preset', 'unsigned_image');
        pictureFile.append('tags', 'browser_upload'); // Optional - add tag for image admin in Cloudinary
        pictureFile.append('file', picture);
        xhr.send(pictureFile);
        if (xhr.readyState == 4 && xhr.status == 200) {
          var response = JSON.parse(xhr.responseText);
          formData.set('file_image', response.public_id)

        }else {
          console.log("Failed to upload picture");
          return;
        }
      }else {
        console.log("Failed to upload video.")
        return;
      }
    }else {
      document.getElementById('error-msg').innerHTML = "";
      var errormsg = document.createTextNode("Aucun fichier n'a été choisi.");
      document.getElementById("error-msg").appendChild(errormsg);
    }
  }
});
