class GameScene extends Phaser.Scene {
    constructor() {
        super({ key: 'GameScene' });
        this.player = null;
        this.cursors = null;
        this.bullets = null;
        this.enemies = null;
        this.score = 0;
        this.scoreText = null;
        this.lastFired = 0;
    }

    create() {
        // Player
        this.player = this.physics.add.sprite(400, 500, 'player');
        this.player.setCollideWorldBounds(true);

        // Controls
        this.cursors = this.input.keyboard.createCursorKeys();

        // Bullets
        this.bullets = this.physics.add.group({
            defaultKey: 'bullet',
            maxSize: 10
        });

        // Enemies
        this.enemies = this.physics.add.group({
            defaultKey: 'enemy',
            runChildUpdate: true
        });

        // Score
        this.scoreText = this.add.text(16, 16, 'Score: 0', { fontSize: '32px', fill: '#fff' });

        // Collisions
        this.physics.add.collider(this.bullets, this.enemies, this.hitEnemy, null, this);
        this.physics.add.collider(this.player, this.enemies, this.hitPlayer, null, this);

        // Spawn enemies
        this.time.addEvent({
            delay: 1000,
            callback: this.spawnEnemy,
            callbackScope: this,
            loop: true
        });
    }

    update(time, delta) {
        // Player movement
        this.player.setVelocity(0);

        if (this.cursors.left.isDown) {
            this.player.setVelocityX(-300);
        } else if (this.cursors.right.isDown) {
            this.player.setVelocityX(300);
        }

        // Player shooting
        if (this.cursors.space.isDown && time > this.lastFired) {
            const bullet = this.bullets.get(this.player.x, this.player.y - 30);

            if (bullet) {
                bullet.setActive(true);
                bullet.setVisible(true);
                bullet.body.velocity.y = -500;
                this.lastFired = time + 100;
            }
        }

        // Remove bullets that are out of bounds
        this.bullets.children.each(function(bullet) {
            if (bullet.active && bullet.y < 0) {
                bullet.setActive(false);
                bullet.setVisible(false);
            }
        }.bind(this));
    }

    spawnEnemy() {
        const x = Phaser.Math.Between(50, 750);
        const enemy = this.enemies.get(x, 0);

        if (enemy) {
            enemy.setActive(true);
            enemy.setVisible(true);
            enemy.body.velocity.y = 100;
        }
    }

    hitEnemy(bullet, enemy) {
        bullet.setActive(false);
        bullet.setVisible(false);
        enemy.setActive(false);
        enemy.setVisible(false);

        this.score += 10;
        this.scoreText.setText('Score: ' + this.score);
    }

    hitPlayer(player, enemy) {
        this.physics.pause();
        player.setTint(0xff0000);
        this.scene.start('GameOverScene', { score: this.score });
    }
}