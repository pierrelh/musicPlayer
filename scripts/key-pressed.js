document.onkeydown = function(event) {
	if (document.activeElement.tagName != 'INPUT') { // Check if the input is not on a form
		event.preventDefault();
		switch (event.key) {

			case ' ': // Spacebar is pressed -> play/pause audio
				_playPause.Toggle();
				break;

			case 'a': // A is pressed -> toggle account section
				_account.Toggle();
				break;

			case 'c': // C is pressed -> toggle create playlist
				_addLayouts.Toggle();
				break;

			case 'd': // D is pressed -> toggle delete
				_deleteLayouts.Toggle();
				break;

			case 'e': // E is pressed -> toggle edit
				_editLayouts.Toggle();
				break;

			case 'h': // H is pressed -> toggle help section
				_help.Toggle();
				break;

			case 'l': // L is pressed -> toggle loop
				_loop.Toggle();
				break;

			case 'm': // M is pressed -> toggle mute
				_mute.Toggle();
				break;

			case 'n': // N is pressed -> play next music
				_next.Play();
				break;

			case 'p': // P is pressed -> play last music
				_previous.Play();
				break;

			case 'r': // R is pressed -> toggle random
				_random.Toggle();
				break;

			case 's': // S is pressed -> toggle sidebar
				_sidebar.Toggle();
				break;

			case 'u': // U is pressed -> toggle upload section
				_uploadSection.Toggle();
				break;

			case 'z': // Z is pressed -> toggle playlists section
				_playlistSection.Toggle();
				break;

			case 'ArrowLeft': // ArrowLeft is pressed -> -10s on audio
				_progress.Backward();
				break;

			case 'ArrowRight': // ArrowRight is pressed -> +10s on audio
				_progress.Forward();
				break;

			case 'ArrowUp': // ArrowUp is pressed -> +10% on volume
				_volume.Increase();
				break;

			case 'ArrowDown': // ArrowDown is pressed -> -10% on volume
				_volume.Dicrease();
				break;
		}
	}
};
