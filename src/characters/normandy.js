function Normandy(game) {
	this.game = game;
} 

Normandy.prototype = {
	preload: function(){
		this.game.load.image('normandy', 'imgs/normandy.png');
	},
	
	createPlayer: function() {
		this.object = this.game.add.sprite(50, 50, 'normandy');
		this.object.scale.setTo(0.5, 0.5);
		this.object.anchor.setTo(0.5, 0.5);
		this.game.physics.arcade.enable(this.object);
	},
	
	update: function(wasd) {
		if (wasd.up.isDown) {
			this.object.y -= 3;
			this.object.angle = -45;
		} else if (wasd.down.isDown) {
			this.object.y += 3;
			this.object.angle = 45;
		} else {
			this.object.angle = 0;
		}
		
		if (wasd.left.isDown) {
			this.object.x -= 3;
		} else if (wasd.right.isDown) {
			this.object.x += 3;
		}
	},

	getY: function() {
		return this.object.y;
	},

	getX: function() {
		return this.object.x;
	}
}


/**
function updatePlayer() {
    var mX = game.input.mousePointer.x;
    var mY = game.input.mousePointer.y;
    pointAt(mX, mY);

    if (wasd.up.isDown) {
        moveY(-3);
    }
    if (wasd.down.isDown) {
        moveY(3);
    }
    if (wasd.left.isDown) {
        moveX(-3);
    }
    if (wasd.right.isDown) {
        moveX(3);
    }
}

function moveX(deltaX) {
	ship.x += deltaX;
}

function moveY(deltaY) {
	ship.y += deltaY;
}

function pointAt(x, y) {
	ship.angle = Math.atan2(ship.position.x - x, ship.position.y - y)  * -57.2957795;
}

function killPlayer(ship, enemy) {
	ship.kill();
}
*/

