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

function mediaPlayerAppear(link, cover){
  var mediaPlayer = document.getElementById('mediaPlayer');
  mediaPlayer.className = 'background-appear';
  document.getElementById('musicPlayer').src = link;
  document.getElementById('cover').src = cover;
}

function mediaPlayerHide(){
  var mediaPlayer = document.getElementById('mediaPlayer');
  mediaPlayer.className = '';
}

function uploadFile(){
  var file = $("#file").prop("files")[0];
  var picture = $("#picture").prop("files")[0];
  var name = document.getElementById('fileName').value;
  var author = document.getElementById('fileAuthor').value;
  var album = document.getElementById('fileAlbum').value;
  if (document.getElementById("file").files.length == 0) {
    if (document.getElementById('error-msg').innerHTML == "") {
      var errormsg = document.createTextNode("Aucun fichier n'a été choisi.");
      document.getElementById("error-msg").appendChild(errormsg);
    }
  }else if (name == '' || author == '') {
    document.getElementById('error-msg').innerHTML = ""
    var errormsg = document.createTextNode("Merci de remplir tous les champs.");
    document.getElementById("error-msg").appendChild(errormsg);
  }else{
    var form_data = new FormData($('formUpload')[0]);
    form_data.append('file', file);
    form_data.append('picture', picture);
    form_data.append('name', name);
    form_data.append('author', author);
    form_data.append('album', album);
    $.ajax({
      url: "../functions/files/uploadFile.php",
      type: "POST",
      dataType: 'script',
      cache: false,
      contentType: false,
      processData: false,
      data: form_data,
      xhr: function () {
        var xhr = $.ajaxSettings.xhr();
        xhr.upload.onprogress = function (e) {
          if (e.lengthComputable) {
            var elem = document.getElementById("myBarPlus");
            var elem1 = document.getElementById("myBarMoins");
            var span = document.getElementById("sendButton");
            var span1 = document.getElementById("barSpan2");
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
        var elem = document.getElementById("myBarPlus");
        var elem1 = document.getElementById("myBarMoins");
        var span = document.getElementById("sendButton");
        var span1 = document.getElementById("barSpan2");
        elem.style.width = "0%";
        span.innerHTML = "0 %";
        elem1.style.width = "100%";
        span1.innerHTML = "ENVOYER";
    }).fail(function (e) {
        alert("upload failed");
    });
  }
}

function backgroundAppear(){
  var background = document.getElementById('background');
  background.className = 'background-appear';
}

function backgroundHide(){
  var background = document.getElementById('background');
  background.className = '';
}
