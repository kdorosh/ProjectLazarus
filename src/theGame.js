var theGame = function(game){ this.game = game }

var normandy;
var reapers;
var wasd;

theGame.prototype = {
	preload: function() {
		this.game.load.image('normandy', 'imgs/normandy.png');
		this.game.load.image('reaper', 'imgs/reaper.png');
		this.game.load.image("loseGameButton","imgs/loseGameButton.png");
		this.game.load.image("bg", "imgs/game_bg.jpg");
	},

	create: function() {
		this.game.physics.startSystem(Phaser.Physics.ARCADE);

		this.game.add.tileSprite(0, 0, 800, 600, 'bg');
		
		normandy = new Normandy(this.game);
		normandy.createPlayer();
		
		reapers = new Reapers(this.game);
		reapers.create();
		
		this.cursors = this.game.input.keyboard.createCursorKeys();
		wasd = {
			up: this.game.input.keyboard.addKey(Phaser.Keyboard.W),
			down: this.game.input.keyboard.addKey(Phaser.Keyboard.S),
			left: this.game.input.keyboard.addKey(Phaser.Keyboard.A),
			right: this.game.input.keyboard.addKey(Phaser.Keyboard.D),
		};
		
		var loseGameButton = this.game.add.button(460, 420, "loseGameButton", this.gameOver, this);
		loseGameButton.anchor.setTo(0.5,0.5);
		loseGameButton.scale.setTo(.3, .3);
	},

	update: function() {
		normandy.update(wasd);
		reapers.update();
	},

	render: function() {
	   
	},
	
	gameOver: function(){
		this.game.state.start("GameOver");
	}
}