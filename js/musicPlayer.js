$(document).ready(function () {
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
});

player.addEventListener("ended", function(){
     player.currentTime = 0;
     console.log("ended");
});
