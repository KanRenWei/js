class rule extends Phaser.Scene {
  constructor() {
    super({
      key: "rule",
    });

    // Put global variable here
  }

  preload() {

    this.load.image("rule","assets/rule.jpg");

  }

  create() {
    console.log("*** rule scene");

    // Add image and detect spacebar keypress
    this.add.image(0, 0, 'rule').setOrigin(0, 0);

    // Check for spacebar or any key here
    var spaceDown = this.input.keyboard.addKey("SPACE");

    // On spacebar event, call the world scene
    spaceDown.on(
      "down",
      function () {
        console.log("Jump to control scene");
        this.scene.start( "control");
      },
      this
    );
    }}