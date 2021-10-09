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
			this.Element.setActionHandler('nexttrack',	evt => reader.PlayNextMusic());
		}
	}

	HTMLDecode(input) {
		let doc = new DOMParser().parseFromString(input, "text/html");
		return doc.documentElement.textContent;
	}

	// Setting datas to the mediaSession
	SetData(data) {
		if (this.IsActive)
			this.Element.metadata = new MediaMetadata({
				title: this.HTMLDecode(data.Title),
				artist: this.HTMLDecode(data.Artist),
				album: this.HTMLDecode(data.Album),
				artwork: [
					{ src: data.Cover, sizes: '150x150', type: 'image/png' },
					// { src: data.Cover, sizes: '96x96', type: 'image/png' },
					// { src: data.Cover, sizes: '128x128', type: 'image/png' },
					// { src: data.Cover, sizes: '192x192', type: 'image/png' },
					// { src: data.Cover, sizes: '256x256', type: 'image/png' },
					// { src: data.Cover, sizes: '384x384', type: 'image/png' },
					// { src: data.Cover, sizes: '512x512', type: 'image/png' }
				]
			});
	}
}

const _mediaSession = new MediaSession();