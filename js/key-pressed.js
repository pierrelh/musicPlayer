document.onkeydown = function(event) {
    var player = document.getElementById('musicPlayer');
    var play_button = $('#play');
    switch (event.keyCode) {

      case 32:
        event.preventDefault();
        if (player.paused) {
          player.play();
          $(play_button).toggleClass("fa-play");
        }else {
          player.pause();
          $(play_button).toggleClass("fa-pause");
        }
        break;

      case 80:
        event.preventDefault();

        break;

      case 78:
        event.preventDefault();
        break;
    }
};
