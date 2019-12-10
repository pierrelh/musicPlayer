<link rel="stylesheet" href="<?php echo $link ?>/styles/readerStyle.css">
<section id="audio-player">
  <ul>
    <li>
      <p id="songName"></p>
    </li>
    <li>
      <div id="controls">
        <i id="play" class="fa fa-pause"></i>
        <span id="start" class="time">00:00</span>
        <div id="progressbar"></div>
        <span id="time" class="time">00:00</span>
        <i id="mute" class="fa fa-volume-up"></i>
        <input type="range" min="0" max="100" value="75" id="Volume" name="" value="">
        <!-- <div id="volume"></div> -->
      </div>
    </li>
  </ul>
</section>
