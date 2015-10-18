var SideScroller = SideScroller || {};

//loading the game assets
SideScroller.Preload = function(){};

SideScroller.Preload.prototype = {
  preload: function() {
    //show loading screen
    this.preloadBar = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'preloadbar');
    this.preloadBar.anchor.setTo(0.5);
    this.preloadBar.scale.setTo(3);

    this.load.setPreloadSprite(this.preloadBar);

    //load game assets
    this.load.tilemap('level1', 'assets/tilemaps/demo3.json', null, Phaser.Tilemap.TILED_JSON);//was level1
    this.load.image('gameTiles', 'assets/images/tiles_spritesheet.png');
    //this.load.image('player', 'assets/images/player.png');
	
	this.load.image('normandy', 'assets/images/normandy.png');
	this.load.image('play','assets/images/play.png');
	this.load.image('gameOver','assets/images/gameOver.png');
	this.load.image('gameTiles2','assets/images/robotTile20x20.jpg');
	this.load.image('torpedo', 'assets/images/torpedo.png');
	
    this.load.image('playerDuck', 'assets/images/player_duck.png'); // later remove
    this.load.image('playerDead', 'assets/images/player_dead.png'); // later remove
    this.load.image('goldCoin', 'assets/images/goldCoin.png');
	this.load.image('enemy', 'assets/images/reaper.png');
    this.load.audio('coin', ['assets/audio/coin.ogg', 'assets/audio/coin.mp3']);
  },
  create: function() {
    this.state.start('StageSelect');
  }
};