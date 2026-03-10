class BootScene extends Phaser.Scene {
    constructor() {
        super({ key: 'BootScene' });
    }

    preload() {
        console.log('BootScene: preload');
        // Create a texture for the player
        this.make.graphics({ x: 0, y: 0, add: false }).fillStyle(0xffffff).fillRect(0, 0, 50, 50).generateTexture('player', 50, 50);

        // Create a texture for the enemy
        this.make.graphics({ x: 0, y: 0, add: false }).fillStyle(0xff0000).fillRect(0, 0, 50, 50).generateTexture('enemy', 50, 50);

        // Create a texture for the player's projectile
        this.make.graphics({ x: 0, y: 0, add: false }).fillStyle(0x00ff00).fillCircle(5, 5, 5).generateTexture('bullet', 10, 10);
    }

    create() {
        console.log('BootScene: create');
        this.scene.start('GameScene');
    }
}