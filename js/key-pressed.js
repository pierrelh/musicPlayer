document.onkeydown = function(event) {
    var musicPlayer = document.getElementById("MusicPlayer");
    switch (event.key) {

      case " ": // Spacebar is pressed
        if (document.activeElement.tagName != "INPUT") {
          event.preventDefault();
          togglePlayPause();
        }
        break;

      case "p": // P is pressed
        if (document.activeElement.tagName != "INPUT") { // Check if the input is not on a form
          event.preventDefault();
          playLastMusic();
        }
        break;

      case "n": // N is pressed
        if (document.activeElement.tagName != "INPUT") { // Check if the input is not on a form
          event.preventDefault();
          playNextMusic();
        }
        break;
      
      case "m": // M is pressed
        // Mute
        break;
    }
};
