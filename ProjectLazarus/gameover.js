var gameOver = function(game){ }

gameOver.prototype = {
	create: function(){
		//var gameOverTitle = (the game over screen)
		var playButton = this.game.add.button(160,320,"play",this.play_game,this);
		playButton.anchor.setTo(0.5, 0.5);
	},
	playTheGame: function(){
		this.game.state.start("TheGame");
	}
}