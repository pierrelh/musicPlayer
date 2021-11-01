const _library = new class {
	constructor() {
		this.Element		= document.getElementById('Library');
		this.All			= [];
		this.Playlist		= [];
		this.RandomPlaylist	= [];
		this.GetFiles();
	}

	GetPlaylist() {
		if (_random.IsRandom)
			return this.RandomPlaylist;
		return this.Playlist;
	}

	CreateRandomPlaylist() {
		this.RandomPlaylist = this.All.slice();
		for (let i = this.RandomPlaylist.length - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * (i + 1));
			[this.RandomPlaylist[i], this.RandomPlaylist[j]] = [this.RandomPlaylist[j], this.RandomPlaylist[i]];
		}
	}

	RemoveFromPlaylist(music) {
		if (_random.IsRandom)
			this.RandomPlaylist = this.GetPlaylist().filter(function(e) { return e !== music });
		else
			this.Playlist = this.GetPlaylist().filter(function(e) { return e !== music });		
	}

	GetFiles(row = 'file_id', type = 'DESC') {
		let self = this;
		$.ajax({
			url: server + '/ajax/Files/GetAll.php',
			type: 'POST',
			data: {
				'row': row,
				'type': type
			},
			success: function(data){
				data = JSON.parse(data);
				if (data.length == 0)
					return;
				self.Element.innerHTML = '';
				self.All = [];
				_playlistReader.Drop();
				for (let i = 0; i < data.length; i++)
					self.All.push(new Music(data[i], i));
				self.Playlist = self.All.slice();
			}
		});
	}

	Reduce() {
		if (!this.Element.classList.contains('library-reader-active'))
			this.Element.classList.add('library-reader-active');
	}
}