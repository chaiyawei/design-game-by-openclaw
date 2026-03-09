class GameScene extends Phaser.Scene {
    constructor() {
        super({ key: 'GameScene' });
    }

    preload() {
        console.log('GameScene: preload');
    }

    create() {
        console.log('GameScene: create');
        this.add.text(400, 300, 'Game Scene', { fontSize: '64px', fill: '#fff' }).setOrigin(0.5);

        // Temporary: go to GameOver scene after 3 seconds
        this.time.delayedCall(3000, () => {
            this.scene.start('GameOverScene', { score: 1000 });
        });
    }

    update() {
        // Main game loop
    }
}
