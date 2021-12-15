class control extends Phaser.Scene {
  constructor() {
    super({
      key: "control",
    });

    // Put global variable here
  }

  preload() {

    this.load.image("control","assets/control.jpg");

  }

  create() {
    console.log("*** control scene");

    // Add image and detect spacebar keypress
    this.add.image(0, 0, 'control').setOrigin(0, 0);

    // Check for spacebar or any key here
    var spaceDown = this.input.keyboard.addKey("SPACE");

    // On spacebar event, call the world scene
    spaceDown.on(
      "down",
      function () {
        console.log("Jump to preload scene");
        this.scene.start( "preload");
      },
      this
    );
    }}