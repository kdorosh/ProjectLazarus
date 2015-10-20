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
    this.load.audio('menumusic', 'assets/audio/menu.mp3');
    this.load.audio('gamemusic', 'assets/audio/game.mp3');
    this.load.audio('gameover', 'assets/audio/lost.mp3');
	this.load.audio('lazer', 'assets/audio/lazer.mp3');
  this.load.audio('reap', 'assets/audio/reaper.mp3')
	
    this.load.tilemap('level1', 'assets/tilemaps/level2.json', null, Phaser.Tilemap.TILED_JSON);//was level1
    this.load.image('gameTiles', 'assets/images/tiles_spritesheet.png');
	this.load.image('bgTiles', 'assets/images/game_bg.jpg');
	this.load.image('bgTilesFlipped', 'assets/images/game_bgFlipped.jpg');
	
  this.load.image('explosion', 'assets/images/explosion.png');
	this.load.image('normandy', 'assets/images/normandy.png');
	this.load.image('play','assets/images/play.png');
	this.load.image('gameOver','assets/images/gameOverMessage.png');
	this.load.image('gameTiles2','assets/images/robotTile20x20.jpg');
	this.load.image('torpedo', 'assets/images/torpedo.png');
	this.load.image('menuText', 'assets/images/MenuText.png');
	this.load.image('menuBG', 'assets/images/menu_bg.jpg');

	this.load.image('reaper', 'assets/images/reaper.png');
  },
  create: function() {
    this.state.start('StageSelect');
  }
};