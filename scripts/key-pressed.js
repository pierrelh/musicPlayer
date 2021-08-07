document.onkeydown = function(event) {
	if (document.activeElement.tagName != "INPUT") { // Check if the input is not on a form
		event.preventDefault();
		switch (event.key) {

			case " ": // Spacebar is pressed -> play/pause audio
				reader.TogglePlayPauseButton()
				break;

			case "p": // P is pressed -> play last music
				reader.PlayPreviousMusic()
				break;

			case "n": // N is pressed -> play next music
				reader.PlayNextMusic(true)
				break;

			case "r": // R is pressed -> toggle random
				reader.ToggleRandom()
				break;

			case "m": // M is pressed -> toggle mute
				reader.ToggleMute()
				break;

			case "l": // L is pressed -> toggle loop
				reader.ToggleLoop()
				break;

			case "a": // A is pressed -> toggle account section
				account.Toggle();
				break;

			case "u": // U is pressed -> toggle upload section
				uploadSection.Toggle();
				break;

			case "e": // E is pressed -> toggle edit
				sidebar.ToggleEdit();
				break;

			case "d": // D is pressed -> toggle delete
				sidebar.ToggleDelete();
				break;

			case "h": // H is pressed -> toggle help section
				help.Toggle();
				break;

			case "z": // Z is pressed -> toggle playlists section
				togglePlaylistSection();
				break;

			case "c": // C is pressed -> toggle create playlist
				toggleCreatePlaylist();
				break;

			case "s": // S is pressed -> toggle sidebar
				sidebar.Toggle();
				break;

			case "ArrowLeft": // ArrowLeft is pressed -> -10s on audio
				reader.SeekBackward();
				break;

			case "ArrowRight": // ArrowRight is pressed -> +10s on audio
				reader.SeekForward();
				break;

			case "ArrowUp": // ArrowUp is pressed -> +10% on volume
				reader.IncreaseVolume();
				break;

			case "ArrowDown": // ArrowDown is pressed -> -10% on volume
				reader.DicreaseVolume();
				break;
		}
	}
};
