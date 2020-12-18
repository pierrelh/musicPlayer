// Shuffle an array
function shuffle(a) {
	for (let i = a.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[a[i], a[j]] = [a[j], a[i]];
	}
	return a;
}

// Set Time to the right format
function getTime(t) {
	var m = ~~(t / 60),
	  s = ~~(t % 60);
	return (m < 10 ? "0" + m : m) + ":" + (s < 10 ? "0" + s : s);
}

// Decode dataset to put in values
function decodeHTML(html) {
	var txt = document.createElement("textarea");
	txt.innerHTML = html;
	return txt.value;
}

// Dynamically read & print a new input's image
function readURL(input, bannerId) {
	if (input.files && input.files[0]) {
		var reader = new FileReader();

		reader.addEventListener("load", function(e) {
			document.getElementById(bannerId).style.backgroundImage = "url(" + e.target.result + ")"
		});

		reader.readAsDataURL(input.files[0]);
	}
}

// Get an url & return the public_id. ex: https://exemple/exemple/monfichier.jpg => monfichier
function getPublicIdFromUrl(url) {
	url = url.split("/");
	url = url.pop();
	url = url.split(".");
	url.pop();
	publicId = url.join(".")
	return publicId
}

// Show the assets Background
function backgroundAppear() {
	var background = document.getElementById("Background");
	background.className = "background-appear";
}

// Hide the assets Background
function backgroundHide() {
	var background = document.getElementById("Background");
	background.className = "";
}

// Handle the play/pause actions
function togglePlayPause() {
	var player = document.getElementById("MusicPlayer");
	var isPlaying = document.getElementById("PlayPause").dataset.isPlaying;
	switch (isPlaying) {
		case "true": // Pause the audio
			document.getElementById("PlayPause").src = "../../img/play.png";
			document.getElementById("PlayPause").dataset.isPlaying = "false";
			player.pause();
			break;
	
		case "false": // Play the audio
			document.getElementById("PlayPause").src = "../../img/pause.png";
			document.getElementById("PlayPause").dataset.isPlaying = "true";
			player.play();
			break;
	
		default: // Default: Pause the audio
			document.getElementById("PlayPause").src = "../../img/play.png";
			document.getElementById("PlayPause").dataset.isPlaying = "false";
			player.pause();
			break;
	}
}

// Handle the Mute button actions
function toggleMute() {
	var MusicPlayer = document.getElementById("MusicPlayer");
	var Mute = document.getElementById("Mute");
	var isMute = Mute.dataset.mute;
	switch (isMute) {
		case "true": // Setting the audio on
			MusicPlayer.volume = Mute.dataset.volume;
			Mute.src = "../../img/audio-on.png";
			Mute.dataset.mute = "false";
			break;
	
		case "false": // Setting the audio off
			MusicPlayer.volume = 0;
			Mute.src = "../../img/audio-off.png";
			Mute.dataset.mute = "true";
			break;
	
		default: // Default: Setting the audio on
			MusicPlayer.volume = Mute.dataset.volume;
			Mute.src = "../../img/audio-on.png";
			Mute.dataset.mute = "false";
			break;
	}
}

// Play the passed music
function playMusic(musicId) {    
	if (document.getElementById("PlayedMusic") != undefined) { // Checking if there is a played music template
	  document.getElementById("PlayedMusic").remove(); // Remove it if exist
	}

	var music = document.getElementById("Music" + musicId); // Getting the element of the new played music
	var playing = document.createElement("li"); // Creating a new played music template
	playing.id = "PlayedMusic";
	playing.classList.add("playing");
	var parent = document.getElementById("MusicList" + musicId);
	parent.insertBefore(playing, music); // Adding the template
	
	// Getting all the new music's attributes
	var url = music.getAttribute("data-url");
	var author = music.getAttribute("data-artist");
	var name = music.getAttribute("data-title");

	// Adding the class to LibraryObjects if needed
	var library = document.getElementById("LibraryObjects");
	if (!library.classList.contains("library-reader-active")) {
		library.classList.add("library-reader-active");
	}
	
	// Adding the class to divPlaylist if needed
	var playlist = document.getElementById("DivPlaylist");
	if (!playlist.classList.contains("playlist-reader-showed")) {
		playlist.classList.add("playlist-reader-showed");
	}
	
	// Setting the new attributes in the musicPlayer
	var musicPlayer = document.getElementById("MusicPlayer");
	musicPlayer.dataset.musicPlayed = musicId;
	var nameTxt = document.getElementById("SongName");
	nameTxt.innerHTML = author + " - " + name;
	musicPlayer.src = url;

	// Adding the class to audioPlayer if needed
	var audioPlayer = document.getElementById("AudioPlayer");
	if (!audioPlayer.classList.contains("show")) {
		audioPlayer.classList.add("show");
	}
}

