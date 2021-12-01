class world extends Phaser.Scene {
  constructor() {
    super({
      key: "world",
    });
  }
//Run, Bora, Run!
  // incoming data from scene below 
  init(data) {
    
    this.playerPos = data.playerPos;

  }

  preload() {
    // Step 1, load JSON
    this.load.tilemapTiledJSON("worldmap","assets/worldmap.json");

    // // Step 2 : Preload any images here, nickname, filename 
    this.load.image("asset","assets/firstassetpack.png");
    this.load.image("nature tileset","assets/RPGnature tileset.png");
    

    this.load.atlas( 'left', 'assets/cwl.png', 'assets/cwl.json'); 
    this.load.atlas( 'right', 'assets/cwr.png', 'assets/cwr.json');
    this.load.atlas( 'up', 'assets/cwb.png', 'assets/cwb.json');
    this.load.atlas( 'down', 'assets/cwf.png', 'assets/cwf.json');
  }

  create() {
    console.log("*** world scene");

    //Step 3 - Create the map from main
    let map = this.make.tilemap({key:'worldmap'}); 

    // Step 4 Load the game tiles
    // 1st parameter is name in Tiled,
    // 2nd parameter is key in Preload
    let firstassetpackTiles = map.addTilesetImage("asset", "asset"); 
    let RPGnaturetilesetTiles = map.addTilesetImage("nature tileset", "nature tileset"); 
     

    let tilesArray = [ firstassetpackTiles,RPGnaturetilesetTiles ] 

    // Step 5  Load in layers by layers 
    this.grass = map.createLayer("grass ", tilesArray, 0, 0); 
    this.soil = map.createLayer("soil", tilesArray, 0, 0);
    this.flowers = map.createLayer("flowers", tilesArray, 0, 0);
    this.water = map.createLayer("water", tilesArray, 0, 0);
    this.house = map.createLayer("house", tilesArray, 0, 0);
    this.trees = map.createLayer("trees", tilesArray, 0, 0);
    this.connectinghouse = map.createLayer("connectinghouse", tilesArray, 0, 0);
      
    this.anims.create({
      key: 'left',
      frames: [
          { key: 'left', frame: 'cwl-21'},
          { key: 'left', frame: 'cwl-26'},
          { key: 'left', frame: 'cwl-27'},
          { key: 'left', frame: 'cwl-28'},
          { key: 'left', frame: 'cwl-30'},
          { key: 'left', frame: 'cwl-25'},
          { key: 'left', frame: 'cwl-29'},
          { key: 'left', frame: 'cwl-23'},
          { key: 'left', frame: 'cwl-22'},
          { key: 'left', frame: 'cwl-24'},
      ],
      frameRate: 6,
      repeat: -1
  })

  this.anims.create({
      key: 'right',
      frames: [
          { key: 'right', frame: 'cwr-10'},
          { key: 'right', frame: 'cwr-03'},
          { key: 'right', frame: 'cwr-04'},
          { key: 'right', frame: 'cwr-05'},
          { key: 'right', frame: 'cwr-02'},
          { key: 'right', frame: 'cwr-06'},
          { key: 'right', frame: 'cwr-01'},
          { key: 'right', frame: 'cwr-08'},
          { key: 'right', frame: 'cwr-07'},
          { key: 'right', frame: 'cwr-09'},
      ],
      frameRate: 6,
      repeat: -1
  })

    this.anims.create({
      key: 'up',
      frames: [
        { key: 'up', frame: "cwb-47"},
        { key: 'up', frame: "cwb-48"},
        { key: 'up', frame: "cwb-49"},
        { key: 'up', frame: "cwb-50"},
      ],
      frameRate: 6,
      repeat: -1
    })

     this.anims.create({
      key: 'down',
      frames: [
        { key: 'down', frame: "cwf-38"},
        { key: 'down', frame: "cwf-37"},
        { key: 'down', frame: "cwf-39"},
        { key: 'down', frame: "cwf-40"},
      ],
      frameRate: 6,
      repeat: -1
    })
    // this.physics.world.bounds.width = this.groundLayer.width; 
    // this.physics.world.bounds.height = this.groundLayer.height;

    // Object layers

    var start = map.findObject("spawnLayer",(obj) => obj.name === "start");

    this.player = this.physics.add.sprite(10, 50, 'down').setScale(0.25);

    //enable debug
    window.player = this.player;


    this.player.setCollideWorldBounds(true); // don't go out of the this.map 

    // // create the arrow keys
     this.cursors = this.input.keyboard.createCursorKeys();

    // // camera follow player 
    this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
    this.cameras.main.startFollow(this.player);


    // this.connectinghouseLayer.setCollisionByExclusion(-1, true) 
    // this.houseLayer.setCollisionByExclusion(-1, true)
    // this.waterLayer.setCollisionByExclusion(-1, true)
    // this.treesLayer.setCollisionByExclusion(-1, true)

    // this.physics.add.collider(this.player, this.connectinghouseLayer); 
    // this.physics.add.collider(this.player, this.houseLayer);
    // this.physics.add.collider(this.player, this.waterLayer);
    // this.physics.add.collider(this.player, this.treesLayer);
  } 
  /////////////////// end of create //////////////////////////////

  update() {

    // check for level1
    if ( this.player.x > 1263
        && this.player.y > 336 && this.player.y < 396 ) {
            this.level1map();
        }

    


    if (this.cursors.left.isDown) {
      this.player.body.setVelocityX(-200);
      this.player.anims.play("left", true); 
    } 
    else if (this.cursors.right.isDown) {
      this.player.body.setVelocityX(200);
      this.player.anims.play("right", true);
    } 
    else if (this.cursors.up.isDown) {
      this.player.body.setVelocityY(-200);
      this.player.anims.play("up", true);
      //console.log('up');
    } 
    else if (this.cursors.down.isDown) {
      this.player.body.setVelocityY(200);
      this.player.anims.play("down", true);
      //console.log('down');
    } 
    else {
      this.player.anims.stop(); 
      this.player.body.setVelocity(0, 0);
    }
  } /////////////////// end of update //////////////////////////////

  // Function to jump to level1 map
        level1map(player, tile) {
            console.log("level1map function");
            this.scene.start("level1map");
        }


} //////////// end of class world ////////////////////////