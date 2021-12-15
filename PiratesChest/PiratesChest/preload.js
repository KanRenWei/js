class preload extends Phaser.Scene {
  constructor() {
    super({
      key: "preload",
    });

    // Put global variable here
  }

  preload() {
    //collect sound
    this.load.audio("collect","assets/chestmp3.mp3");

    //background music
    this.load.audio("BGM","assets/piratemusic.mp3");
  }



  create() {
    console.log("*** preload scene");

    // Add any sound and music here
    // ( 0 = mute to 1 is loudest )
    //this.music = this.sound.add('bgMusic').setVolume(0.3) // 10% volume

    //this.music.play()
    //window.music = this.music

    // Add image and detect spacebar keypress
    //this.add.image(0, 0, 'main').setOrigin(0, 0);

    // Check for spacebar or any key here
    var spaceDown = this.input.keyboard.addKey("SPACE");

    // key1.on("down", function(){
    //   let playerPos = {};
    //   playerPos.x = 592;
    //   playerPos.y = 1037;
    //   playerPos.dir = "down";
    //   this.scene.start("computerlab",{ playerPos : playerPos });
    // },
    // this
    // );

    // On spacebar event, call the world scene
    spaceDown.on(
      "down",
      function () {
        console.log("Jump to world scene");
        let playerPos = {};
        playerPos.x = 371;
        playerPos.y = 2468;
        playerPos.dir = "down";

        this.scene.start(
          "world",{ playerPos : playerPos }
          // Optional parameters
          // {}
        );
      },
      this
    );

    // Add any text in the main page
    this.add.text(90, 600, "Press spacebar to continue", {
      font: "30px Courier",
      fill: "#000000",
    });

    // Create all the game animations here
  }
}
