document.onkeydown = function(event) {
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
				if (document.activeElement.tagName != "INPUT") { // Check if the input is not on a form
					event.preventDefault();
					toggleMute();
				}
				break;

			case "ArrowLeft": // ArrowLeft is pressed
				// Progress +10 secondes
				break;

			case "ArrowRight": // ArrowRight is pressed
				// Progress -10 secondes
				break;

			case "ArrowUp": // ArrowUp is pressed
				// Volume +10%
				break;

			case "ArrowDown": // ArrowDown is pressed
				// Volume -10%
				break;
		}
};
