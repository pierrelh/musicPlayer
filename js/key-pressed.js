document.onkeydown = function(event) {
    var player = document.getElementById('musicPlayer');
    var play_button = $('#play');
    var musicPlayer = document.getElementById('musicPlayer');
    switch (event.keyCode) {

      case 32: //spacebar is pressed
        event.preventDefault();
        if (player.paused) {
          player.play();
          $(play_button).toggleClass("fa-play");
        }else {
          player.pause();
          $(play_button).toggleClass("fa-pause");
        }
        break;

      case 80: //p is pressed
        event.preventDefault();
        var identifier = parseInt(musicPlayer.dataset.musicPlayed);
        if (identifier != 0) {
          identifier = identifier - 1;
        }else {
          identifier = identifier;
        }
        mediaPlayerAppear(identifier);
        break;

      case 78: //n is pressed
        event.preventDefault();
        var identifier = parseInt(musicPlayer.dataset.musicPlayed);
        if (document.getElementById(identifier+1) != undefined) {
          identifier = identifier + 1;
        }else {
          identifier = 0;
        }
        mediaPlayerAppear(identifier);
        break;
    }
};
