class MediaSession {
	constructor() {
		this.IsActive = false;
		if ('mediaSession' in navigator) {
			this.Element	= navigator.mediaSession;
			this.IsActive	= true;

			this.Element.setActionHandler('play', evt => reader.TogglePlayPauseButton());
			this.Element.setActionHandler('pause', evt => reader.TogglePlayPauseButton());
			this.Element.setActionHandler('stop', evt => reader.StopMusic());
			this.Element.setActionHandler('seekbackward', evt => reader.SeekBackward());
			this.Element.setActionHandler('seekforward', evt => reader.SeekForward());
			this.Element.setActionHandler('seekto',	evt => reader.SeekTo());
			this.Element.setActionHandler('previoustrack', evt => reader.PlayPreviousMusic());
			this.Element.setActionHandler('nexttrack',	evt => reader.PlayNextMusic(true));
			
		}
	}

	SetData(data) {
		this.Element.metadata = new MediaMetadata({
			title: htmlDecode(data.Title),
			artist: htmlDecode(data.Artist),
			album: htmlDecode(data.Album),
			artwork: [
				{src: data.Cover, sizes: '150x150', type: 'image/png'}
			]
		});
	}
}
const mediaSession = new MediaSession();


	// Handle the play action on mediaSession
	// navigator.mediaSession.setActionHandler('play', function() {
	// 	reader.TogglePlayPauseButton();
	// });

	// // Handle the pause action on mediaSession
	// navigator.mediaSession.setActionHandler('pause', function() {
	// 	reader.TogglePlayPauseButton();
	// });

	// // Handle the stop action on mediaSession
	// navigator.mediaSession.setActionHandler('stop', function() {
	// 	reader.StopMusic();
	// });

	// // Handle the seekbackward action on mediaSession
	// navigator.mediaSession.setActionHandler('seekbackward', function() {
	// 	reader.SeekBackward();
	// });

	// // Handle the seekforward action on mediaSession
	// navigator.mediaSession.setActionHandler('seekforward', function() {
	// 	reader.SeekForward();
	// });

	// // Handle the seekto action on mediaSession
	// navigator.mediaSession.setActionHandler('seekto', function() {
	// 	reader.SeekTo();
	// });

	// // Handle the previoustrack action on mediaSession
	// navigator.mediaSession.setActionHandler('previoustrack', function() { 
	// 	reader.PlayPreviousMusic();
	// });

	// // Handle the nexttrack action on mediaSession
	// navigator.mediaSession.setActionHandler('nexttrack', function() {
	// 	reader.PlayNextMusic(true);
	// });

// function mediaSessionSetData(data) {
// 	navigator.mediaSession.metadata = new MediaMetadata({
// 		title: htmlDecode(data.Title),
// 		artist: htmlDecode(data.Artist),
// 		album: htmlDecode(data.Album),
// 		artwork: [
// 			{src: data.Cover, sizes: '150x150', type: 'image/png'}
// 		]
// 	});
// }