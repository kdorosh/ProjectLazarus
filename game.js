var game = new Phaser.Game(800, 600, Phaser.AUTO, 'project-lazarus', { preload: preload, create: create, update: update, render: render });

function preload() {

    game.load.image('normandy', 'imgs/normandy.png');
}

var normandy;

function create() {
    game.physics.startSystem(Phaser.Physics.ARCADE);

	var normandy = new Normandy(game);
	normandy.createPlayer();

}

function update() {

   

}

function render () {

   

}