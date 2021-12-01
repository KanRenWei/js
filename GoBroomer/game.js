var config = {
    type: Phaser.AUTO,
    // pixel size * tile map size * zoom 
    width: 32 * 15,
    height: 32 * 15,
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
    scene: [preload, world, map2, map3, map4]//load你的scene
};

var game = new Phaser.Game(config);