if ('mediaSession' in navigator) {
    
    // Handle the play action on mediaSession
    navigator.mediaSession.setActionHandler('play', togglePlayPause, false);

    // Handle the pause action on mediaSession
    navigator.mediaSession.setActionHandler('pause', togglePlayPause, false);

    // Handle the stop action on mediaSession
    navigator.mediaSession.setActionHandler('stop', stopMusic, false);

    // Handle the seekbackward action on mediaSession
    navigator.mediaSession.setActionHandler('seekbackward', seekBackward, false);

    // Handle the seekforward action on mediaSession
    navigator.mediaSession.setActionHandler('seekforward', seekForward, false);

    // Handle the seekto action on mediaSession
    navigator.mediaSession.setActionHandler('seekto', seekTo, false);

    // Handle the previoustrack action on mediaSession
    navigator.mediaSession.setActionHandler('previoustrack', playLastMusic, false);

    // Handle the nexttrack action on mediaSession
    navigator.mediaSession.setActionHandler('nexttrack', playNextMusic, false);
}