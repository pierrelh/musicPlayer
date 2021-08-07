if ('mediaSession' in navigator) {
	
	// Handle the play action on mediaSession
	navigator.mediaSession.setActionHandler('play', function() {
		reader.TogglePlayPauseButton();
	});

	// Handle the pause action on mediaSession
	navigator.mediaSession.setActionHandler('pause', function() {
		reader.TogglePlayPauseButton();
	});

	// Handle the stop action on mediaSession
	navigator.mediaSession.setActionHandler('stop', function() {
		reader.StopMusic();
	});

	// Handle the seekbackward action on mediaSession
	navigator.mediaSession.setActionHandler('seekbackward', function() {
		reader.SeekBackward();
	});

	// Handle the seekforward action on mediaSession
	navigator.mediaSession.setActionHandler('seekforward', function() {
		reader.SeekForward();
	});

	// Handle the seekto action on mediaSession
	navigator.mediaSession.setActionHandler('seekto', function() {
		reader.SeekTo();
	});

	// Handle the previoustrack action on mediaSession
	navigator.mediaSession.setActionHandler('previoustrack', function() { 
		reader.PlayPreviousMusic();
	});

	// Handle the nexttrack action on mediaSession
	navigator.mediaSession.setActionHandler('nexttrack', function() {
		reader.PlayNextMusic(true);
	});
}

function mediaSessionSetData(data) {
	navigator.mediaSession.metadata = new MediaMetadata({
		title: htmlDecode(data.Title),
		artist: htmlDecode(data.Artist),
		album: htmlDecode(data.Album),
		artwork: [
			{src: data.Cover, sizes: '150x150', type: 'image/png'}	
		]
	});
}