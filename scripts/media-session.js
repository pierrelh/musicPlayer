const _mediaSession = new class {
	constructor() {
		this.IsActive = false;
		if ('mediaSession' in navigator) {
			this.Element	= navigator.mediaSession;
			this.IsActive	= true;

			this.Element.setActionHandler('play', evt => _playPause.Toggle());
			this.Element.setActionHandler('pause', evt => _playPause.Toggle());
			this.Element.setActionHandler('stop', evt => _player.StopMusic());
			this.Element.setActionHandler('seekbackward', evt => _progress.Backward());
			this.Element.setActionHandler('seekforward', evt => _progress.Forward());
			this.Element.setActionHandler('seekto',	evt => _progress.To(evt));
			this.Element.setActionHandler('previoustrack', evt => _previous.Play());
			this.Element.setActionHandler('nexttrack',	evt => _next.Play());
		}
	}

	HTMLDecode(input) {
		let doc = new DOMParser().parseFromString(input, 'text/html');
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
					{ src: data.Covers.x96, sizes: '96x96', type: 'image/png' },
					{ src: data.Covers.x128, sizes: '128x128', type: 'image/png' },
					{ src: data.Covers.x192, sizes: '192x192', type: 'image/png' },
					{ src: data.Covers.x256, sizes: '256x256', type: 'image/png' },
					{ src: data.Covers.x384, sizes: '384x384', type: 'image/png' },
					{ src: data.Covers.x512, sizes: '512x512', type: 'image/png' }
				]
			});
	}
}