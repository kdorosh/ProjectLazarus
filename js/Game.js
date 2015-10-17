var SideScroller = SideScroller || {};

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
    //this.player = this.game.add.sprite(100, 300, 'normandy');
	this.player = new Normandy(this.game);
	//alert(this.player);//var temp = this.player;//alert(this.player);
	createPlayer(this.player);
	//alert(this.player);
	
	/*normandy = new Normandy(this.game);
	alert(normandy);
	normandy.createPlayer();
	alert(normandy);
	this.player = normandy;*/
	
	
    //enable physics on the player
    this.game.physics.arcade.enable(this.player);

    //player gravity
    //this.player.body.gravity.y = 1000;

    //properties when the player is ducked and standing, so we can use in update()
    //var playerDuckImg = this.game.cache.getImage('playerDuck');
    //this.player.duckedDimensions = {width: playerDuckImg.width, height: playerDuckImg.height};
    //this.player.standDimensions = {width: this.player.width, height: this.player.height};
    this.player.anchor.setTo(0.5, 1);
    
    //the camera will follow the player in the world
    this.game.camera.follow(this.player);

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
	
	//update playah
	updateNormandy(this.player, wasd);
	  
    //collision
    this.game.physics.arcade.collide(this.player, this.blockedLayer, this.playerHit, null, this);
    this.game.physics.arcade.overlap(this.player, this.coins, this.collect, null, this);
    
    //only respond to keys and keep the speed if the player is alive
    if(this.player.alive) {
      this.player.body.velocity.x = 0;  //used to be 300

      if(this.cursors.up.isDown) {
        this.playerJump();
      }
      else if(this.cursors.down.isDown) {
        //this.playerDuck();
      }

      if(!this.cursors.down.isDown && this.player.isDucked && !this.pressingDown) {
        //change image and update the body size for the physics engine
        this.player.loadTexture('player');
        this.player.body.setSize(this.player.standDimensions.width, this.player.standDimensions.height);
        this.player.isDucked = false;
      }

      //restart the game if reaching the edge
      if(this.player.x >= this.game.world.width) {
        this.game.state.start('Game');
      }
    }

  },
  playerHit: function(player, blockedLayer) {
    //if hits on the right side, die
    if(player.body.blocked.right) {

      //set to dead (this doesn't affect rendering)
      this.player.alive = false;

      //stop moving to the right
      this.player.body.velocity.x = 0;

      //change sprite image
      this.player.loadTexture('playerDead');

      //go to gameover after a few milliseconds
      this.game.time.events.add(1500, this.gameOver, this);
    }
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
  },
  playerJump: function() {
    if(this.player.body.blocked.down) {
      this.player.body.velocity.y -= 700;
    }    
  },
};