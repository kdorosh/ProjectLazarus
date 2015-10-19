//var x;
//var y;
var shoot=10;
var game;
var torpedoes;

function Normandy(g) {
	game = g;
    return game.add.sprite(300, 300, 'normandy');
}

function createPlayer(normandy) {
		//normandy = this.game.add.sprite(100, 300, 'normandy');
		normandy.alive = true;
		game.physics.arcade.enable(normandy);
		normandy.scale.setTo(0.25, 0.25);
		normandy.anchor.setTo(0.5, 1);
		normandy.dimensions = {width: normandy.width, height: normandy.height};
		normandy.body.setSize(normandy.dimensions.width, normandy.dimensions.height);
		
		
		torpedoes = game.add.group();
		
		//this.game.camera.follow(this.player);
}

function updateNormandy(normandy, wasd, camVel) {
		if(shoot<10){
			shoot++;
		}
		//normandy.body.velocity.x = 0;
		//x = normandy.body.x;
		//y = normandy.body.y;
		
		if (normandy.alive) {
			if (wasd.up.isDown && normandy.body.y > 30) {
				normandy.body.y -= 10;
				normandy.angle = -45;
			} else if (wasd.down.isDown && normandy.body.y + 18 < game.world.height) {
				normandy.body.y += 10;
				normandy.angle = 45;
			} else {
				normandy.angle = 0;
			}		
			normandy.body.x += camVel;
			if (wasd.left.isDown && normandy.body.x > camx + 20) {
				normandy.body.x -= 10;
			//the 746 is the width of the screen. 690 includes offset for normandy size
			} else if (wasd.right.isDown && normandy.body.x < camx + 690) {
				normandy.body.x += 10;
			}

			if (wasd.fire.isDown) {
				if(shoot==10){
					torpedo = new Torpedo(game, normandy.body.x, normandy.body.y);
					torpedo.create();
					torpedoes.add(torpedo.getObject());
					shoot=0;
				}

			}
			torpedoes.forEach(function(torpedo){
				torpedo.classSrc.update();
			}, this);
		}
}

// OLD CODE BELOW - REMOVE LATER

/*Normandy.prototype = {
	preload: function(){
		//
	},
	
	createPlayer: function(normandy) {
		//normandy = this.game.add.sprite(100, 300, 'normandy');
		normandy.scale.setTo(0.5, 0.5);
		normandy.anchor.setTo(0.5, 0.5);
		//this.game.physics.arcade.enable(normandy);
		
		torpedoes = game.add.group();
		
		//this.game.camera.follow(this.player);
	},
	
	update: function(wasd) {
		if(shoot<30){
			shoot++;
		}
		x = normandy.x;
		y = normandy.y;
		
		if (wasd.up.isDown) {
			normandy.y -= 3;
			normandy.angle = -45;
		} else if (wasd.down.isDown) {
			normandy.y += 3;
			normandy.angle = 45;
		} else {
			normandy.angle = 0;
		}
		
		if (wasd.left.isDown) {
			normandy.x -= 3;
		} else if (wasd.right.isDown) {
			normandy.x += 3;
		}

		if (wasd.fire.isDown) {
			if(shoot==30){
				torpedo = new Torpedo(this.game, x, y);
				torpedo.create();
				torpedoes.add(torpedo.getObject());
				shoot=0;
			}

    	}
    	torpedoes.forEach(function(torpedo){
    		torpedo.classSrc.update();
    	}, this);
	},

	getY: function() {
		return normandy.y;
	},

	getX: function() {
		return normandy.x;
	},
	
	getTorpedoes: function () {
		return torpedoes;
	},
	
	getObject: function() {
		return normandy;
	}

}*/