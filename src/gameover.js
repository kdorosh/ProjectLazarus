var gameOver = function(game){ }

gameOver.prototype = {
	preload: function() {
		this.game.load.image("gameOver","imgs/gameOver.png");
	},
	create: function(){
		//var gameOverTitle = (the game over screen)
		var gameOverButton = this.game.add.button(160,320,"gameOver",this.goToMainMenu,this);
		gameOverButton.anchor.setTo(0.5, 0.5);
		gameOverButton.scale.setTo(.3, .3);
	},
	goToMainMenu: function(){
		this.game.state.start("TitleScreen");
	}
}