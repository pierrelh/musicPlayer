<link rel="stylesheet" href="<?php echo $link ?>/styles/common/readerStyle.css">
<link rel="stylesheet" href="<?php echo $link ?>/styles/screen/readerStyle.css">
<link rel="stylesheet" href="<?php echo $link ?>/styles/handheld/readerStyle.css">
<section class="hidden">
	<audio autoplay controls id="MusicPlayer"></audio>
</section>
<section id="AudioPlayer" class="left">
	<p id="MusicName"></p>
	<section id="Controls">
		<button	id="Loop"><img id="LoopIMG" class="reader-buttons loop" src="<?php echo $link ?>/img/loop.png" alt="Loop"></button>
		<button	id="Previous"><img id="PreviousIMG" class='reader-buttons' src="<?php echo $link ?>/img/back.png" alt="Previous"></button>
		<button	id="PlayPause"><img id="PlayPauseIMG" class="reader-buttons play" src="<?php echo $link ?>/img/pause.png" alt="Play"></button>
		<button	id="Next"><img id="NextIMG" class='reader-buttons' src="<?php echo $link ?>/img/skip.png" alt="Next"></button>
		<span	id="CurrentTime" class="time current-time">00:00</span>
		<input	id="ProgressBar" type="range" min="0" max="100" value="0">
		<span	id="EndTime" class="time total-time">00:00</span>
		<button	id="Random"><img id="RandomIMG" class="reader-buttons" src="<?php echo $link ?>/img/no-random.png" alt="Random"></button>
		<button	id="Mute"><img id="MuteIMG" class="reader-buttons mute" src="<?php echo $link ?>/img/audio-on.png" alt="Mute"></button>
		<input	id="Volume" type="range" min="0" max="100" value="100">
		<button	id="PlaylistBtn"><img class="reader-buttons playlist-button" src="<?php echo $link ?>/img/playlist.png" alt="playlist"></button>
	</section>
</section>
