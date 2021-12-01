class level2 extends Phaser.Scene {
  constructor() {
    super({
      key: "level2map",
    });
  }
//level2 Map
  // incoming data from scene below 
  init(data) {
    
    this.playerPos = data.playerPos;

  }

  preload() {
    // Step 1, load JSON
    this.load.tilemapTiledJSON("level2map","assets/level2map.json");

    // // Step 2 : Preload any images here, nickname, filename 

    this.load.image("asset","assets/firstassetpack.png");
    this.load.image("nature tileset","assets/RPGnature tileset.png");

    this.load.atlas( 'left', 'assets/cwl.png', 'assets/cwl.json'); 
    this.load.atlas( 'right', 'assets/cwr.png', 'assets/cwr.json');
    this.load.atlas( 'up', 'assets/cwb.png', 'assets/cwb.json');
    this.load.atlas( 'down', 'assets/cwf.png', 'assets/cwf.json');
  }

  create() {
    console.log("*** level2 scene");

    //Step 3 - Create the map from main
    let map = this.make.tilemap({key:'level2map'}); 

    // Step 4 Load the game tiles
    // 1st parameter is name in Tiled,
    // 2nd parameter is key in Preload
    let firstassetpackTiles = map.addTilesetImage("asset", "asset"); 
    let RPGnaturetilesetTiles = map.addTilesetImage("nature tileset", "nature tileset"); 
     

    let tilesArray = [ pippoyaTiles,pippoya2Tiles,pippoya3Tiles ] 

    // Step 5  Load in layers by layers 
    this.grass = map.createLayer("grass ", tilesArray, 0, 0); 
    this.soil = map.createLayer("soil", tilesArray, 0, 0);
    this.flowers = map.createLayer("flowers", tilesArray, 0, 0);
    this.water = map.createLayer("water", tilesArray, 0, 0);
    this.house = map.createLayer("house", tilesArray, 0, 0);
    this.trees = map.createLayer("trees", tilesArray, 0, 0);
    this.connectinghouse = map.createLayer("connectinghouse", tilesArray, 0, 0);
      
    
    this.physics.world.bounds.width = this.groundLayer.width; 
    this.physics.world.bounds.height = this.groundLayer.height;

    // Object layers
    var start = map.findObject("objectLayer",(obj) => obj.name === "start");

    this.player = this.physics.add.sprite(start.x, start.y, 'up');

    //enable debug
    window.player = this.player;


    this.player.setCollideWorldBounds(true); // don't go out of the this.map 

    // // create the arrow keys
     this.cursors = this.input.keyboard.createCursorKeys();

    // // camera follow player 
    this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
    this.cameras.main.startFollow(this.player);


    this.connectinghouseLayer.setCollisionByExclusion(-1, true) 
    this.houseLayer.setCollisionByExclusion(-1, true)
    this.waterLayer.setCollisionByExclusion(-1, true)
    this.treesLayer.setCollisionByExclusion(-1, true)

    this.physics.add.collider(this.player, this.connectinghouseLayer); 
    this.physics.add.collider(this.player, this.houseLayer);
    this.physics.add.collider(this.player, this.waterLayer);
    this.physics.add.collider(this.player, this.treesLayer);
  } 
  /////////////////// end of create //////////////////////////////

  update() {

    //go back to worldmap, check for blockA exit
    // if ( this.player.x > 592
    //     && this.player.y > 1165 && this.player.y > 1165 ) {
    //         this.level3map();
    //     }



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
     }

        // Function to jump to worldmap

        // level3map(player, tile) {
        //     console.log("level3map function");
        //     this.scene.start("level3map");
        // }
    

} //////////// end of class world ////////////////////////