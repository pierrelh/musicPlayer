$(document).ready(function () {
  var audio_player = $("#audio-player");
  var start = $("#start");
  var play_button = $('#play');
  // var progress_bar = $("#progressbar");
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
  }, false);

  player.addEventListener("ended", function(){
       player.currentTime = 0;
       console.log("ended");
  });

  volumeSlider.addEventListener('input', function(){
    player.volume = volumeSlider.value / 100;
    $(mute_button).toggleClass("fa-volume-up", player.volume != 0);
    $(mute_button).toggleClass("fa-volume-off", player.volume == 0);
  }, false);

  $("#Volume").mousemove(function (e) {
    var val = ($(this).val() - $(this).attr('min')) / ($(this).attr('max') - $(this).attr('min'));
    var percent = val * 100;

    $(this).css('background-image',
        '-webkit-gradient(linear, left top, right top, ' +
        'color-stop(' + percent + '%, #FFF), ' +
        'color-stop(' + percent + '%, #0B0B0B)' +
        ')');
});

$("#progress-bar").mousemove(function (e) {
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

  // function getProgressBarClickInfo(progress_bar, e) {
  //   var offset = progress_bar.position();
  //   var x = e.pageX - offset.left;
  //   var y = e.pageY - offset.top;
  //   var max = progress_bar.progressbar("option", "max");
  //   var value = x * max / progress_bar.width();
  //
  //   return {
  //     x: x,
  //     y: y,
  //     max: max,
  //     value: value
  //   };
  // }

  // progressBar.slider({
  //   value: player.currentTime,
  // });

  // progress_bar.progressbar({
  //   value: player.currentTime,
  // });

  // progress_bar.click(function(e) {
  //   var info = getProgressBarClickInfo($(this), e);
  //   player.currentTime = player.duration / info.max * info.value;
  // });

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
