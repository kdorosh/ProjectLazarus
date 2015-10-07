var veloc;
var xpos;
var ypos;

function Torpedo(game, vel, x, y){
	this.game= game;
	//veloc = (-1)*vel;
	xpos = x;
	ypos = y;
}

Torpedo.prototype.create = function() {
	this.object = this.game.add.sprite(x+70, y+20, 'torpedo');
	this.object.scale.setTo(0.5, 0.5);
	this.object.anchor.setTo(0.5, 0.5);
	game.physics.arcade.enable(this.object);
	this.object.body.velocity.x=200;
	//if(veloc!=0){
	//	this.object.body.velocity.y=200*veloc;
	//}
}

Torpedo.prototype.update = function() {
	this.collide = function(){
        this.kill();
    };
}

Torpedo.prototype.getY = function() {
	return this.object.y;
}

Torpedo.prototype.getX = function() {
	return this.object.x;
}