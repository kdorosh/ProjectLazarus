/*function Reapers(game) {
	this.game = game;
} 

Reapers.prototype.create = function() {
	this.objects = this.game.add.group();
    for (var i = 1; i < 8; i++) {
        var reaper = this.objects.create(800, 880 - 2*i * 100, 'reaperImg');
		reaper.scale.setTo(0.5, 0.5);
		reaper.anchor.setTo(0.5, 0.5);
		this.game.physics.arcade.enable(reaper);
		reaper.followsPlayer = 1;
    }
}*/

function updateReapers(reapers, normandy) {
    reapers.forEach(function(reaper) {
		if (reaper.followsPlayer == 1) {
			if (reaper.y < normandy.getY()) {
				reaper.y += 1;
			} else if (reaper.y > normandy.getY()) {
				reaper.y -= 1;
			}
		}
		reaper.x -= 1;
		
		reaper.angle = Math.atan2(normandy.body.x - reaper.x, normandy.body.y - reaper.y)  * -57.2957795;
    });
}
/*
Reapers.prototype.getObjects = function() {
	return this.objects;
}*/

