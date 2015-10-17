var SideScroller = SideScroller || {};

SideScroller.StageSelect = function(){};

SideScroller.StageSelect.prototype = {
  StageSelect: function() {

  },
  create: function() {
	var playButton = this.game.add.button(460, 320, 'play', this.playGame, this);
	playButton.anchor.setTo(0.5,0.5);
	playButton.scale.setTo(.3, .3);
    
  },
  playGame: function() {
	this.state.start('Game');
  }
};