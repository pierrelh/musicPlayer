if ('mediaSession' in navigator) {
    navigator.mediaSession.metadata = new MediaMetadata({
      title: '',
      artist: '',
      album: '',
      artwork: [
        { src: '',   sizes: '',   type: '' }
        // { src: 'https://dummyimage.com/128x128', sizes: '128x128', type: 'image/png' },
        // { src: 'https://dummyimage.com/192x192', sizes: '192x192', type: 'image/png' },
        // { src: 'https://dummyimage.com/256x256', sizes: '256x256', type: 'image/png' },
        // { src: 'https://dummyimage.com/384x384', sizes: '384x384', type: 'image/png' },
        // { src: 'https://dummyimage.com/512x512', sizes: '512x512', type: 'image/png' },
      ]
    });
  
    navigator.mediaSession.setActionHandler('play', function() { console.log("Play")});
    navigator.mediaSession.setActionHandler('pause', function() { console.log("Pause") });
    navigator.mediaSession.setActionHandler('stop', function() { console.log("Stop") });
    navigator.mediaSession.setActionHandler('seekbackward', function() { console.log("SeekBackward") });
    navigator.mediaSession.setActionHandler('seekforward', function() { console.log("SeekForward") });
    navigator.mediaSession.setActionHandler('seekto', function() { console.log("SeekTo") });
    navigator.mediaSession.setActionHandler('previoustrack', function() { console.log("PreviousTrack") });
    navigator.mediaSession.setActionHandler('nexttrack', function() { console.log("NextTrack") });
    navigator.mediaSession.setActionHandler('skipad', function() { console.log("SkipPad") });
}