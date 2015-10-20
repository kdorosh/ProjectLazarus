var SideScroller = SideScroller || {};
var whichMap = 1;

SideScroller.StageSelect = function(){};

SideScroller.StageSelect.prototype = {
  StageSelect: function() {

  },
  create: function() {
	this.music=this.game.add.audio('menumusic');
	this.music.play();  
	var menuBG = this.game.add.sprite(0, 0, 'menuBG');
	menuBG.scale.setTo(.8, .8);
	
	var menuText = this.game.add.sprite(20, 10, 'menuText');
	menuText.scale.setTo(.5, .5);
	
	var playButton = this.game.add.button(400, 250, 'play', this.playGame1, this);
	playButton.anchor.setTo(0.5,0.5);
	playButton.scale.setTo(.3, .3);
	
	var playButton = this.game.add.button(400, 350, 'play', this.playGame2, this);
	playButton.anchor.setTo(0.5,0.5);
	playButton.scale.setTo(.3, .3);
  },
  
  playGame1: function() {
	whichMap = 1;
  	this.music.stop();
	this.state.start('Game', whichMap);
  },
  playGame2: function() {
	whichMap = 2;
  	this.music.stop();
	this.state.start('Game', whichMap);
  },
};