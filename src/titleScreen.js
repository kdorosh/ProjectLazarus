var titleScreen = function(game){}

titleScreen.prototype = {
	preload: function(){
          this.game.load.image("menu","imgs/menu_bg.jpg");
		  this.game.load.image("play","imgs/play.png");
		  this.game.load.image("stageBuilder","imgs/stageBuilder.png");
	},
	create: function() { 
		var titleScreen = this.game.add.sprite(400, 300, "menu");//the title img/sprite of the game 
		titleScreen.anchor.setTo(0.5,0.5);
		titleScreen.scale.setTo(.2, .2);
		//adds the start button for the game
		
		var playButton = this.game.add.button(460, 320, "play", this.playGame, this);
		playButton.anchor.setTo(0.5,0.5);
		playButton.scale.setTo(.3, .3);
		
		var stageBuilderButton = this.game.add.button(460, 420, "stageBuilder", this.stageBuilder, this);
		stageBuilderButton.anchor.setTo(0.5,0.5);
		stageBuilderButton.scale.setTo(.3, .3);
	},
	playGame: function(){
		this.game.state.start("TheGame");
	},
	stageBuilder: function(){
		this.game.state.start("StageBuilder");
	}
}