import { Submarine } from './Submarine.js';
import { Mine } from './Mine.js';
import { Coin } from './Coin.js';
import { CollisionManager } from './CollisionManager.js';
import { HUD } from '../ui/HUD.js';
import { UpgradePanel } from '../ui/UpgradePanel.js';

export class GameState {
    constructor(canvas, hudElem, upgradeElem) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.hudElem = hudElem;
        this.upgradeElem = upgradeElem;
        this.assets = {};
        this.input = { up: false, down: false };
        this.submarine = null;
        this.mines = [];
        this.coins = [];
        this.score = 0;
        this.coinsCollected = 0;
        this.spawnTimer = 0;
        this.spawnInterval = 80;
        this.mineSpeed = 3;
        this.difficultyTimer = 0;
        this.upgrades = { engine: false, shield: false };
        this.hud = new HUD(hudElem);
        this.upgradePanel = new UpgradePanel(upgradeElem, this.upgrades, () => this.applyUpgrade());
        this.gameOver = false;
        this.loadAssets().then(() => this.init());
    }

    async loadAssets() {
        // Carrega imagens (substitua por assets reais se disponíveis)
        const loadImg = src => new Promise(res => {
            const img = new window.Image();
            img.src = src;
            img.onload = () => res(img);
            img.onerror = () => res(null);
        });
        this.assets.submarine = await loadImg('assets/images/submarine.png');
        this.assets.mine = await loadImg('assets/images/mine.png');
        this.assets.coin = await loadImg('assets/images/coin.png');
    }

    init() {
        this.submarine = new Submarine(48, this.canvas.height / 2 - 16, this.assets, this.upgrades);
        this.hud.update(this.score, this.coinsCollected, this.submarine.lives);
        this.addListeners();
        this.loop();
    }

    addListeners() {
        window.addEventListener('keydown', e => {
            if (e.code === 'ArrowUp' || e.code === 'KeyW') this.input.up = true;
            if (e.code === 'ArrowDown' || e.code === 'KeyS') this.input.down = true;
            if (e.code === 'KeyU') this.toggleUpgradePanel();
        });
        window.addEventListener('keyup', e => {
            if (e.code === 'ArrowUp' || e.code === 'KeyW') this.input.up = false;
            if (e.code === 'ArrowDown' || e.code === 'KeyS') this.input.down = false;
        });
    }

    toggleUpgradePanel() {
        this.upgradePanel.toggle(this.coinsCollected);
    }

    applyUpgrade() {
        // Compra upgrades se houver moedas suficientes
        if (this.upgradePanel.selected === 'engine' && this.coinsCollected >= 10 && !this.upgrades.engine) {
            this.upgrades.engine = true;
            this.coinsCollected -= 10;
        }
        if (this.upgradePanel.selected === 'shield' && this.coinsCollected >= 15 && !this.upgrades.shield) {
            this.upgrades.shield = true;
            this.coinsCollected -= 15;
        }
        this.submarine.upgrades = this.upgrades;
        this.submarine.lives = this.upgrades.shield ? 2 : 1;
        this.upgradePanel.selected = null;
        this.upgradePanel.toggle(this.coinsCollected);
    }

    loop() {
        if (this.gameOver) return;
        this.update();
        this.draw();
        requestAnimationFrame(() => this.loop());
    }

    update() {
        // Atualiza score
        this.score++;
        // Dificuldade progressiva
        this.difficultyTimer++;
        if (this.difficultyTimer % 300 === 0) {
            this.mineSpeed += 0.5;
            this.spawnInterval = Math.max(40, this.spawnInterval - 5);
        }
        // Submarino
        this.submarine.update(this.input, this.canvas.height);
        // Spawn procedural de minas
        this.spawnTimer++;
        if (this.spawnTimer >= this.spawnInterval) {
            this.spawnTimer = 0;
            const y = Math.random() * (this.canvas.height - 32);
            this.mines.push(new Mine(this.canvas.width, y, this.mineSpeed, this.assets));
            // Spawn de moeda ocasional
            if (Math.random() < 0.3) {
                this.coins.push(new Coin(this.canvas.width, Math.random() * (this.canvas.height - 24), this.mineSpeed, this.assets));
            }
        }
        // Atualiza minas e moedas
        this.mines.forEach(m => m.update());
        this.coins.forEach(c => c.update());
        // Remove entidades inativas
        this.mines = this.mines.filter(m => m.active);
        this.coins = this.coins.filter(c => c.active);
        // Colisão submarino-mina
        for (const mine of this.mines) {
            if (CollisionManager.aabb(this.submarine, mine)) {
                mine.active = false;
                this.submarine.lives--;
                if (this.submarine.lives <= 0) {
                    this.gameOver = true;
                    this.hud.showGameOver(this.score);
                }
            }
        }
        // Colisão submarino-moeda
        for (const coin of this.coins) {
            if (CollisionManager.aabb(this.submarine, coin)) {
                coin.active = false;
                this.coinsCollected++;
            }
        }
        // Atualiza HUD
        this.hud.update(this.score, this.coinsCollected, this.submarine.lives);
    }

    draw() {
        // Limpa tela
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        // Desenha entidades
        this.submarine.draw(this.ctx);
        this.mines.forEach(m => m.draw(this.ctx));
        this.coins.forEach(c => c.draw(this.ctx));
    }
}
