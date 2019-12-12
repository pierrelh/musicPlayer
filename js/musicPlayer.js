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
       var identifier = element.id;
       mediaPlayerAppear(identifier + 1)
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
