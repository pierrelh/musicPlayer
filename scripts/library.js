const _library = new class {
	constructor() {
		this.Element		= document.getElementById('Library');
		this.Playlist		= [];
		this.RandomPlaylist	= [];
		this.GetFiles();
		_playlistReader.Hydrate();
	}

	GetPlaylist() {		
		if (_random.IsRandom)
			return this.RandomPlaylist.slice();
		else
			return this.Playlist.slice();
	}

	CreateRandomPlaylist() {
		this.RandomPlaylist = this.Playlist.slice();
		for (let i = this.RandomPlaylist.length - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * (i + 1));
			[this.RandomPlaylist[i], this.RandomPlaylist[j]] = [this.RandomPlaylist[j], this.RandomPlaylist[i]];
		}
	}

	GetFiles(row = 'file_id', type = 'DESC') {
		let self = this;
		$.ajax({
			url: server + '/functions/files/getAllFiles.php',
			type: 'POST',
			data: {
				'row': row,
				'type': type
			},
			success: function(data){
				data = JSON.parse(data);
				if (data.length != 0) {
					self.Element.innerHTML = '';
					self.Playlist = [];
					for (let i = 0; i < data.length; i++) {
						let music = new Music(data[i], i);
						self.Playlist.push(music);
						self.Element.appendChild(music.Create());
					};
				}
			}
		});
	}

	Reduce() {
		if (!this.Element.classList.contains('library-reader-active'))
			this.Element.classList.add('library-reader-active');
	}
}