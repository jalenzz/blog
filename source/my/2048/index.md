---
title: 2048
---
<link rel="stylesheet" href="css/reset.min.css">
<link rel="stylesheet" href="css/style.css">
<div class="container">
	<div class="scores">
		<div class="score-container best-score">
			最佳:
			<div class="score">
				<div id="bestScore">0</div>
			</div>
		</div>
		<div class="score-container">
			分数:
			<div class="score">
				<div id="score">0</div>
				<div class="add" id="add"></div>
			</div>
		</div>
	</div>
	<div class="game">
		<div id="tile-container" class="tile-container"></div>
		<div class="end" id="end">游戏结束<div class="monkey">🙈</div><button
				class="btn not-recommended__item js-restart-btn" id="try-again">再试一次</button></div>
	</div>
	<div class="not-recommended">
		<button class="btn not-recommended__item js-restart-btn" id="restart">重新启动游戏</button>
		<span class="not-recommended__annotation"></span>
	</div>
</div>
<script src="js/index.js"></script>