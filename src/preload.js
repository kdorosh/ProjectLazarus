var preload = function(game) {}

preload.prototype = {
	preload: function() {
		//cretes a loading bar
		var loadingBar = this.add.sprite(160, 240,"loading");
		loadingBar.anchor.setTo(0.5,0.5);
		this.load.setPreloadSprite(loadingBar);
		//in here we load all the assets we will be using to make the game
		this.game.load.image("blahblah","img.blahblah.png");
		//etc. etc. etc. etc.
	},
	create: function(){
		// will start the game title function
		this.game.state.start(GameTitle);
	}
}