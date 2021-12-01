class cave extends Phaser.Scene {
    constructor() {
      super({
        key: "cavec",
      });
    }
  //cave C
    // incoming data from scene below
    init(data) {}
  
    preload() {
      // Step 1, load JSON
      this.load.tilemapTiledJSON("cavec","assets/cavec.json");
  
      // // Step 2 : Preload any images here, nickname, filename （这里放你的tileset PNG和你的character animation那些，反正就是图片那些）
  

      this.load.image("forest2","assets/forest2.png");
      this.load.image("forest3","assets/forest3.png");
  
  
      this.load.atlas( 'left', 'assets/Pwl.png', 'assets/Pwl.json'); //load了png然后load你的j.son在后面
      this.load.atlas( 'right', 'assets/Pwr.png', 'assets/Pwr.json');
      this.load.atlas( 'up', 'assets/Pwb.png', 'assets/Pwb.json');
      this.load.atlas( 'down', 'assets/Pwf.png', 'assets/Pwf.json');
    }
  
    create() {
      console.log("*** world scene");
  
      //Step 3 - Create the map from main
      let map = this.make.tilemap({key:'cavec'}); //or var map 也可以，然后那个key的字，跟着你上面那个step1的world1，要一样的名字！因为是connect的！
  
      // Step 4 Load the game tiles
      // 1st parameter is name in Tiled,
      // 2nd parameter is key in Preload

      let forest2 = map.addTilesetImage("forest2", "forest2");
      let forest3 = map.addTilesetImage("forest3", "forest3");
  
      let tilesArray = [ forest1Tiles,forest2Tiles, forest3Tiles ] //这个是tilesArray是方便你不用下面一个个打出来，直接load完你全部的tileset）（看下一个step）
  
      // Step 5  Load in layers by layers (一层一层加layer，从最底层的layer a.k.a第一个layer开始load进来）
      this.floorlayer = map.createLayer("groundlayer", tilesArray, 0, 0); //layer的名字要跟你在tilemap里面取的layer名字一样！，后面tilesArray就是你直接load你的tileset进来了）
      this.walllayer = map.createLayer("walllayer", tilesArray, 0, 0);
      this.decorationlayer = map.createLayer("decolayer", tilesArray, 0, 0);

  
      this.physics.world.bounds.width = this.groundLayer.width; //这个应该也是set你character不会跑出去一个地方的，but with layer？不是很确定
      this.physics.world.bounds.height = this.groundLayer.height;
  
      // Object layers
      var startPoint = map.findObject(
        "Spawnlayer",
        (obj) => obj.name === "startPoint"
      );
      // var endPoint = map.findObject(
      //   "objectLayer",
      //   (obj) => obj.name === "endPoint"
      // );
  
      var start = map.findObject("Spawnlayer",(obj) => obj.name === "start");
  
      this.player = this.physics.add.sprite(start.x, start.y, 'up');
  
      this.player.setCollideWorldBounds(true); // don't go out of the this.map （set character不会跑出去map，true就是不会，改成false就会）
  
      // // create the arrow keys
       this.cursors = this.input.keyboard.createCursorKeys();
  
      // // camera follow player （这个就是如果你的map size大过你的game size然后你在网站开出来的时候显示不完整个地图的时候你可以加这个，镜头会跟着你的character移动！）
      this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
      this.cameras.main.startFollow(this.player);
  
  
  
      this.TreesLayer.setCollisionByExclusion(-1, true) //（额，这个setCollisionByExclusion在你layer的好像是如果你加了的话，你的character就不会穿过这些东西，就会block它啦）
      this.StoneLayer.setCollisionByExclusion(-1, true)
  
      this.physics.add.collider(this.player, this.walllayer); //这个，应该，也是跟上面一样set Collider的，but你应该是要加这个才可以真的不会撞到？所以应该是一起的
      this.physics.add.collider(this.player, this.decolayer);
    } 
    /////////////////// end of create //////////////////////////////
  
    update() {

      // check for world ////// numbers unknow
        //   if ( this.player.x < 1255
        //     && this.player.y > 368 && this.player.y < 431 ) {

        //       this.world()
        //     }

      if (this.cursors.left.isDown) {
        this.player.body.setVelocityX(-200);
        this.player.anims.play("left", true); //（你那个红色那边的字要跟着你上面animation create那个key的名字一样噢）
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
        this.player.anims.stop(); //这个就是比如你move你character然后停下来，它就停在那个地方那个角度瓜）
        this.player.body.setVelocity(0, 0);
      }
    } /////////////////// end of update //////////////////////////////
  
    // Function to jump to world
      // world(player, tile) {
      //   console.log("worldfunction");
      // }
      
  } //////////// end of class world ////////////////////////
  
