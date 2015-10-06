var boot = function(game){
	//logs information in the console (used for altering game and debugging)
	console.log("%Initializing Project Lazarus", "color:")
};

boot.prototype = {
	preload: function(){
		//has the loading screen (for the title screen)
		this.game.load.image("loading","imgs/loading.png");
	},
	create: function(){
		//Functions to set the size and scale of the game
		this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
		this.scale.pageAlighHorizontally = true;
		this.scale.setScreenSize();
		//function to prelaod all of the assets to be used in the game. Directs
		//to preload.js
		this.game.state.start("Preload");
	}
}