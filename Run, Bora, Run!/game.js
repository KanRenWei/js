var config = {
    type: Phaser.AUTO,
    // pixel size * tile map size * zoom 
    width: 32 * 40,
    height: 32 * 25,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: false,
            debug: true, //这个最后最后的时候要关掉，所以那个红色的格子会没有掉
        }
    },
    scale: { //这个是responsive跟着你的screen的大小，会自动scale
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    backgroundColor: '#000000',
    pixelArt: true,
    scene: [preload, world, level1]
    //level1, level2, level3
};

var game = new Phaser.Game(config);