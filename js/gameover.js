var SideScroller = SideScroller || {};

SideScroller.GameOver = function(){};

SideScroller.GameOver.prototype = {
  GameOver: function() {

  },
  create: function() {
  this.music = this.game.add.audio('gameover');
  this.music.play();
	var gameOverButton = this.game.add.button(360,240,'gameOver',this.goToMainMenu,this);
	gameOverButton.anchor.setTo(0.5, 0.5);
	gameOverButton.scale.setTo(1, 1);
    
  },
  goToMainMenu: function() {
  this.music.stop();
	this.state.start('StageSelect');
  }
};