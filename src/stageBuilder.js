var stageBuilder = function(game){ this.game = game }

stageBuilder.prototype = {
	preload: function() {
		this.game.load.image("stageBuilderButton","imgs/stageBuilderButton.png");
	},

	create: function() {
		var stageBuilderButton = this.game.add.button(460, 420, "stageBuilderButton", this.goToMainMenu, this);
		stageBuilderButton.anchor.setTo(0.5,0.5);
		stageBuilderButton.scale.setTo(.3, .3);
	},

	update: function() {


	},

	render: function() {
	   

	},
	
	goToMainMenu: function(){
		this.game.state.start("TitleScreen");
	}
}