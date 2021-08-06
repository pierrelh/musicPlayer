document.onkeydown = function(event) {
	switch (event.key) {

		case " ": // Spacebar is pressed -> play/pause audio
			if (document.activeElement.tagName != "INPUT") {
				event.preventDefault();
				reader.TogglePlayPauseButton()
			}
			break;

		case "p": // P is pressed -> play last music
			if (document.activeElement.tagName != "INPUT") { // Check if the input is not on a form
				event.preventDefault();
				reader.PlayLastMusic()
			}
			break;

		case "n": // N is pressed -> play next music
			if (document.activeElement.tagName != "INPUT") { // Check if the input is not on a form
				event.preventDefault();
				reader.PlayNextMusic()
			}
			break;
			
		case "r": // R is pressed -> toggle random
			if (document.activeElement.tagName != "INPUT") { // Check if the input is not on a form
				event.preventDefault();
				reader.ToggleRandom()
			}
			break;
			
		case "m": // M is pressed -> toggle mute
			if (document.activeElement.tagName != "INPUT") { // Check if the input is not on a form
				event.preventDefault();
				reader.ToggleMute()
			}
			break;

		case "l": // L is pressed -> toggle loop
			if (document.activeElement.tagName != "INPUT") { // Check if the input is not on a form
				event.preventDefault();
				reader.ToggleLoop()
			}
			break;
		
		case "a": // A is pressed -> toggle account section
			if (document.activeElement.tagName != "INPUT") { // Check if the input is not on a form
				event.preventDefault();
				toggleAccountSection();
			}
			break;

		case "u": // U is pressed -> toggle upload section
			if (document.activeElement.tagName != "INPUT") { // Check if the input is not on a form
				event.preventDefault();
				toggleUploadSection();
			}
			break;

		case "e": // E is pressed -> toggle edit
			if (document.activeElement.tagName != "INPUT") { // Check if the input is not on a form
				event.preventDefault();
				toggleEdit();
			}
			break;

		case "d": // D is pressed -> toggle delete
			if (document.activeElement.tagName != "INPUT") { // Check if the input is not on a form
				event.preventDefault();
				toggleDelete();
			}
			break;
		
		case "h": // H is pressed -> toggle help section
			if (document.activeElement.tagName != "INPUT") { // Check if the input is not on a form
				event.preventDefault();
				toggleHelpSection();
			}
			break;

		case "z": // Z is pressed -> toggle playlists section
			if (document.activeElement.tagName != "INPUT") { // Check if the input is not on a form
				event.preventDefault();
				togglePlaylistSection();
			}
			break;
		
		case "c": // C is pressed -> toggle create playlist
			if (document.activeElement.tagName != "INPUT") { // Check if the input is not on a form
				event.preventDefault();
				toggleCreatePlaylist();
			}
			break;

		case "s": // S is pressed -> toggle sidebar
			if (document.activeElement.tagName != "INPUT") { // Check if the input is not on a form
				event.preventDefault();
				toggleSidebar();
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
