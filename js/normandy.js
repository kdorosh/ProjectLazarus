var shoot = 10;
var game;
var torpedoes;
var lazer_sound;

function Normandy(g) {
	game = g;
    return game.add.sprite(300, 300, 'normandy');
}

function createPlayer(player) {
		player.alive = true;
		game.physics.arcade.enable(player);
		player.scale.setTo(0.25, 0.25);
		player.anchor.setTo(0.5, 1);
		player.dimensions = {width: player.width, height: player.height};
		player.body.setSize(player.dimensions.width, player.dimensions.height);
		lazer_sound = game.add.audio('lazer');
}

function createTorpedoes() {
	torpedoes = new Torpedoes(game);
	return torpedoes;
}

function updateNormandy(normandy, wasd, camVel) {
		if(shoot < 10){
			shoot++;
		}

		
		if (normandy.alive) {
			if (wasd.up.isDown && normandy.body.y > 30) {
				normandy.body.y -= 5;
				normandy.angle = -45;
			} else if (wasd.down.isDown && normandy.body.y + 18 < game.world.height) {
				normandy.body.y += 5;
				normandy.angle = 45;
			} else {
				normandy.angle = 0;
			}	
			
			normandy.body.x += camVel;
			
			if (wasd.left.isDown && normandy.body.x > camx + 20) {
				normandy.body.x -= 5;
			//the 746 is the width of the screen. 690 includes offset for normandy size
			} else if (wasd.right.isDown && normandy.body.x < camx + 690) {
				normandy.body.x += 5;
			}

			if (wasd.fire.isDown) {
				if(shoot == 10){
					lazer_sound.play();
					createTorpedo(torpedoes, normandy.body.x, normandy.body.y);
					shoot = 0;
				}
			}
		}
		
		updateTorpedoes(torpedoes, camVel);
}
