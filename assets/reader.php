<link rel="stylesheet" href="<?php echo $link ?>/styles/common/readerStyle.css">
<link rel="stylesheet" href="<?php echo $link ?>/styles/screen/readerStyle.css">
<link rel="stylesheet" href="<?php echo $link ?>/styles/handheld/readerStyle.css">
<section id="audio-player" class="left">
  <p id="songName"></p>
  <section id="controls">
    <img id="Loop" data-loop="all" class="reader-buttons loop" src="../../img/loop.png" alt="loop"><!-- @whitespace
    --><img id="Previous" class='reader-buttons' src="../img/back.png" alt=""><!-- @whitespace
    --><img id="PlayPause" data-is-playing="true" class="reader-buttons" src="../../img/pause.png" alt="play"><!-- @whitespace
    --><img id="Next" class='reader-buttons' src="../img/skip.png" alt=""><!-- @whitespace
    --><span id="start" class="time">00:00</span><!-- @whitespace
    --><input type="range" min="0" max="100" value="0" id="progress-bar" name="" value=""><!-- @whitespace
    --><span id="time" class="time">00:00</span><!-- @whitespace
    --><img id="Random" data-random="false" class="reader-buttons random" src="../../img/no-random.png" alt="random"><!-- @whitespace
    --><img id="Mute" data-mute="false" data-volume="1" class="reader-buttons" src="../../img/audio-on.png" alt=""><!-- @whitespace
    --><input type="range" min="0" max="100" value="100" id="Volume" name="" value="">
  </section>
</section>
<script type="text/javascript" src="<?php echo $link ?>/js/reader.js"></script>
