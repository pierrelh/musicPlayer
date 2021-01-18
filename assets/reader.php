<link rel="stylesheet" href="<?php echo $link ?>/styles/common/readerStyle.css">
<link rel="stylesheet" href="<?php echo $link ?>/styles/screen/readerStyle.css">
<link rel="stylesheet" href="<?php echo $link ?>/styles/handheld/readerStyle.css">
<section id="MediaPlayer">
	<audio autoplay controls id="MusicPlayer">
		<source id="PlayerMPEG" src="" type="audio/mpeg">
	</audio>
</section>
<section id="AudioPlayer" class="left">
	<p id="SongName"></p>
	<section id="Controls">
		<img id="Loop" data-loop="all" class="reader-buttons loop" src="<?php echo $link ?>/img/loop.png" alt="loop"><!-- @whitespace
		--><img id="Previous" class='reader-buttons' src="<?php echo $link ?>/img/back.png" alt=""><!-- @whitespace
		--><img id="PlayPause" class="reader-buttons play" src="<?php echo $link ?>/img/pause.png" alt="play"><!-- @whitespace
		--><img id="Next" class='reader-buttons' src="<?php echo $link ?>/img/skip.png" alt=""><!-- @whitespace
		--><span id="Start" class="time current-time">00:00</span><!-- @whitespace
		--><input type="range" min="0" max="100" value="0" id="ProgressBar" name="" value=""><!-- @whitespace
		--><span id="Time" class="time total-time">00:00</span><!-- @whitespace
		--><img id="Random" data-random="false" class="reader-buttons" src="<?php echo $link ?>/img/no-random.png" alt="random"><!-- @whitespace
		--><img id="Mute" data-mute="false" data-volume="1" class="reader-buttons mute" src="<?php echo $link ?>/img/audio-on.png" alt=""><!-- @whitespace
		--><input type="range" min="0" max="100" value="100" id="Volume" name="" value="">
	</section>
</section>
<script type="text/javascript" src="<?php echo $link ?>/js/reader.js"></script>
