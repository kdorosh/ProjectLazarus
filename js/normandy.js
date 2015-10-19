var x;
var y;
var shoot=10;
var game;
var torpedoes;

function Normandy(g) {
	game = g;
    return game.add.sprite(300, 300, 'normandy');
}

function createPlayer(normandy) {
		//normandy = this.game.add.sprite(100, 300, 'normandy');
		normandy.scale.setTo(0.25, 0.25);
		normandy.anchor.setTo(0.5, 0.5);
		//this.game.physics.arcade.enable(normandy);
		
		torpedoes = game.add.group();
		
		//this.game.camera.follow(this.player);
}

function updateNormandy(normandy, wasd) {
		if(shoot<10){
			shoot++;
		}
		x = normandy.x;
		y = normandy.y;
		
		if (wasd.up.isDown) {
			normandy.y -= 10;
			normandy.angle = -45;
		} else if (wasd.down.isDown) {
			normandy.y += 10;
			normandy.angle = 45;
		} else {
			normandy.angle = 0;
		}
		
		if (wasd.left.isDown) {
			normandy.x -= 10;
		} else if (wasd.right.isDown) {
			normandy.x += 10;
		}

		if (wasd.fire.isDown) {
			if(shoot==10){
				torpedo = new Torpedo(this.game, x, y);
				torpedo.create();
				torpedoes.add(torpedo.getObject());
				shoot=0;
			}

    	}
    	torpedoes.forEach(function(torpedo){
    		torpedo.classSrc.update();
    	}, this);
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