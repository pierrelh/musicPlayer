// Shuffle an array
function shuffle(a) {
	for (let i = a.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[a[i], a[j]] = [a[j], a[i]];
	}
	return a;
}

// Decode html txt
function htmlDecode(input) {
	var doc = new DOMParser().parseFromString(input, "text/html");
	return doc.documentElement.textContent;
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
	url = url.join("");
	return url;
}

// Show the assets Background
function backgroundAppear() {
	if (!document.getElementById("Background").classList.contains("background-appear")) {
		document.getElementById("Background").classList.add("background-appear");		
	}
}

// Hide the assets Background
function backgroundHide() {
	if (document.getElementById("Background").classList.contains("background-appear")) {
		document.getElementById("Background").classList.remove("background-appear");		
	}
}

// Check if PlaylistSection is visible & hide it if so
function checkPlaylistSection() {
	if (document.getElementById("DivPlaylist").classList.contains("playlist-div")) {
		document.getElementById("DivPlaylist").classList.remove("playlist-div");
		document.getElementById("DivPlaylist").classList.add("playlist-div-hide");
		return true;
	} else {
		return false;
	}
}

// Handle the play/pause actions
function togglePlayPause() {
	var player = document.getElementById("MusicPlayer");
	switch (player.paused) {
		case true: // Play the audio
			document.getElementById("PlayPause").src = "../../img/pause.png";
			player.play();
			break;
	
		case false: // Pause the audio
			document.getElementById("PlayPause").src = "../../img/play.png";
			player.pause();
			break;
	
		default: // Default: Pause the audio
			document.getElementById("PlayPause").src = "../../img/play.png";
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

// Handle the Random button actions
function toggleRandom() {
	var random = document.getElementById("Random");
	var randomType = random.dataset.random;
	switch (randomType) {
		case "true": // Setting random to false
			random.dataset.random = "false";
			random.src = "../../img/no-random.png";
			break;
  
		case "false": // Setting random to true
			randomPlaylist = playlist.slice();
			shuffle(randomPlaylist); // Creating the random playlist
			random.dataset.random = "true";
			random.src = "../../img/random.png";
			break;
  
		default: // Default: Setting random to false
			random.dataset.random = "false";
			random.src = "../../img/no-random.png";
			break;
	}
}

// Handle the Loop button actions
function toggleLoop() {
	var loop = document.getElementById("Loop");
	var loopType = loop.dataset.loop;
	switch (loopType) {
		case "one": // Setting loop to none
			loop.dataset.loop = "none";
			loop.src = "../../img/no-loop.png";
			break;
	
		case "all": // Setting loop to one
			loop.dataset.loop = "one";
			loop.src = "../../img/loop-one.png";
			break;
	
		case "none": // Setting loop to all
			loop.dataset.loop = "all";
			loop.src = "../../img/loop.png";
			break;
	
		default: // Default: Setting loop to all
			loop.dataset.loop = "all";
			loop.src = "../../img/loop.png";
			break;
	}
}

// Stop the music player
function stopMusic() {
	var musicPlayer = document.getElementById("MusicPlayer");
	musicPlayer.pause();
	musicPlayer.currentTime = 0;
}

// Seek the music player to the wanted second
function seekTo(data) {
    if (data.fastSeek) {
    	startSeeking();
    } else {
      	stopSeeking();
      	musicPlayer.currentTime = data.seekTime;
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
	var album = music.getAttribute("data-album");
	var cover = music.getAttribute("data-img");

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

	// Setting the mediaSession metadatas
	if ('mediaSession' in navigator) {
		navigator.mediaSession.metadata = new MediaMetadata({
			title: htmlDecode(name),
			artist: htmlDecode(author),
			album: htmlDecode(album),
			artwork: [
				{src: cover, sizes: '150x150', type: 'image/png'}	
			]
		
		});
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
	playMusic(usedPlaylist[indexOfNextSong]);
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
		if (indexOfCurrentSong == (usedPlaylist.length) - 1) { // Check if the played music is the last one
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
	playMusic(usedPlaylist[indexOfNextSong]);
}

// Progress +10 secondes to the played music
function seekForward() {
	document.getElementById("MusicPlayer").currentTime += 10;
}

// Progress -10 secondes to the played music
function seekBackward() {
	document.getElementById("MusicPlayer").currentTime -= 10;
}

// Remove 10% to the player's volume
function dicreaseVolume() {
	if (document.getElementById("MusicPlayer").volume <= 0.1) {
		document.getElementById("MusicPlayer").volume = 0;		
	}else {
		document.getElementById("MusicPlayer").volume -= 0.1
	}
}

// Add 10% to the player's volume
function increaseVolume() {
	if (document.getElementById("MusicPlayer").volume >= 0.9) {
		document.getElementById("MusicPlayer").volume = 1;		
	}else {
		document.getElementById("MusicPlayer").volume += 0.1
	}
}

// Upload a file to Cloudinary
function uploadFileCloudinary(formDataMusic, barId, txtId, link) {
	return new Promise((resolve, reject) => {
		var url = server + "/functions/files/" + link;
		
		var xhr = new XMLHttpRequest();
	
		// Update progress for audio file
		xhr.upload.addEventListener("progress", function (e) {
			var progress = Math.round((e.loaded * 100.0) / e.total);
			document.getElementById(barId).style.width = progress + "%";
			document.getElementById(txtId).innerHTML = progress + "%";
		});

		xhr.onerror = () => reject("false");
		xhr.onreadystatechange = function () {
			if (this.readyState == 4 && this.status == 200) {
				document.getElementById(txtId).innerHTML = "Envoyé";
				resolve(this.responseText);
			}
		}
		xhr.open("POST", url, true);
		xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest");
		xhr.send(formDataMusic);
	});
}

// Toggle sidebar section 
function toggleSidebar() {
	if (document.getElementById("Library").classList.contains("library")) {
		// Hide the sidebar and enlarge the librarys and the player
		document.getElementById("Arrow").classList.remove("arrow-active");
		document.getElementById("Sidebar").classList.add("sidebar-hide");
		document.getElementById("Library").classList.remove("library");
		document.getElementById("DivPlaylist").classList.add("playlist-sidebar-hided");
		document.getElementById("AudioPlayer").classList.add("left");
	}else {
		// Show the sidebar and reduce the librarys and the player
		document.getElementById("Arrow").classList.add("arrow-active");
		document.getElementById("Sidebar").classList.remove("sidebar-hide");
		document.getElementById("Library").classList.add("library");
		document.getElementById("DivPlaylist").classList.remove("playlist-sidebar-hided");
		document.getElementById("AudioPlayer").classList.remove("left");
	}
}

// Toggle account section 
function toggleAccountSection() {
	if (document.getElementById("Account").classList.contains("appear")) {
		backgroundHide();
		document.getElementById("Account").classList.remove("appear");		
	}else {
		fetch(server + "/functions/account/getCloudinaryAdmin.php")
		.then((response) => response.json())
		.then(function (response) {
	
			document.getElementById("AccountPlan").innerHTML = response["plan"];
			document.getElementById("AccountLastUpdate").innerHTML = response["last_updated"];
			document.getElementById("AccountRequests").innerHTML = response["requests"];
			document.getElementById("AccountResources").innerHTML = response["resources"];
			document.getElementById("AccountDerivedResources").innerHTML = response["derived_resources"];
	
			document.getElementById("AccountTransformationUsage").innerHTML = response["transformations"]["usage"];
			document.getElementById("AccountTransformationPercent").innerHTML = response["transformations"]["used_percent"] + "%";
			document.getElementById("AccountTransformationProgressBar").style.width = response["transformations"]["used_percent"] + "%";
			document.getElementById("AccountTransformationLimit").innerHTML = response["transformations"]["limit"];
	
			document.getElementById("AccountObjectsUsage").innerHTML = response["objects"]["usage"];
			document.getElementById("AccountObjectsPercent").innerHTML = response["objects"]["used_percent"] + "%";
			document.getElementById("AccountObjectsProgressBar").style.width = response["objects"]["used_percent"] + "%";
			document.getElementById("AccountObjectsUsageLimit").innerHTML = response["objects"]["limit"];
	
			document.getElementById("AccountBandwidthUsage").innerHTML = (response["bandwidth"]["usage"] / 1000000000).toFixed(2) + " GB";
			document.getElementById("AccountBandwidthPercent").innerHTML = response["bandwidth"]["used_percent"] + "%";
			document.getElementById("AccountBandwidthProgressBar").style.width = response["bandwidth"]["used_percent"] + "%";
			document.getElementById("AccountBandwidthLimit").innerHTML = (response["bandwidth"]["limit"] / 1000000000).toFixed(2) + " GB";
	
			document.getElementById("AccountStorageUsage").innerHTML = (response["storage"]["usage"] / 1000000000).toFixed(2) + " GB";
			document.getElementById("AccountStoragePercent").innerHTML = response["storage"]["used_percent"] + "%";
			document.getElementById("AccountStorageProgressBar").style.width = innerHTML = response["storage"]["used_percent"] + "%";
			document.getElementById("AccountStorageLimit").innerHTML = (response["storage"]["limit"] / 1000000000).toFixed(2) + " GB";
	
			document.getElementById("AccountImageMaxSize").innerHTML = response["media_limits"]["image_max_size_bytes"];
			document.getElementById("AccountVideoMaxSize").innerHTML = response["media_limits"]["video_max_size_bytes"];
			document.getElementById("AccountRawMaxSize").innerHTML = response["media_limits"]["raw_max_size_bytes"];
			document.getElementById("AccountImageMaxPx").innerHTML = response["media_limits"]["image_max_px"];
			document.getElementById("AccountAssetMaxTotalPx").innerHTML = response["media_limits"]["asset_max_total_px"];
	
			backgroundAppear();
			document.getElementById("Account").classList.add("appear");
		});
	}
}

// Toggle upload section
function toggleUploadSection() {
	if (document.getElementById("Upload").classList.contains("appear")) {
		backgroundHide();
		document.getElementById("Upload").classList.remove("appear");		
	}else {
		backgroundAppear();
		document.getElementById("Upload").classList.add("appear");
	}
}

// Toggle create a playlist
function toggleCreatePlaylist() {
	var CreatePlaylistSidebar = document.getElementById("CreatePlaylistSidebar");
	if (CreatePlaylistSidebar.dataset.isActive == "true") {

		hideAdd();
		return;

	}else {
		// If elements with edit or delete's class exists then delete them
		var editElements = Object.values(document.getElementsByClassName("edit"));
		var deleteElements = Object.values(document.getElementsByClassName("delete"));
		if (editElements.length != 0) {
			editElements.forEach(element => element.remove());
		}else if (deleteElements.length != 0){
			deleteElements.forEach(element => element.remove());
		}

		// Creating the Add element & add it to the music's parent
		var libraryChildren = document.getElementById("LibraryObjects").children;
		for (var i = 0; i < libraryChildren.length; i++) (function(i){
			var li = document.createElement("li");
			li.classList.add("add");
			li.id = "Add" + i;  
			var parent = libraryChildren[i];
			var child = parent.children[0];
			parent.insertBefore(li, child);
			
			// Add the event on this add's click
			document.getElementById("Add" + i).addEventListener("click", function(){
				addToPlaylist(i)
			}, false);
		})(i)

		var sidebarList = document.getElementById("SidebarList");

		// Create the li element for input playlist name
		var listPlaylistName = document.createElement("li");
		listPlaylistName.id = "PlaylistNameElement"
		sidebarList.appendChild(listPlaylistName);
		
		// Create the input element for playlist name
		var playlistName = document.createElement("input");
		playlistName.id = "PlaylistName";
		playlistName.setAttribute("type", "text");
		playlistName.setAttribute("placeholder", "Nom de la Playlist");
		playlistName.classList.add("playlist-name");
		listPlaylistName.appendChild(playlistName);
		
		// Create the li element for the input playlist create 
		var listElement = document.createElement("li");
		listElement.id = "PlaylistButtonElement"
		sidebarList.appendChild(listElement);
		
		// Create the input element for playlist create
		var buttonCreatePlaylist = document.createElement("input");
		buttonCreatePlaylist.id = "ButtonCreatePlaylist";
		buttonCreatePlaylist.setAttribute("type", "submit");
		buttonCreatePlaylist.addEventListener("click", sendPlaylist, false);
		buttonCreatePlaylist.classList.add("button-create-playlist");
		buttonCreatePlaylist.value = "Créer la Playlist";
		listElement.appendChild(buttonCreatePlaylist);

		CreatePlaylistSidebar.dataset.isActive = "true";
		
	}
}

// Toggle edit on musics
function toggleEdit() {
	// If elements with edit's class exists then delete them & quit
	var editElements = Object.values(document.getElementsByClassName("edit"));
	if (editElements.length != 0) {
		editElements.forEach(element => element.remove());
		return;
	}else {
		// If elements with delete, add or check class exists then delete them
		var deleteElements = Object.values(document.getElementsByClassName("delete"));
		var addElements = Object.values(document.getElementsByClassName("add"));
		var checkElements = Object.values(document.getElementsByClassName("check"));
		if (deleteElements.length != 0) {
			deleteElements.forEach(element => element.remove());
		}else if (addElements.length != 0 || checkElements.length != 0) {
			hideAdd();
		}

		// Create the edit elements
		var libraryChildren = document.getElementById("LibraryObjects").children;
		for (var i = 0; i < libraryChildren.length; i++) (function(i){
			var li = document.createElement("li");
			li.classList.add("edit");
			li.id = "Edit" + i;
			var parent = libraryChildren[i];
			var child = parent.children[0];
			parent.insertBefore(li, child);

			// Add the event on this delete's click
			document.getElementById("Edit" + i).onclick = function () {
				showEditSection(i);
			};
			
		})(i)
	}
}

// Toggle delete on musics
function toggleDelete() {
	// If elements with edit's class exists then delete them & quit
	var deleteElements = Object.values(document.getElementsByClassName("delete"));
	if (deleteElements.length != 0) {
		deleteElements.forEach(element => element.remove());
		return;
	}else {
		// If elements with delete, add or check class exists then delete them
		var editElements = Object.values(document.getElementsByClassName("edit"));
		var addElements = Object.values(document.getElementsByClassName("add"));
		var checkElements = Object.values(document.getElementsByClassName("check"));
		if (editElements.length != 0) {
			editElements.forEach(element => element.remove());
		}else if (addElements.length != 0 || checkElements.length != 0) {
			hideAdd();
		}

		// Create the Delete elements & add it to the music's parent
		var libraryChildren = document.getElementById("LibraryObjects").children;
		for (var i = 0; i < libraryChildren.length; i++) (function(i){
			var li = document.createElement("li");
			li.classList.add("delete");
			li.id = "Delete" + i;    
			var parent = libraryChildren[i];
			var child = parent.children[0];
			parent.insertBefore(li, child);
		
			// Add the event on this delete's click
			document.getElementById("Delete" + i).onclick = function () {
			  showDeleteSection(i);
			};
			
		})(i)
	}
}

// Toggle help section
function toggleHelpSection() {
	if (document.getElementById("Help").classList.contains("appear")) {
		backgroundHide();
		document.getElementById("Help").classList.remove("appear");		
	}else {
		backgroundAppear();
		document.getElementById("Help").classList.add("appear");
	}
}

// Toggle playlist section
function togglePlaylistSection() {
	var DivPlaylist = document.getElementById("DivPlaylist");
	
	// Check if DivPlaylist is already open to close it if needed
	if (checkPlaylistSection()) {
		return;
	}else {
		// If DivPlaylist is not open then call all the playlists
		fetch(server + "/functions/playlists/getAllPlaylists.php")
		.then((response) => response.json())
		.then(function (response) {
			
			if (response.length != 0) {
			  DivPlaylist.innerHTML = "";
			  DivPlaylist.classList.remove("playlist-div-hide");
			  DivPlaylist.classList.add("playlist-div");
  
			  var ul = document.createElement("ul");
			  ul.id = "ListPlaylist";
			  ul.className = "listPlaylist";
			  DivPlaylist.appendChild(ul);
  
			  for (var i = 0; i < response.length; i++) (function(i) {
				  li = document.createElement("li");
				  ul.appendChild(li);
				  li.className = "table";
				  li.id = "PlaylistElement" + i;
				  li.dataset.name = response[i]["playlist_name"];
				  li.dataset.id = response[i]["playlist_id"];
				  document.getElementById("PlaylistElement" + i).addEventListener("click", function(){
					  openPlaylist("PlaylistElement" + i);
				  }, false);
		  
				  var p = document.createElement("p");
				  li.appendChild(p);
				  p.innerHTML = response[i]["playlist_name"];
				  p.id = "PlaylistText" + i;
			  })(i);
			}
		});
	}
}