var SideScroller = SideScroller || {};

SideScroller.StageSelect = function(){};

SideScroller.StageSelect.prototype = {
  StageSelect: function() {

  },
  create: function() {
	  
	var menuText = this.game.add.sprite(20, 10, 'menuText');
	menuText.scale.setTo(.5, .5);
	var nebula = this.game.add.sprite(550, 130, 'menuNebula');
	nebula.scale.setTo(.2, .2);
	  
	var playButton = this.game.add.button(460, 320, 'play', this.playGame, this);
	playButton.anchor.setTo(0.5,0.5);
	playButton.scale.setTo(.3, .3);
    
  },
  playGame: function() {
	this.state.start('Game');
  }
};