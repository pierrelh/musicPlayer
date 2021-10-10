<link rel="stylesheet" href="<?php echo $link ?>/styles/common/readerStyle.css?cachev=<?php echo $cacheVersion ?>">
<link rel="stylesheet" href="<?php echo $link ?>/styles/screen/readerStyle.css?cachev=<?php echo $cacheVersion ?>">
<link rel="stylesheet" href="<?php echo $link ?>/styles/handheld/readerStyle.css?cachev=<?php echo $cacheVersion ?>">
<section class="hidden">
	<audio autoplay controls id="MusicPlayer"></audio>
</section>
<section id="AudioPlayer">
	<div id="Controls">
		<p id="MusicName"></p>
		<ul>
			<li>
				<button	id="Loop" class="reader-buttons">
					<img id="LoopIMG" src="<?php echo $link ?>/img/loop.png" alt="Loop">
				</button>
			</li>
			<li id="AudioControllers">
				<ul>
					<li>
						<button	id="Previous" class="reader-buttons">
							<img id="PreviousIMG" src="<?php echo $link ?>/img/back.png" alt="Previous">
						</button>
					</li>
					<li>
						<button	id="PlayPause" class="reader-buttons">
							<img id="PlayPauseIMG" src="<?php echo $link ?>/img/pause.png" alt="Play">
						</button>
					</li>
					<li>
					<button	id="Next" class="reader-buttons">
						<img id="NextIMG" src="<?php echo $link ?>/img/skip.png" alt="Next">
					</button>
					</li>
				</ul>
			</li>
			<li id="TimeControllers">
				<ul>
					<li>
						<span id="CurrentTime" class="current-time">00:00</span>
					</li>
					<li>
						<input id="ProgressBar" type="range" min="0" max="100" value="0">
					</li>
					<li>
						<span id="EndTime" class="time total-time">00:00</span>
					</li>
				</ul>
			</li>
			<li>
				<button id="Random" class="reader-buttons">
					<img id="RandomIMG" src="<?php echo $link ?>/img/no-random.png" alt="Random">
				</button>
			</li>
			<li>
				<ul>
					<li>
						<button id="Mute" class="reader-buttons">
							<img id="MuteIMG" src="<?php echo $link ?>/img/audio-on.png" alt="Mute">
						</button>
					</li>
					<li>
						<input id="Volume" type="range" min="0" max="100" value="100">
					</li>
				</ul>
			</li>
			<li>
				<button id="PlaylistBtn" class="reader-buttons"><img src="<?php echo $link ?>/img/playlist.png" alt="playlist"></button>
			</li>
		</ul>
	</div>
</section>
<script type="text/javascript" src="<?php echo $link ?>/scripts/reader.js?cachev=<?php echo $cacheVersion ?>"></script>