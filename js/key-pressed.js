document.onkeydown = function(event) {
    var musicPlayer = document.getElementById("MusicPlayer");
    switch (event.key) {

      case " ": // Spacebar is pressed
        if (document.activeElement.tagName != "INPUT") {
          event.preventDefault();
          playPause();
        }
        break;

      case "p": // P is pressed
        if (document.activeElement.tagName != "INPUT") { // Check if the input is not on a form
          event.preventDefault();
          var identifier = parseInt(musicPlayer.dataset.musicPlayed);
          if (identifier != 0) {
            identifier = identifier - 1;
          }else {
            identifier = identifier;
          }
          mediaPlayerAppear(identifier);
        }
        break;

      case "n": // N is pressed
        if (document.activeElement.tagName != "INPUT") { // Check if the input is not on a form
          event.preventDefault();
          playNextMusic();
        }
        break;
    }
};
