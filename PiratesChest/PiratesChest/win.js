class win extends Phaser.Scene {
  constructor() {
    super({
      key: "win",
    });

    // Put global variable here
  }

  preload() {

    this.load.image("win","assets/win.jpg");

  }

  create() {
    console.log("*** win scene");

    // Add image and detect spacebar keypress
    this.add.image(0, 0, 'win').setOrigin(0, 0);

    // Check for spacebar or any key here
    var spaceDown = this.input.keyboard.addKey("SPACE");

    // On spacebar event, call the world scene
    spaceDown.on(
      "down",
      function () {
        console.log("Jump to start scene");
        this.scene.start( "start");
      },
      this
    );
    }}