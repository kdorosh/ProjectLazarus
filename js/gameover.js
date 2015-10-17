var SideScroller = SideScroller || {};

SideScroller.GameOver = function(){};

SideScroller.GameOver.prototype = {
  GameOver: function() {

  },
  create: function() {
	var gameOverButton = this.game.add.button(160,320,'gameOver',this.goToMainMenu,this);
	gameOverButton.anchor.setTo(0.5, 0.5);
	gameOverButton.scale.setTo(.3, .3);
    
  },
  goToMainMenu: function() {
	this.state.start('StageSelect');
  }
};