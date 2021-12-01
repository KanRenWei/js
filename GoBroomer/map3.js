class map3 extends Phaser.Scene {

    constructor() {
        super({ key: 'map3' });
        
        // Put global variable here
    }


    init(data) {
        this.player = data.player
        this.inventory = data.inventory

        this.playerPos = data.playerPos;
    }

    preload() {
    //step 1 load Json
        this.load.tilemapTiledJSON("map33","assets/Map_3.json");

    //load image
    this.load.image("popiya1","assets/pippoya.png");
    this.load.image("popiya2","assets/pippoya2.png");

     //npc / enemy
     this.load.atlas( 'item1', 'assets/item1.png', 'assets/item1.json');

    }

    create() {
        console.log('*** map3 scene');

        let map = this.make.tilemap({key: "map33"});

        let pippoyaTiles = map.addTilesetImage("popiya1", "popiya1");
        let pippoya2Tiles = map.addTilesetImage("popiya2", "popiya2");

        let tilesArray = [ pippoyaTiles,pippoya2Tiles ]

        this.groundLayer = map.createLayer("groundLayer",tilesArray, 0, 0);
        this.gfLayer = map.createLayer("gfLayer",tilesArray, 0, 0);
        this.rockLayer = map.createLayer("rockLayer",tilesArray, 0, 0);
        this.treeLayer = map.createLayer("treeLayer",tilesArray, 0, 0);

 //iterm1
 this.anims.create({
    key: 'item1',
    frames: [
    { key: 'item1', frame: "item-05"},
    { key: 'item1', frame: "item-32"},
    
     ],
    frameRate: 6,
    repeat: -1
    })       

    this.physics.world.bounds.width = this.groundLayer.width; 
    this.physics.world.bounds.height = this.groundLayer.height;

    this.player = this.physics.add.sprite(44, 302, "right");

//iterm
   this.add.sprite(350, 100, "item1").play("item1");

    //enable debug
    window.player = this.player;


    this.player.setCollideWorldBounds(true); // don't go out of the this.map 

    // // create the arrow keys
     this.cursors = this.input.keyboard.createCursorKeys();

    // // camera follow player 
    this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
    this.cameras.main.startFollow(this.player);

    this.rockLayer.setCollisionByExclusion(-1, true)
    this.treeLayer.setCollisionByExclusion(-1, true)


    this.physics.add.collider(this.player, this.rockLayer);
    this.physics.add.collider(this.player, this.treeLayer);
  
    
        
    }

    update() {

    // go to map2
    if ( this.player.x < 27
        && this.player.y > 272 && this.player.y < 367 ) {
            this.map2();
        }

    // //go to map3
    if ( this.player.x > 1275
        && this.player.y > 336 && this.player.y < 419 ) {
            this.map4();
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

        // Function to jump to worldmap

        map2(player, tile) {
            console.log("map2 function");
            this.scene.start("map2");
     }

        // // Function to jump to library
        map4(player, tile) {
            console.log("map4 function");
            this.scene.start("map4");
        }

    

}
