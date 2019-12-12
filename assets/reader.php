<link rel="stylesheet" href="<?php echo $link ?>/styles/readerStyle.css">
<section id="audio-player">
  <ul>
    <li>
      <p id="songName"></p>
    </li>
    <li>
      <div id="controls">
        <img onclick="playPreviousSong()" src="../img/back.png" alt="">
        <i id="play" class="fa fa-pause"></i>
        <img onclick="playNextSong()" src="../img/skip.png" alt="">
        <span id="start" class="time">00:00</span>
        <input type="range" min="0" max="100" value="0" id="progress-bar" name="" value="">
        <span id="time" class="time">00:00</span>
        <i id="mute" class="fa fa-volume-up"></i>
        <input type="range" min="0" max="100" value="75" id="Volume" name="" value="">
      </div>
    </li>
  </ul>
</section>
