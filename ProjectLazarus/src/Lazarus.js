var gameTitle = function(game){}

gameTitle.prototype = {
	create: function() {
		var gameTitle = this.game.add.sprite(160,160,"gametitle");//the title img/sprite of the game 
		gameTitle.anchor.setTo(0.5,0.5);
		//adds the start button for the game
		var playButton = this.game.add.button(160,320,"play",this.playGame,this);
		playButton.anchor.setTo(0.5,0.5);
	},
	playTheGame: function(){
		this.game.state.start("TheGame");
		//i will finish late
	}
}