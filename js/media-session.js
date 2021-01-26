if ('mediaSession' in navigator) {
    
    // Handle the play action on mediaSession
    navigator.mediaSession.setActionHandler("play", togglePlayPause);

    // Handle the pause action on mediaSession
    navigator.mediaSession.setActionHandler("pause", togglePlayPause);

    // Handle the stop action on mediaSession
    navigator.mediaSession.setActionHandler("stop", stopMusic);

    // Handle the seekbackward action on mediaSession
    navigator.mediaSession.setActionHandler("seekbackward", seekBackward);

    // Handle the seekforward action on mediaSession
    navigator.mediaSession.setActionHandler("seekforward", seekForward);

    // Handle the seekto action on mediaSession
    navigator.mediaSession.setActionHandler("seekto", seekTo);

    // Handle the previoustrack action on mediaSession
    navigator.mediaSession.setActionHandler("previoustrack", playLastMusic);

    // Handle the nexttrack action on mediaSession
    navigator.mediaSession.setActionHandler("nexttrack", playNextMusic);
}