<link rel="stylesheet" href="<?php echo $link ?>/styles/common/readerStyle.css">
<link rel="stylesheet" href="<?php echo $link ?>/styles/screen/readerStyle.css">
<link rel="stylesheet" href="<?php echo $link ?>/styles/handheld/readerStyle.css">
<section id="audio-player" class="left">
  <ul>
    <li>
      <p id="songName"></p>
    </li>
    <li>
      <div id="controls">
        <img id="Loop" data-loop="all" class="fa-loop" src="../../img/loop.png" alt="loop">
        <img id="Previous" class='previous player-button' src="../img/back.png" alt="">
        <img id="PlayPause" data-is-playing="true" class="fa-pause" src="../../img/pause.png" alt="play">
        <img id="Next" class='next player-button' src="../img/skip.png" alt="">
        <span id="start" class="time">00:00</span>
        <input type="range" min="0" max="100" value="0" id="progress-bar" name="" value="">
        <span id="time" class="time">00:00</span>
        <img id="Random" data-random="false" class="fa-no-random" src="../../img/no-random.png" alt="random">
        <img id="Mute" data-mute="false" data-volume="100" class="fa-volume-up" src="../../img/audio-on.png" alt="">
        <input type="range" min="0" max="100" value="100" id="Volume" name="" value="">
      </div>
    </li>
  </ul>
</section>
<script type="text/javascript" src="<?php echo $link ?>/js/reader.js"></script>
