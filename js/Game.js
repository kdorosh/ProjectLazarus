var SideScroller = SideScroller || {};
var camx = 0;
var camy = 420;
var initCamVel = 8;
var camvel = initCamVel;
SideScroller.Game = function(){};

SideScroller.Game.prototype = {
  preload: function() {
      this.game.time.advancedTiming = true;
    },
  create: function() {
    this.map = this.game.add.tilemap('level1');

    //the first parameter is the tileset name as specified in Tiled, the second is the key to the asset
    this.map.addTilesetImage('tiles_spritesheet', 'gameTiles');
	this.map.addTilesetImage('enemies', 'reaperImg');
	this.map.addTilesetImage('myTiles', 'gameTiles2');

    //create layers
    this.backgroundlayer = this.map.createLayer('backgroundLayer');
    this.blockedLayer = this.map.createLayer('blockedLayer');

    //collision on blockedLayer
    this.map.setCollisionBetween(1, 5000, true, 'blockedLayer');

    //resizes the game world to match the layer dimensions
    this.backgroundlayer.resizeWorld();

    //create coins
    this.createCoins();
	this.createReapers();

    //create player
	this.player = new Normandy(this.game);
	createPlayer(this.player);
	
    //enable physics on the player
    this.game.physics.arcade.enable(this.player);

    //player gravity
    //this.player.body.gravity.y = 1500;
    //this.player.anchor.setTo(0.5, 1);
    
    //the camera will follow the player in the world
    //this.game.camera.follow(this.player);

    //move player with cursor keys
    this.cursors = this.game.input.keyboard.createCursorKeys();
	wasd = {
		up: this.game.input.keyboard.addKey(Phaser.Keyboard.W),
		down: this.game.input.keyboard.addKey(Phaser.Keyboard.S),
		left: this.game.input.keyboard.addKey(Phaser.Keyboard.A),
		right: this.game.input.keyboard.addKey(Phaser.Keyboard.D),
		fire: this.game.input.keyboard.addKey(Phaser.Keyboard.P),
	};

    //sounds
    this.coinSound = this.game.add.audio('coin');
  },
  
 //find objects in a Tiled layer that contain a property called "type" equal to a certain value
  findObjectsByType: function(type, map, layerName) {
    var result = new Array();
    map.objects[layerName].forEach(function(element){
      if(element.properties.type === type) {
        //Phaser uses top left, Tiled bottom left so we have to adjust
        //also keep in mind that some images could be of different size as the tile size
        //so they might not be placed in the exact position as in Tiled
        element.y -= map.tileHeight;
        result.push(element);
      }      
    });
    return result;
  },
  //create a sprite from an object
  createFromTiledObject: function(element, group) {
    var sprite = group.create(element.x, element.y, element.properties.sprite);

      //copy all properties to the sprite
      Object.keys(element.properties).forEach(function(key){
        sprite[key] = element.properties[key];
      });
  },
  update: function() {
	  
	//this.game.physics.arcade.overlap(this.player, this.game.camera, this.checkCameraBarrierCollision,  null, this);
	this.game.camera.setPosition(camx, camy);
	camx = camx + camvel;

	//update playah
	updateNormandy(this.player, wasd, camvel);

    //collision
    this.game.physics.arcade.overlap(this.player, this.coins, this.collect, null, this);
    this.game.physics.arcade.overlap(this.player, this.blockedLayer, this.playerHit, null, this);
	
    //only respond to keys and keep the speed if the player is alive
    if(this.player.alive) {
      this.player.body.velocity.x = 0;  //used to be 300

  
      //restart the game if reaching the edge
      if(camx >= this.game.world.width - 600) {
		//alert("Next Level!");
		camx = 0;
		camvel += 2;
        this.game.state.start('Game');
      }
    }

  },
  playerHit: function(player, blockedLayer) {
    //if hits on the right side, die
    //if(player.body.blocked.right) {

      //set to dead (this doesn't affect rendering)
      this.player.alive = false;

      //stop moving to the right
      camvel = 0;
	  player.body.x = 300;
	  player.body.y = 0;//this.player.body.velocity.x = 0;

      //change sprite image
      //this.player.loadTexture('playerDead');

      //go to gameover after a few milliseconds
      this.game.time.events.add(1500, this.gameOver, this);
    //}
  },
  collect: function(player, collectable) {
    //play audio
    this.coinSound.play();

    //remove sprite
    collectable.destroy();
  },
  //create coins
  createCoins: function() {
    this.coins = this.game.add.group();
    this.coins.enableBody = true;
    var result = this.findObjectsByType('coin', this.map, 'objectsLayer');
    result.forEach(function(element){
      this.createFromTiledObject(element, this.coins);
    }, this);
  },
  createReapers: function() {
    this.reapers = this.game.add.group();
    this.reapers.enableBody = true;
    var result = this.findObjectsByType('reaper', this.map, 'objectsLayer');
    result.forEach(function(element){
      this.createFromTiledObject(element, this.coins);
    }, this);
  },
  gameOver: function() {
    this.game.state.start('GameOver');
	camx = 0;
	camy = 420;
	camvel = initCamVel;
  },
  render: function()
  {
	//debug info: fps then body info of normandy
	this.game.debug.text(this.game.time.fps || '--', 20, 70, "#00ff00", "40px Courier");   
	this.game.debug.bodyInfo(this.player, 0, 80);   
  }
};