<link rel="stylesheet" href="<?php echo $rootURL ?>/styles/common/readerStyle.css?cachev=<?php echo $cacheVersion ?>">
<link rel="stylesheet" href="<?php echo $rootURL ?>/styles/screen/readerStyle.css?cachev=<?php echo $cacheVersion ?>">
<link rel="stylesheet" href="<?php echo $rootURL ?>/styles/handheld/readerStyle.css?cachev=<?php echo $cacheVersion ?>">
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.7.0/font/bootstrap-icons.css">
<section class="hidden">
	<audio autoplay controls id="MusicPlayer"></audio>
</section>
<section id="AudioPlayer">
	<p id="MusicName"></p>
	<section id="Controls">
		<button	id="Loop" class="reader-buttons"><img id="LoopIMG" src="<?php echo $rootURL ?>/img/loop.png" alt="Loop"></button>
		<button	id="Previous" class="reader-buttons"><img id="PreviousIMG" src="<?php echo $rootURL ?>/img/back.png" alt="Previous"></button>
		<button	id="PlayPause" class="reader-buttons"><img id="PlayPauseIMG" src="<?php echo $rootURL ?>/img/pause.png" alt="Play"></button>
		<button	id="Next" class="reader-buttons"><img id="NextIMG" src="<?php echo $rootURL ?>/img/skip.png" alt="Next"></button>
		<span	id="CurrentTime">00:00</span>
		<input	id="ProgressBar" type="range" min="0" max="100" value="0">
		<span	id="EndTime">00:00</span>
		<button	id="Random" class="reader-buttons"><i id="RandomIMG" class="bi bi-shuffle"></i></button>
		<button	id="Mute" class="reader-buttons"><img id="MuteIMG" src="<?php echo $rootURL ?>/img/audio-on.png" alt="Mute"></button>
		<input	id="Volume" type="range" min="0" max="100" value="100">
		<button	id="PlaylistBtn" class="reader-buttons"><img src="<?php echo $rootURL ?>/img/playlist.png" alt="playlist"></button>
	</section>
</section>
<script type="text/javascript" src="<?php echo $rootURL ?>/scripts/reader.js?cachev=<?php echo $cacheVersion ?>"></script>