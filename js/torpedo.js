function Torpedo(game, x, y){
	this.game = game;
	this.x = x;
	this.y = y;
	this.count = 0;
}

Torpedo.prototype= {
	create: function() {
			this.object = this.game.add.sprite(this.x + 70, this.y + 20, 'torpedo');
			this.object.scale.setTo(0.5, 0.5);
			this.object.anchor.setTo(0.5, 0.5);
			this.game.physics.arcade.enable(this.object);
			this.object.body.velocity.x = 200;
			this.object.classSrc = this;
	},

	update: function() {
		// this.count++;
		// if(this.count > 200){
			// this.object.destroy();
		// }
	},

	getY: function() {
		return this.object.y;
	},

	getX: function() {
		return this.object.x;
	},
	
	getObject: function() {
		return this.object;
	}
}