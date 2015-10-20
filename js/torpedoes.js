var game;

function Torpedoes(g){
	game = g;
	return game.add.group();
}

function createTorpedo(torpedoes, x, y) {
	var torpedo = torpedoes.create(x + 70, y - 10, 'torpedo');
	torpedo.dist = 0;
	torpedo.scale.setTo(0.5, 0.5);
	torpedo.anchor.setTo(0.5, 0.5);
	game.physics.arcade.enable(torpedo);
	torpedo.dimensions = {width: torpedo.width, height: torpedo.height};
	torpedo.body.setSize(torpedo.dimensions.width, torpedo.dimensions.height);
}

function updateTorpedoes(torpedoes, camVel) {
	torpedoes.forEach(function(torpedo){
		if (torpedo != null) {
			torpedo.dist++;
			torpedo.body.x += 20 + camVel;
			
			if (torpedo.dist == 20) {
				 torpedo.destroy();
			}
		}
	}, this);
}