// Handle the play of the previous music asked by the user
function playLastMusic() {
	var playedMusicId = document.getElementById("MusicPlayer").dataset.musicPlayed; // Getting the id of the played music
	var isRandom = document.getElementById("Random").dataset.random; // Getting the random setting
	var player = document.getElementById("MusicPlayer");

	if (player.currentTime > 5) {

		var indexOfNextSong = playedMusicId;
		
	}else {
		// Choose witch playlist to use
		if (isRandom == "true") {
			var usedPlaylist = randomPlaylist.slice();
		}else {
			var usedPlaylist = playlist.slice();
		}

		var indexOfCurrentSong = usedPlaylist.indexOf(parseInt(playedMusicId)); // Getting the position of the current song in the playlist
		if (indexOfCurrentSong == 0) { // Check if the played music is the first one
			
			var indexOfNextSong = 0;

		}else { // The player rollback the playlist
			var indexOfNextSong = indexOfCurrentSong - 1;
		}
	}


	// Play the previous music
	playMusic(indexOfNextSong);
}

// Handle the play of the next music asked by the user
function playNextMusic(isSkiped) {
	var isRandom = document.getElementById("Random").dataset.random; // Getting the random setting
	var playedMusicId = document.getElementById("MusicPlayer").dataset.musicPlayed; // Getting the id of the played music
	var loop = document.getElementById("Loop").dataset.loop; // Getting the loop setting
	if (isSkiped === undefined) {
		isSkiped = true;// Setting a default value if undefined
	}

	// Check if the reader should loop on the same music or not
	if (!isSkiped && loop == "one") {
		var indexOfNextSong = document.getElementById("MusicPlayer").dataset.musicPlayed; // Getting the id of the current music
	}else {
		// Choose witch playlist to use
		if (isRandom == "true") {
			var usedPlaylist = randomPlaylist.slice();
		}else {
			var usedPlaylist = playlist.slice();
		}

		var indexOfCurrentSong = usedPlaylist.indexOf(parseInt(playedMusicId)); // Getting the position of the current song in the playlist
		if (indexOfCurrentSong == usedPlaylist.length) { // Check if the played music is the last one
			if (document.getElementById("Loop").dataset.loop == "none") { // The player will not restart the playlist
				return;
			}else { // The player will restart the playlist
				var indexOfNextSong = 0;
			}
		}else { // The player continu the playlist
			var indexOfNextSong = indexOfCurrentSong + 1;
		}

	}    
	// Play the next music
	playMusic(indexOfNextSong);
}

function checkPlaylistSection() {
	if (document.getElementById("DivPlaylist").classList.contains("playlist-div")) {
		document.getElementById("DivPlaylist").classList.remove("playlist-div");
		document.getElementById("DivPlaylist").classList.add("playlist-div-hide");
		// document.getElementById("myPlaylists").setAttribute("onclick", "getAllPlaylists()");
	}
}

// Upload a file to Cloudinary
function uploadFileCloudinary(fileToUpload, preset, barId, textId) {
	return new Promise((resolve, reject) => {
		var url = "https://api.cloudinary.com/v1_1/htko7uqqo/upload";
		
		var file = new FormData();
		var fileXhr = new XMLHttpRequest();
		fileXhr.open("POST", url, true);
		fileXhr.setRequestHeader("X-Requested-With", "XMLHttpRequest");
	
		// Update progress for audio file
		fileXhr.upload.addEventListener("progress", function (e) {
			var progress = Math.round((e.loaded * 100.0) / e.total);
			document.getElementById(barId).style.width = progress + "%";
			document.getElementById(textId).innerHTML = progress + "%";
		});
	
		file.append("upload_preset", preset);
		file.append("tags", "browser_upload"); // Optional - add tag for image admin in Cloudinary
		file.append("file", fileToUpload);
		fileXhr.send(file);
		fileXhr.onreadystatechange = function () {
			if (fileXhr.readyState == 4 && fileXhr.status == 200) {
				resolve(fileXhr);
			}else {
				reject();
			}
		}
	});
}

function uploadMusic(formDataMusic, barId, txtId) {
	return new Promise((resolve, reject) => {
		var url = server + "/functions/files/uploadMusic.php";
		
		var fileXhr = new XMLHttpRequest();
		fileXhr.open("POST", url, true);
		fileXhr.setRequestHeader("X-Requested-With", "XMLHttpRequest");
	
		// Update progress for audio file
		fileXhr.upload.addEventListener("progress", function (e) {
			var progress = Math.round((e.loaded * 100.0) / e.total);
			document.getElementById(barId).style.width = progress + "%";
			document.getElementById(txtId).innerHTML = progress + "%";
		});

		fileXhr.send(formDataMusic);
		fileXhr.onreadystatechange = function () {
			if (fileXhr.readyState == 4 && fileXhr.status == 200) {
				resolve(true);
			}else {
				reject();
			}
		}
	});
}

function uploadCover(formDataCover, barId, txtId) {
	return new Promise((resolve, reject) => {
		$.ajax({
			url: server + "/functions/files/uploadCover.php",
			type: "POST",
			dataType: "script",
			cache: false,
			contentType: false,
			processData: false,
			data: formDataCover,
			xhr: function () {
				var xhr = $.ajaxSettings.xhr();
				xhr.upload.onprogress = function(e) {
					if (e.lengthComputable) {
						var progress = Math.round((e.loaded * 100.0) / e.total);
						document.getElementById(barId).style.width = progress + "%";
						document.getElementById(txtId).innerHTML = progress + "%";
					}
				};
				// return xhr;
			}
		}).done(function() {
			document.getElementById(txtId).innerHTML = "Envoyé";
			resolve(true);
		}).fail(function() {
			reject(false);
		});
	});
}