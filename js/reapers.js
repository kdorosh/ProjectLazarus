var game;

function Reapers(g) {
	game = g;
    return game.add.group();
}

function createReapers(reapers) {
    for (var i = 0; i < 6; i++) {
        var reaper = reapers.create(camx + game.width + 500, game.rnd.integerInRange(0, (game.height / 100)) * 100, 'reaper');
		game.physics.arcade.enable(reaper);
		reaper.anchor.setTo(0.5, 0.5);
		reaper.dimensions = {width: reaper.width, height: reaper.height};
		reaper.body.setSize(reaper.dimensions.width, reaper.dimensions.height);
		reaper.alive = true;
    }
}

function updateReapers(reapers, player, camVel) {
    reapers.forEach(function(reaper) {
		if (player.alive) {
			reaper.body.x -= 2;
			
			if (!reaper.alive || reaper.body.x < camx) {
				// respawn reaper
				reaper.alive = true;
				reaper.body.x = camx + game.width + 500;
				reaper.body.y = game.rnd.integerInRange(0, (game.height / 100)) * 100;
			}
			
			if (reaper.body.y < player.y) {
					reaper.body.y += 2;
			} else if (reaper.y > player.y) {
					reaper.body.y -= 2;
			}
			
			reaper.angle = Math.atan2(player.body.x - reaper.body.x, player.body.y - reaper.body.y)  * -57.2957795;
		}
    });
}
