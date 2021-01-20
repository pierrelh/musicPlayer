document.onkeydown = function(event) {
	switch (event.key) {

		case " ": // Spacebar is pressed -> play/pause audio
			if (document.activeElement.tagName != "INPUT") {
				event.preventDefault();
				togglePlayPause();
			}
			break;

		case "p": // P is pressed -> play last music
			if (document.activeElement.tagName != "INPUT") { // Check if the input is not on a form
				event.preventDefault();
				playLastMusic();
			}
			break;

		case "n": // N is pressed -> play next music
			if (document.activeElement.tagName != "INPUT") { // Check if the input is not on a form
				event.preventDefault();
				playNextMusic();
			}
			break;
			
		case "r": // R is pressed -> toggle random
			if (document.activeElement.tagName != "INPUT") { // Check if the input is not on a form
				event.preventDefault();
				toggleRandom();
			}
			break;
			
		case "m": // M is pressed -> toggle mute
			if (document.activeElement.tagName != "INPUT") { // Check if the input is not on a form
				event.preventDefault();
				toggleMute();
			}
			break;

		case "l": // L is pressed -> toggle loop
			if (document.activeElement.tagName != "INPUT") { // Check if the input is not on a form
				event.preventDefault();
				toggleLoop();
			}
			break;

		case "ArrowLeft": // ArrowLeft is pressed -> -10s on audio
			if (document.activeElement.tagName != "INPUT") { // Check if the input is not on a form
				event.preventDefault();
				seekBackward();
			}
			break;

		case "ArrowRight": // ArrowRight is pressed -> +10s on audio
			if (document.activeElement.tagName != "INPUT") { // Check if the input is not on a form
				event.preventDefault();
				seekForward();
			}
			break;

		case "ArrowUp": // ArrowUp is pressed -> +10% on volume
			if (document.activeElement.tagName != "INPUT") { // Check if the input is not on a form
				event.preventDefault();
				increaseVolume();
			}
			break;

		case "ArrowDown": // ArrowDown is pressed -> -10% on volume
			if (document.activeElement.tagName != "INPUT") { // Check if the input is not on a form
				event.preventDefault();
				dicreaseVolume();
			}
			break;
	}
};
