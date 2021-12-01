class map4 extends Phaser.Scene {

    constructor() {
        super({ key: 'map4' });
        
        // Put global variable here
    }


    init(data) {
        this.player = data.player
        this.inventory = data.inventory

        this.playerPos = data.playerPos;
    }

    preload() {
    //step 1 load Json
        this.load.tilemapTiledJSON("map44","assets/Map_4.json");

    //load image
    this.load.image("popiya1","assets/pippoya.png");
    this.load.image("popiya2","assets/pippoya2.png");

    }

    create() {
        console.log('*** map4 scene');

        let map = this.make.tilemap({key: "map44"});

        let pippoyaTiles = map.addTilesetImage("popiya1", "popiya1");
        let pippoya2Tiles = map.addTilesetImage("popiya2", "popiya2");

        let tilesArray = [ pippoyaTiles,pippoya2Tiles ]

        this.groundLayer = map.createLayer("groundLayer",tilesArray, 0, 0);
        this.houseLayer = map.createLayer("houseLayerr",tilesArray, 0, 0);
        this.rockLayer = map.createLayer("rockLayer",tilesArray, 0, 0);
        this.treeLayer = map.createLayer("treeLayer",tilesArray, 0, 0);


    this.physics.world.bounds.width = this.groundLayer.width; 
    this.physics.world.bounds.height = this.groundLayer.height;

    this.player = this.physics.add.sprite(44, 302, "right");

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

    //go back to worldmap, check for blockA exit
    if ( this.player.x <37
        && this.player.y > 253 && this.player.y < 335 ) {
            this.map3();
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
        map3(player, tile) {
            console.log("map3 function");
            this.scene.start("map3");
     }
    

}
