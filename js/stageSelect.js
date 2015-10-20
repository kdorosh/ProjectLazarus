var SideScroller = SideScroller || {};

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
	//var nebula = this.game.add.sprite(550, 130, 'menuNebula');
	//nebula.scale.setTo(.2, .2);
	
	alert('about to button');
	var playButton = this.game.add.button(this.game.world.centerX, this.game.world.centerY, 'play', this.playGame, this);
	alert(playButton);
	playButton.anchor.setTo(0.5,0.5);
	playButton.scale.setTo(.3, .3);
    
  },
  
  playGame: function() {
  	this.music.stop();
	this.state.start('Game');
  }
};