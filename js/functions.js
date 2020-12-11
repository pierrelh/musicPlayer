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
function playPause() {
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

// Handle the play of the next music asked by the user
function playNextMusic(isSkiped) {
    var isRandom = document.getElementById("Random").dataset.random; // Getting the random setting
    var playedMusicId = document.getElementById("MusicPlayer").dataset.musicPlayed; // Getting the id of the played music
    var loop = document.getElementById("Loop").dataset.loop; // Getting the loop setting

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