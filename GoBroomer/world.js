class world extends Phaser.Scene {
  constructor() {
    super({
      key: "world",
    });
  }
//Go!Broomer, main scene
  // incoming data from scene below 
  init(data) {
    
    // this.playerPos = data.playerPos;
  }

  preload() {
    // Step 1, load JSON
    this.load.tilemapTiledJSON("map1","assets/Map_1.json");

    // // Step 2 : Preload any images here, nickname, filename 
    this.load.image("popiya","assets/pippoya.png");
    this.load.image("popiya2","assets/pippoya2.png");

    // this.load.image("popiya3","assets/pippoya3.png");
    this.load.atlas( 'left', 'assets/broomer_left.png', 'assets/broomer_left.json'); //load了png然后load你的j.son在后面
    this.load.atlas( 'right', 'assets/broomer_right.png', 'assets/broomer_right.json');
    this.load.atlas( 'up', 'assets/broomer_up.png', 'assets/broomer_up.json');
    this.load.atlas( 'down', 'assets/broomer_down.png', 'assets/broomer_down.json');
   
      //npc
      this.load.atlas( 'sebrina', 'assets/sebrina.png', 'assets/sebrina.json');
  }

  create() {
    console.log("*** world scene");

    //Step 3 - Create the map from main
    let map = this.make.tilemap({key:'map1'}); 

    // Step 4 Load the game tiles
    // 1st parameter is name in Tiled,
    // 2nd parameter is key in Preload
    let pippoyaTiles = map.addTilesetImage("popiya", "popiya"); //前面的“”要跟着你在tilemap里面放的那个tileset名字，后面的“”跟着你上面load image取得名字a.k.a第一个“”）
    let pippoya2Tiles = map.addTilesetImage("popiya2", "popiya2"); //代表一个地图

    let tilesArray = [ pippoyaTiles,pippoya2Tiles] //跟着上面走

    // Step 5  Load in layers by layers 
    this.groundLayer = map.createLayer("groundLayer", tilesArray, 0, 0); //layer的名字要跟你在tilemap里面取的layer名字一样，后面tilesArray就是你直接load你的tileset进来了）
    this.treesLayer = map.createLayer("treesLayer", tilesArray, 0, 0);
    this.roadLayer = map.createLayer("roadLayer", tilesArray, 0, 0);
    this.houseLayer = map.createLayer("houseLayer", tilesArray, 0, 0);
  
    //你的角色动作
    this.anims.create({ 
      key: 'left',
      frames: [
        { key: 'left', frame: 'broomer_left-22'},
        { key: 'left', frame: 'broomer_left-18'},
        { key: 'left', frame: 'broomer_left-21'},
        { key: 'left', frame: 'broomer_left-23'},

      ],
      frameRate: 6, //（这个是你character移动的速度、or应该说是movement速度也可以，反正，就是速度，可自行调噢）
      repeat: -1
    })

  this.anims.create({
      key: 'right',
      frames: [
          { key: 'right', frame: 'broomer_right-24'},
          { key: 'right', frame: 'broomer_right-26'},
          { key: 'right', frame: 'broomer_right-27'},
          { key: 'right', frame: 'broomer_right-25'},
      ],
      frameRate: 6,
      repeat: -1
  })

    this.anims.create({
      key: 'up',
      frames: [
        { key: 'up', frame: "broomer_up-13"},
        { key: 'up', frame: "broomer_up-15"},
        { key: 'up', frame: "broomer_up-20"},
        { key: 'up', frame: "broomer_up-14"},
      ],
      frameRate: 6,
      repeat: -1
    })

     this.anims.create({
      key: 'down',
      frames: [
        { key: 'down', frame: "broomer_down-10"},
        { key: 'down', frame: "broomer_down-11"},
        { key: 'down', frame: "broomer_down-19"},
        { key: 'down', frame: "broomer_down-12"},
      ],
      frameRate: 6,
      repeat: -1
    })

      //npc
      this.anims.create({
        key: 'sebrina',
        frames: [
          { key: 'sebrina', frame: "sebrina-04"},
          { key: 'sebrina', frame: "sebrina-31"},

        ],
        frameRate: 6,
        repeat: -1
    })

    this.physics.world.bounds.width = this.groundLayer.width; 
    this.physics.world.bounds.height = this.groundLayer.height;

    // Object layers
    var start = map.findObject("objectLayer",(obj) => obj.name === "start");
    this.player = this.physics.add.sprite(start.x, start.y, 'up');

      //npc
      this.add.sprite(170, 200, "sebrina").play("sebrina");

    //enable debug
    window.player = this.player;


    this.player.setCollideWorldBounds(true); // don't go out of the this map 

    // // create the arrow keys
     this.cursors = this.input.keyboard.createCursorKeys();

    // // camera follow player 也就是那个东西锁定你的角色
    this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
    this.cameras.main.startFollow(this.player);


    this.treesLayer.setCollisionByExclusion(-1, true) //障碍物
    this.houseLayer.setCollisionByExclusion(-1, true)

    this.physics.add.collider(this.player, this.treesLayer); //跟138一样是障碍物，可能只是为了确认
    this.physics.add.collider(this.player, this.houseLayer);
  } 
  /////////////////// end of create //////////////////////////////

  update() {

  ///////// check for map2
    if ( this.player.x > 1255
          && this.player.y > 368 && this.player.y < 431 ) {

            this.map2()
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

  // // Function to jump to map2
  map2(player, tile) {
    console.log("map2 function");
    this.scene.start("map2");
  }

} //////////// end of class world ////////////////////////