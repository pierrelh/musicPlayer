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

function mediaPlayerAppear(link, cover, artist, name){
  var mediaPlayer = document.getElementById('mediaPlayer');
  var musicPlayer = document.getElementById('musicPlayer');
  var readerPlayer = document.getElementById('readerPlayer');
  var nameTxt = document.getElementById('songName');
  nameTxt.innerHTML = artist + " - " + name;
  mediaPlayer.className = 'background-appear';
  musicPlayer.src = link;
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

var audio_player = $("#audio-player");
var start = $("#start");
var play_button = $('#play');
var progress_bar = $("#progressbar");
var time = $("#time");
var mute_button = $('#mute');
var volume_bar = $('#volume');
var player = document.getElementById('musicPlayer');
var duration = 0;
var volume = 0.75;

player.onloadedmetadata = function() {
  duration = player.duration;
  progress_bar.progressbar("option", {
    'max': duration
  });
  time.text(getTime(player.duration));
};

player.load();
player.volume = 0.75;
player.addEventListener("timeupdate", function() {
  progress_bar.progressbar('value', player.currentTime);
  start.text(getTime(player.currentTime));
}, false);

function getTime(t) {
  var m = ~~(t / 60),
    s = ~~(t % 60);
  return (m < 10 ? "0" + m : m) + ':' + (s < 10 ? "0" + s : s);
}

function getProgressBarClickInfo(progress_bar, e) {
  var offset = progress_bar.position();
  var x = e.pageX - offset.left;
  var y = e.pageY - offset.top;
  var max = progress_bar.progressbar("option", "max");
  var value = x * max / progress_bar.width();

  return {
    x: x,
    y: y,
    max: max,
    value: value
  };
}

volume_bar.progressbar({
  value: player.volume * 100,
});

volume_bar.click(function(e) {
    var info = getProgressBarClickInfo($(this), e);
    volume_bar.progressbar('value', info.value);
    player.volume = info.value / info.max;
    $('#mute').toggleClass("fa-volume-up", player.volume != 0);
});

progress_bar.progressbar({
  value: player.currentTime,
});

progress_bar.click(function(e) {
  var info = getProgressBarClickInfo($(this), e);
  player.currentTime = player.duration / info.max * info.value;
});

play_button.click(function() {
  player[player.paused ? 'play' : 'pause']();
  $(this).toggleClass("fa-play", !player.paused);
  $(this).toggleClass("fa-pause", player.paused);
});

mute_button.click(function() {
  if (player.volume == 0) {
    player.volume = volume;
  } else {
    volume = player.volume;
    player.volume = 0;
  }

  volume_bar.progressbar('value', player.volume * 100);

  $(this).toggleClass("fa-volume-up", player.volume != 0);
  $(this).toggleClass("fa-volume-off", player.volume == 0);
});
