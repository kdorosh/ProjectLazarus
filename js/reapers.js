var game;

function Reapers(g) {
	game = g;
    return game.add.group();
}

function createReapers(reapers) {
    for (var i = 0; i < 2; i++) {
        var reaper = reapers.create(game.width, game.rnd.integerInRange(0, (game.height / 100)) * 100, 'reaper');
		game.physics.arcade.enable(reaper);
		reaper.anchor.setTo(0.5, 0.5);
		reaper.dimensions = {width: reaper.width, height: reaper.height};
		reaper.body.setSize(reaper.dimensions.width, reaper.dimensions.height);
		reaper.alive = true;
    }
}

function updateReapers(reapers, player, camVel) {
    reapers.forEach(function(reaper) {
		reaper.x += camVel - 2;
		
		if (reaper.body.x < camx + 690 && !reaper.alive) { 
			// respawn reaper
			reaper.alive = true;
			reaper.x = game.width;
			reaper.y = game.rnd.integerInRange(0, (game.height / 100)) * 100;
		}
		
		if (reaper.y < player.y) {
				reaper.y += 2;
		} else if (reaper.y > player.y) {
				reaper.y -= 2;
		}
		
		reaper.angle = Math.atan2(player.body.x - reaper.x, player.body.y - reaper.y)  * -57.2957795;
    });
}
