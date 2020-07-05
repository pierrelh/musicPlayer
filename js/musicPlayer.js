$(document).ready(function () {
  var audio_player = $("#audio-player");
  var start = $("#start");
  var play_button = $('#play');
  var time = $("#time");
  var mute_button = $('#mute');
  var progressBar = document.getElementById('progress-bar');
  var player = document.getElementById('musicPlayer');
  var volumeSlider = document.getElementById('Volume');
  var duration = 0;
  var volume = 0.75;

  player.onloadedmetadata = function() {
    duration = player.duration;
    progressBar.max = duration;
    time.text(getTime(player.duration));
  };

  player.load();
  player.volume = 0.75;

  player.addEventListener("pause", function() {
    $(play_button).toggleClass("fa-play", !player.paused);
    $(play_button).toggleClass("fa-pause", player.paused);
  }, false);

  player.addEventListener("play", function() {
    $(play_button).toggleClass("fa-play", !player.paused);
    $(play_button).toggleClass("fa-pause", player.paused);
  }, false);

  player.addEventListener("playing", function() {
    $(play_button).toggleClass("fa-play", !player.paused);
    $(play_button).toggleClass("fa-pause", player.paused);
  }, false);

  $(play_button).toggleClass("fa-play", !player.paused);
  $(play_button).toggleClass("fa-pause", player.paused);

  player.addEventListener("timeupdate", function() {
    progressBar.value = player.currentTime;
    start.text(getTime(player.currentTime));
    var val = ($('#progress-bar').val() - $('#progress-bar').attr('min')) / ($('#progress-bar').attr('max') - $('#progress-bar').attr('min'));
    var percent = val * 100;

    $('#progress-bar').css('background-image',
        '-webkit-gradient(linear, left top, right top, ' +
        'color-stop(' + percent + '%, #FFF), ' +
        'color-stop(' + percent + '%, #0B0B0B)' +
        ')');
  }, false);

  player.addEventListener("ended", function(){
       player.currentTime = 0;
       var url = player.src;
       var library = document.querySelector('#Library');
       var element = library.querySelectorAll("li[data-url='"+url+"']")[0];
       if (element != undefined) {
         var identifier = parseInt(element.id);
         playNextSongAtEnd(identifier);
       }
  });

  volumeSlider.addEventListener('input', function(){
    player.volume = volumeSlider.value / 100;
    $(mute_button).toggleClass("fa-volume-up", player.volume != 0);
    $(mute_button).toggleClass("fa-volume-off", player.volume == 0);
  }, false);

  $("#Volume").change(function (e) {
    var val = ($(this).val() - $(this).attr('min')) / ($(this).attr('max') - $(this).attr('min'));
    var percent = val * 100;

    $(this).css('background-image',
        '-webkit-gradient(linear, left top, right top, ' +
        'color-stop(' + percent + '%, #FFF), ' +
        'color-stop(' + percent + '%, #0B0B0B)' +
        ')');
  });

  $("#Volume").mousemove(function (e) {
    var val = ($(this).val() - $(this).attr('min')) / ($(this).attr('max') - $(this).attr('min'));
    var percent = val * 100;

    $(this).css('background-image',
        '-webkit-gradient(linear, left top, right top, ' +
        'color-stop(' + percent + '%, #FFF), ' +
        'color-stop(' + percent + '%, #0B0B0B)' +
        ')');
  });

  function getTime(t) {
    var m = ~~(t / 60),
      s = ~~(t % 60);
    return (m < 10 ? "0" + m : m) + ':' + (s < 10 ? "0" + s : s);
  }

  progressBar.addEventListener('input', function(){
    player.currentTime = player.duration / progressBar.max * progressBar.value;
  }, false);

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

    $(this).toggleClass("fa-volume-up", player.volume != 0);
    $(this).toggleClass("fa-volume-off", player.volume == 0);
  });
});

function mediaPlayerAppear(identifier) {
  if (identifier != 'stop') {
    var song = document.getElementById(identifier);

    if (document.getElementById("playedMusic") != undefined) {
      document.getElementById("playedMusic").remove();
    }
    var playing = document.createElement('li');
    playing.id = "playedMusic";
    playing.classList.add("playing");
    var parent = document.getElementById(identifier).parentNode;
    parent.insertBefore(playing, song);

    var url = song.getAttribute('data-url');
    var author = song.getAttribute('data-artist');
    var name = song.getAttribute('data-title');

    var library = document.getElementById('LibraryObjects');
    library.classList.add("library-reader-active");

    var playlist = document.getElementById('divPlaylist');
    playlist.classList.add('playlist-reader-showed');

    var musicPlayer = document.getElementById('musicPlayer');
    musicPlayer.dataset.musicPlayed = identifier;
    var readerPlayer = document.getElementById('readerPlayer');
    var nameTxt = document.getElementById('songName');
    nameTxt.innerHTML = author + " - " + name;
    musicPlayer.src = url;
    var audioPlayer = document.getElementById('audio-player');
    if (document.getElementById('sidebar').classList.contains('sidebar-hide') && !audioPlayer.classList.contains('left')) {
      audioPlayer.classList.add('left');
    }
    audioPlayer.classList.add('show');
    document.getElementById('Previous').onclick = function () {
      if (identifier != 0) {
        identifier = identifier - 1;
      }
      mediaPlayerAppear(identifier);
    };
    document.getElementById('Next').onclick = function () {
      playNextSong(identifier);
    };
  }
}

