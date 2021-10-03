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

	// Setting datas to the mediaSession
	SetData(data) {
		this.Element.metadata = new MediaMetadata({
			title: data.Title,
			artist: data.Artist,
			album: data.Album,
			artwork: [
				{src: data.Cover, sizes: '150x150', type: 'image/png'}
			]
		});
	}
}

const mediaSession = new MediaSession();