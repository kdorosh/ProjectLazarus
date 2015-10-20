var game;

function Torpedoes(g){
	game = g;
	return game.add.group();
}

function createTorpedo(x, y, camVel) {
	var torpedo = game.add.sprite(x + 70, y - 10, 'torpedo');
	torpedo.dist = 0;
	torpedo.scale.setTo(0.5, 0.5);
	torpedo.anchor.setTo(0.5, 0.5);
	game.physics.arcade.enable(torpedo);
	torpedo.velocity.x = 3000 + camVel;
	return torpedo;
}

function updateTorpedoes(torpedoes) {
	torpedoes.forEach(function(torpedo){
		torpedo.dist++;
		if (torpedo.dist == 10) {
			 torpedo.destroy();
		}
	}, this);
}