var SideScroller = SideScroller || {};
var camx = 0;
var camy = 420;
var initCamVel = 7;
var camVel = initCamVel;
var is_playing = false;
var health = 100;
SideScroller.Game = function(){};

SideScroller.Game.prototype = {
  preload: function() {
      this.game.time.advancedTiming = true;
    },
	
  create: function() {
  if(!is_playing){
      this.music = this.game.add.audio('gamemusic');
      this.music.play();
    is_playing=true;
  }
    this.map = this.game.add.tilemap('level1');

    //the first parameter is the tileset name as specified in Tiled, the second is the key to the asset
    this.map.addTilesetImage('tiles_spritesheet', 'gameTiles');
	//this.map.addTilesetImage('enemies', 'reaperImg');
	this.map.addTilesetImage('bgTiles', 'bgTiles');
	this.map.addTilesetImage('bgTilesFlipped', 'bgTilesFlipped');

    //create layers
    this.backgroundlayer = this.map.createLayer('backgroundLayer');
    this.blockedLayer = this.map.createLayer('blockedLayer');

    //collision on blockedLayer
    this.map.setCollisionBetween(1, 5000, true, 'blockedLayer');

    //resizes the game world to match the layer dimensions
    this.backgroundlayer.resizeWorld();
	
	// create reapers as group
	this.reapers = new Reapers(this.game);
	createReapers(this.reapers);

    //create player
	this.player = new Normandy(this.game);
	createPlayer(this.player);
	this.torpedoes = createTorpedoes();
	
    //enable physics on the player
    this.game.physics.arcade.enable(this.player);

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
    // this.coinSound = this.game.add.audio('coin');
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
	camx = camx + camVel;

	//update playah
	updateNormandy(this.player, wasd, camVel);
	
	//update reapers
	updateReapers(this.reapers, this.player, camVel);

    //collisions
  this.game.physics.arcade.overlap(this.player, this.blockedLayer, this.playerHit, null, this);
	this.game.physics.arcade.overlap(this.player, this.reapers, this.playerHit, null, this);
  this.game.physics.arcade.overlap(this.player, this.reapers, this.reapersDie, null, this);
	this.game.physics.arcade.overlap(this.reapers, this.blockedLayer, this.reapersHit, null, this);
	this.game.physics.arcade.overlap(this.torpedoes, this.reapers, this.reapersDie, null, this);
	console.log(health);
    //only respond to keys and keep the speed if the player is alive
    if(this.player.alive) {
      this.player.body.velocity.x = 0;  //used to be 300
  
      //restart the game if reaching the edge w/ faster scrolling speed
      if(camx >= this.game.world.width - 600) {
		//alert("Next Level!");
		camx = 0;
		camVel += 2;
        this.game.state.start('Game');
      }
    }

  },
  
  playerHit: function(player, killer) {
    //set to dead (this doesn't affect rendering)
    health -= 15;
    if(health<0){
        this.player.alive = false;
        //stop moving to the right
        camVel = 0;
        //go to gameover after a few milliseconds
        this.game.time.events.add(1000, this.gameOver, this);
    }



  },
  
  reapersHit: function(reaper, killer) {
    //set to dead (this doesn't affect rendering)
    //reaper.alive = false;
	
  },
  
  reapersDie: function(killer, reaper) {
    //set to dead (this doesn't affect rendering)
    reaper.alive = false;
  },
  
  gameOver: function() {
    this.music.stop();
    this.game.state.start('GameOver');
	camx = 0;
	camy = 420;
	camVel = initCamVel;
  },
  
  render: function()
  {
	//debug info: fps then body info of normandy
	this.game.debug.text(this.game.time.fps || '--', 20, 70, "#00ff00", "40px Courier");   
	// this.game.debug.bodyInfo(this.player, 0, 80);   
	this.reapers.forEach(function(torpedo) {
		this.game.debug.bodyInfo(torpedo, 0, 80);
	});
  }
};