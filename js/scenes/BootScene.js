class BootScene extends Phaser.Scene {
    constructor() {
        super({ key: 'BootScene' });
    }

    preload() {
        // This is where we will load our assets
        console.log('BootScene: preload');
        // For now, we'll just show a loading message
        this.add.text(400, 300, 'Loading assets...', { fontSize: '32px', fill: '#fff' }).setOrigin(0.5);
    }

    create() {
        console.log('BootScene: create');
        this.scene.start('GameScene');
    }
}
