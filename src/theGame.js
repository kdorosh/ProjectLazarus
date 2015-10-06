var theGame = function(game){ this.game = game }

theGame.prototype = {
	preload: function() {
		this.game.load.image('normandy', 'imgs/normandy.png');
		this.game.load.image("loseGameButton","imgs/loseGameButton.png");
	},

	create: function() {
		this.game.physics.startSystem(Phaser.Physics.ARCADE);

		var normandy = new Normandy(this.game);
		normandy.createPlayer();
		
		var loseGameButton = this.game.add.button(460, 420, "loseGameButton", this.gameOver, this);
		loseGameButton.anchor.setTo(0.5,0.5);
		loseGameButton.scale.setTo(.3, .3);
	},

	update: function() {


	},

	render: function() {
	   

	},
	
	gameOver: function(){
		this.game.state.start("GameOver");
		//i will finish late
	}
}