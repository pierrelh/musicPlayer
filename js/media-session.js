if ('mediaSession' in navigator) {
    
    // Handle the play action on mediaSession
    navigator.mediaSession.setActionHandler('play', function() {
        togglePlayPause();
    });

    // Handle the pause action on mediaSession
    navigator.mediaSession.setActionHandler('pause', function() {
        togglePlayPause();
    });

    // Handle the stop action on mediaSession
    navigator.mediaSession.setActionHandler('stop', function() {
        console.log("Stop");
    });

    // Handle the seekbackward action on mediaSession
    navigator.mediaSession.setActionHandler('seekbackward', function() {
        seekBackward();
    });

    // Handle the seekforward action on mediaSession
    navigator.mediaSession.setActionHandler('seekforward', function() {
        seekForward();
    });

    // Handle the seekto action on mediaSession
    navigator.mediaSession.setActionHandler('seekto', function() {
        console.log("SeekTo");
    });

    // Handle the previoustrack action on mediaSession
    navigator.mediaSession.setActionHandler('previoustrack', function() { 
        playLastMusic();
    });

    // Handle the nexttrack action on mediaSession
    navigator.mediaSession.setActionHandler('nexttrack', function() {
        playNextMusic();
    });

    // Handle the skipad action on mediaSession
    navigator.mediaSession.setActionHandler('skipad', function() {
        console.log("SkipPad");
    });
}