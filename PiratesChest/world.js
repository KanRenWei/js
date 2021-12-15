class world extends Phaser.Scene {
  constructor() {
    super({
      key: "world",
    });
  }
//main scene
  // incoming data from scene below
  init(data) {
    this.playerPos= data.playerPos;
  }

  preload() {
    // Step 1, load JSON
    this.load.tilemapTiledJSON("island","assets/island.json");

    // // Step 2 : Preload any images here, nickname, filename （这里放你的tileset PNG和你的character animation那些，反正就是图片那些）

    this.load.image("forest2","assets/forest2.png");
    this.load.image("forest3","assets/forest3.png");

    //  //npc / enemy
   this.load.atlas( 'co', 'assets/co.png', 'assets/co.json');


    this.load.atlas( 'left', 'assets/Pwl.png', 'assets/Pwl.json'); //load了png然后load你的j.son在后面
    this.load.atlas( 'right', 'assets/Pwr.png', 'assets/Pwr.json');
    this.load.atlas( 'up', 'assets/Pwb.png', 'assets/Pwb.json');
    this.load.atlas( 'down', 'assets/Pwf.png', 'assets/Pwf.json');
  }

  create() {
    console.log("*** world scene");

    //background_sound
    this.music = this.sound.add("BGM", {
      loop: true,
    }).setVolume(0.3);this.music.play();

    //collectsound
        this.collectsound = this.sound.add("collect");

    //Step 3 - Create the map from main
    let map = this.make.tilemap({key:'island'}); //or var map 也可以，然后那个key的字，跟着你上面那个step1的world1，要一样的名字！因为是connect的！

    // Step 4 Load the game tiles
    // 1st parameter is name in Tiled,
    // 2nd parameter is key in Preload
 //前面的“”要跟着你在tilemap里面放的那个tileset名字，后面的“”跟着你上面load image取得名字a.k.a第一个“”）
    let forest2 = map.addTilesetImage("forest2", "forest2");
    let forest3 = map.addTilesetImage("forest3", "forest3");

    let tilesArray = [forest2, forest3 ] //这个是tilesArray是方便你不用下面一个个打出来，直接load完你全部的tileset）（看下一个step）

    // Step 5  Load in layers by  yers (一层一层加layer，从最底层的layer a.k.a第一个layer开始load进来）
    this.groundlayer = map.createLayer("groundlayer", tilesArray, 0, 0); //layer的名字要跟你在tilemap里面取的layer名字一样！，后面tilesArray就是你直接load你的tileset进来了）
    this.grasslayer = map.createLayer("grasslayer", tilesArray, 0, 0);
    this.treelayer = map.createLayer("treelayer", tilesArray, 0, 0);
    this.cavelayer = map.createLayer("cavelayer", tilesArray, 0, 0);

    // //iterm animation
this.anims.create({
  key: 'co',
  frames: [
  { key: 'co', frame: "co-05"},
  { key: 'co', frame: "co-03"},
  { key: 'co', frame: "co-04"},
  { key: 'co', frame: "co-02"},
  { key: 'co', frame: "co-01"},
  
   ],
  frameRate: 6,
  repeat: -1
  })  

      
    this.anims.create({ //这个是放你character animation的地方
      key: 'left',
      frames: [
        { key: 'left', frame: 'Pwc -01'}, //（你那个frame的顺序和字要去你export出来的json file看是什么，然后要完全一模一样跟着写！）
        { key: 'left', frame: 'Pwc -02'},
        { key: 'left', frame: 'Pwc -03'},
        { key: 'left', frame: 'Pwc -05'},
        { key: 'left', frame: 'Pwc -04'},

      ],
      frameRate: 6, //（这个是你character移动的速度、or应该说是movement速度也可以，反正，就是速度，可自行调噢）
      repeat: -1
    })

    this.anims.create({
      key: 'right',
      frames: [
        { key: 'right', frame: 'Pwc -08'},
        { key: 'right', frame: 'Pwc -09'},
        { key: 'right', frame: 'Pwc -07'},
        { key: 'right', frame: 'Pwc -06'},
        { key: 'right', frame: 'Pwc -10'},

      ],
      frameRate: 6,
      repeat: -1
    })



    this.anims.create({
      key: 'up',
      frames: [
        { key: 'up', frame: 'Pwb-02'},
        { key: 'up', frame: 'Pwb-04'},
        { key: 'up', frame: 'Pwb-01'},
        { key: 'up', frame: 'Pwb-03'},
      ],
      frameRate: 6,
      repeat: -1
    })

     this.anims.create({
      key: 'down',
      frames: [
        { key: 'down', frame: 'Pwf-02'},
        { key: 'down', frame: 'Pwf-04'},
        { key: 'down', frame: 'Pwf-01'},
        { key: 'down', frame: 'Pwf-03'},
      ],
      frameRate: 6,
      repeat: -1
    })

    //this.physics.world.bounds.width = this.groundLayer.width; //这个应该也是set你character不会跑出去一个地方的，but with layer？不是很确定
    //this.physics.world.bounds.height = this.groundLayer.height; //我的好像不能用这个

    // // Object layers
    // var startPoint = map.findObject(
    //   "Spawnlayer",
    //   (obj) => obj.name === "startPoint"
    // );    
    // var endPoint = map.findObject(
    //   "objectLayer",
    //   (obj) => obj.name === "endPoint"
    // );

    var start = map.findObject("Spawnlayer",(obj) => obj.name === "start");
  
    // this.player = this.physics.add.sprite(1581.8999999999933, 2452.566666666674, 'up').setScale(0.30);

    this.player = this.physics.add.sprite(
      this.playerPos.x,
      this.playerPos.y,
      this.playerPos.dir
  ).setScale(0.3)
    window.player = this.player;
    this.physics.world.bounds.width = this.groundlayer.width;
    this.physics.world.bounds.height = this.groundlayer.height;
    this.player.setCollideWorldBounds(true); // don't go out of the this.map （set character不会跑出去map，true就是不会，改成false就会）

    // // create the arrow keys
     this.cursors = this.input.keyboard.createCursorKeys();

    // // camera follow player （这个就是如果你的map size大过你的game size然后你在网站开出来的时候显示不完整个地图的时候你可以加这个，镜头会跟着你的character移动！）
    // this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
    this.cameras.main.startFollow(this.player);



    this.treelayer.setCollisionByExclusion(-1, true) //（额，这个setCollisionByExclusion在你layer的好像是如果你加了的话，你的character就不会穿过这些东西，就会block它啦）


    this.physics.add.collider(this.player, this.treelayer); //这个，应该，也是跟上面一样set Collider的，but你应该是要加这个才可以真的不会撞到？所以应该是一起的
    this.physics.add.collider(this.player, this.Stonelayer);
 

  //scoreText
  this.coScore = this.add.text(52, 260, window.co + ' Chest Collected ', { 
    fontSize: '20px', 
    fill: '000000', 
    }).setScrollFactor(0);

  }
  /////////////////// end of create //////////////////////////////

//to cavea
update() {
  // Enter cavea
  if (
    this.player.x > 2110 &&
    this.player.x < 2130 &&
    this.player.y < 1520 &&
    this.player.y > 1480
  ) {
    this.cavea();
  }
  //to caveb

    // Enter caveb
    if (
      this.player.x > 760 &&
      this.player.x < 800 &&
      this.player.y < 940 &&
      this.player.y > 920
    ) {
      this.caveb();
    }
    // Enter cavec
        if (
          this.player.x > 2010 &&
          this.player.x < 2050 &&
          this.player.y < 350 &&
          this.player.y > 320
        ) {
          this.cavec();
        }

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
    //Score
    window.co = window.co ;
    console.log(" Chest Collected ", window.co);

    this.coScore.setText(  window.co + ' Chest Collected ');
  } /////////////////// end of update //////////////////////////////
  


  // Function to jump to cave A

  world(player, tile) {
    console.log("world function");
  }

  cavea(player, tile) {
    console.log("world function");
    let playerPos = {};
    playerPos.x = 381;
    playerPos.y = 2468;
    playerPos.dir = "down";

    this.scene.start("world", { playerPos: playerPos });
  }

  cavea(player, tile) {
    console.log("cavea function");
  }

  cavea(player, tile) {
    console.log("cavea function");
    let playerPos = {};
    playerPos.x = 383;
    playerPos.y = 159;
    playerPos.dir = "down";

    this.scene.start("cavea", { playerPos: playerPos });
  }

  // Function to jump to cave B
  caveb(player, tile) {
    console.log("caveb function");
  }

  caveb(player, tile) {
    console.log("caveb function");
    let playerPos = {};
    playerPos.x = 88;
    playerPos.y = 148;
    playerPos.dir = "down";

    this.scene.start("caveb", { playerPos: playerPos });
  }

   // Function to jump to cave C
   cavec(player, tile) {
    console.log("cavec function");
  }

  cavec(player, tile) {
    console.log("cavec function");
    let playerPos = {};
    playerPos.x = 404;
    playerPos.y = 116;
    playerPos.dir = "up";

    this.scene.start("cavec", { playerPos: playerPos });
  }

}//////////// end of class world ///////////////////////

