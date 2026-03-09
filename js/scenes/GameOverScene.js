class GameOverScene extends Phaser.Scene {
    constructor() {
        super({ key: 'GameOverScene' });
    }

    init(data) {
        this.score = data.score || 0;
    }

    preload() {
        console.log('GameOverScene: preload');
    }

    create() {
        console.log('GameOverScene: create');
        this.add.text(400, 250, 'GAME OVER', { fontSize: '64px', fill: '#ff0000' }).setOrigin(0.5);
        this.add.text(400, 350, `Score: ${this.score}`, { fontSize: '32px', fill: '#fff' }).setOrigin(0.5);

        // Add a replay button
        const replayButton = this.add.text(400, 450, 'Play Again', { fontSize: '32px', fill: '#00ff00' })
            .setOrigin(0.5)
            .setInteractive();

        replayButton.on('pointerdown', () => {
            this.scene.start('GameScene');
        });
    }
}