function playNextSongAtEnd(identifier) {
  var loopButtonClass = document.getElementById("loop").classList;
  var randomButtonClass = document.getElementById("random").classList;
  switch (loopButtonClass[0]) {
    case "fa-loop-one":
      identifier = identifier;
      break;

    case "fa-no-loop":
      switch (randomButtonClass[0]) {
        case 'fa-random':
          var lastSongList = document.getElementById("LibraryObjects").lastChild;
          var lastSong = lastSongList.firstChild;
          if (lastSong.id == "playedMusic") {
            var lastSong = lastSong.nextElementSibling;
          }
          var lastSongId = Number(lastSong.id);
          identifier = Math.floor(Math.random() * Math.floor(lastSongId+1));
          break;
        case 'fa-no-random':
          if (document.getElementById(identifier+1) != undefined) {
            identifier = identifier + 1;
          }else {
            identifier = 'stop';
          }
          break;
        default:
          if (document.getElementById(identifier+1) != undefined) {
            identifier = identifier + 1;
          }else {
            identifier = 'stop';
          }
        }
      break;

    case "fa-loop":
      switch (randomButtonClass[0]) {
        case 'fa-random':
          var lastSongList = document.getElementById("LibraryObjects").lastChild;
          var lastSong = lastSongList.firstChild;
          if (lastSong.id == "playedMusic") {
            var lastSong = lastSong.nextElementSibling;
          }
          var lastSongId = Number(lastSong.id);
          identifier = Math.floor(Math.random() * Math.floor(lastSongId+1));
          break;
        case 'fa-no-random':
          if (document.getElementById(identifier+1) != undefined) {
            identifier = identifier + 1;
          }else {
            identifier = 0;
          }
          break;
        default:
          if (document.getElementById(identifier+1) != undefined) {
            identifier = identifier + 1;
          }else {
            identifier = 0;
          }
        }
      break;

    default:
      if (document.getElementById(identifier+1) != undefined) {
        identifier = identifier + 1;
      }else {
        identifier = 0;
      }
  }
  mediaPlayerAppear(identifier)
}

function playNextSong(identifier) {
  var randomButtonClass = document.getElementById("random").classList;
  switch (randomButtonClass[0]) {
    case 'fa-random':
      var lastSongList = document.getElementById("LibraryObjects").lastChild;
      var lastSong = lastSongList.firstChild;
      if (lastSong.id == "playedMusic") {
        var lastSong = lastSong.nextElementSibling;
      }
      var lastSongId = Number(lastSong.id);
      identifier = Math.floor(Math.random() * Math.floor(lastSongId+1));
      break;
    case 'fa-no-random':
      if (document.getElementById(identifier+1) != undefined) {
        identifier = identifier + 1;
      }else {
        identifier = 0;
      }
      break;
    default:
      if (document.getElementById(identifier+1) != undefined) {
        identifier = identifier + 1;
      }else {
        identifier = 0;
      }
  }
  mediaPlayerAppear(identifier);
}

function setLoop(parameter) {
  var loopButton = document.getElementById("loop");
  switch (parameter) {
    case "one":
      loopButton.setAttribute('onclick', 'setLoop("none")');
      loopButton.classList.add('fa-loop-one');
      loopButton.classList.remove('fa-loop');
      break;

    case "all":
      loopButton.setAttribute('onclick', 'setLoop("one")');
      loopButton.classList.add('fa-loop');
      loopButton.classList.remove('fa-no-loop');
      break;

    case "none":
      loopButton.setAttribute('onclick', 'setLoop("all")');
      loopButton.classList.add('fa-no-loop');
      loopButton.classList.remove('fa-loop-one');
      break;

    default:
      loopButton.setAttribute('onclick', 'setLoop("one")');
      loopButton.classList.add('fa-loop');
      loopButton.classList.remove('fa-no-loop');
      break;
  }
}

function setRandom(parameter) {
  var randomButton = document.getElementById("random");
  switch (parameter) {
    case true:
      randomButton.setAttribute('onclick', 'setRandom(false)');
      randomButton.classList.add('fa-random');
      randomButton.classList.remove('fa-no-random');
      break;

    case false:
      randomButton.setAttribute('onclick', 'setRandom(true)');
      randomButton.classList.add('fa-no-random');
      randomButton.classList.remove('fa-random');
      break;

    default:
      randomButton.setAttribute('onclick', 'setRandom(true)');
      randomButton.classList.add('fa-no-random');
      randomButton.classList.remove('fa-random');
      break;
  }
}
