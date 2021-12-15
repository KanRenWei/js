class cavec extends Phaser.Scene {

  constructor() {
      super({ key: 'cavec' });
      
      // Put global variable here
  }


  init(data) {
      // this.player = data.player
      // this.inventory = data.inventory

      this.playerPos = data.playerPos;
  }

  preload() {
  //step 1 load Json
      this.load.tilemapTiledJSON("cavec","assets/cavec.json");

  //load image
  this.load.image("forest2","assets/forest2.png");
  this.load.image("forest3","assets/forest3.png");

  //  //npc / enemy
   this.load.atlas( 'co', 'assets/co.png', 'assets/co.json');
  //  this.load.atlas( 'item2', 'assets/item2.png', 'assets/item2.json');

  }

  create() {
      console.log('*** cavec scene');

      let map = this.make.tilemap({key: "cavec"});

       //collectsound
       this.collectsound = this.sound.add("collect");

  // //collectsound
  //     this.collectsound = this.sound.add("collect");

      let forest2Tiles = map.addTilesetImage("forest2", "forest2");
      let forest3Tiles = map.addTilesetImage("forest3", "forest3");

      let tilesArray = [ forest2Tiles,forest3Tiles ]

      this.groundlayer = map.createLayer("groundlayer",tilesArray, 0, 0);
      this.walllayer = map.createLayer("walllayer",tilesArray, 0, 0);
      this.decolayer = map.createLayer("decolayer",tilesArray, 0, 0);


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

// this.anims.create({
//       key: 'item2',
//       frames: [
//       { key: 'item2', frame: "item-06"},
//       { key: 'item2', frame: "item-31"},
      
//        ],
//       frameRate: 6,
//       repeat: -1
//       }) 


  // this.physics.world.bounds.width = this.groundlayer.width; 
  // this.physics.world.bounds.height = this.groundlayer.height;

  // this.player = this.physics.add.sprite(400.1, 116.1, "down").setScale(0.30);

  this.player = this.physics.add.sprite(
    this.playerPos.x,
    this.playerPos.y,
    this.playerPos.dir
).setScale(0.3)

  //enable debug
  window.player = this.player;


  this.player.setCollideWorldBounds(true); // don't go out of the this.map 

  // // create the arrow keys
   this.cursors = this.input.keyboard.createCursorKeys();

  // // camera follow player 
  this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
  this.cameras.main.startFollow(this.player);

  this.walllayer.setCollisionByExclusion(-1, true)
  this.decolayer.setCollisionByExclusion(-1, true)


  this.physics.add.collider(this.player, this.walllayer);
  this.physics.add.collider(this.player, this.decolayer);

// //collect item and 它的位子 然后移除
  //collect item item1_remove
  this.co = this.physics.add.sprite(212,587,"co").play("co").setScale(0.3);
  //overlap_item1
  this.physics.add.overlap(this.player, this.co, this.collectco, null, this);

    //scoreText
    this.coScore = this.add.text(52, 180, window.co + ' Chest Collected ', { 
      fontSize: '20px', 
      fill: '000000', 
      }).setScrollFactor(0);


//   //collect item item2_remove
//   this.item2 = this.physics.add.sprite(1204, 531, 'item2').play("item2"); 
//   //overlap_item2
//   this.physics.add.overlap(this.player, this.item2, this.collectitem2, null, this);
  }

  update() {

    // go to world
    
    if (this.player.x > 443 && this.player.x < 459 && this.player.y > 148 && this.player.y < 178 ) {
      this.world();
    }

    if ( this.player.x > 212
      && this.player.y > 564 && this.player.y < 587 ) {
          this.win();
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
    }

          // Function to jump to win
          win(player, tile) {
            console.log("win function");
            this.scene.start("win");
     }

   

  //  collectco(player,co)
  //       {
  //         console.log("collectco");
  //       co.disableBody(true,true);
  //       this.collectsound.play();
  //       }

  

          //Function to jump to worldmap

          world(player, tile) {
            console.log("world function");
            let playerPos = {};
            playerPos.x = 2160;
            playerPos.y = 1520;
            playerPos.dir = "down";
        
            this.scene.start("world", { playerPos: playerPos });
          }
        
        
        collectco (player, co){
          console.log("collectco");
          co.disableBody(true,true);
          this.collectsound.play();

          window.co = window.co + 1;
          console.log("chest collected", window.co);
  
          this.coScore.setText(  window.co + ' chest collected ');
  
          // window.co = window.co + 1;
          // console.log("/5 ", window.co);
  
          // this.pumpkinScore.setText(  window.co + '/5 ');
  
      }
    


      // // // Function to jump to library
      // map4(player, tile) {
      //     console.log("map4 function");
      //     this.scene.start("map4");
      // }

  // //collect item
  //     collectitem(player,item1)
  //     {
  //     item1.disableBody(true,true);
  //     this.collectsound.play();
  //     }

  //     collectitem2(player,item2)
  //     {
  //     item2.disableBody(true,true);
  //     this.collectsound.play();
  //     }

    }
