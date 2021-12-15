class start extends Phaser.Scene {
  constructor() {
    super({
      key: "start",
    });

    // Put global variable here
  }

  preload() {

    this.load.image("start","assets/start4.jpg");

  }

  create() {
    console.log("*** start scene");

    // Add image and detect spacebar keypress
    this.add.image(0, 0, 'start').setOrigin(0, 0);

    // Check for spacebar or any key here
    var spaceDown = this.input.keyboard.addKey("SPACE");

    // On spacebar event, call the world scene
    spaceDown.on(
      "down",
      function () {
        console.log("Jump to storyline scene");
        this.scene.start( "storyline");
      },
      this
    );
    }}