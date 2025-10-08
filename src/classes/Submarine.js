// Classe Submarine: representa o jogador
export class Submarine {
    constructor(x, y, assets, upgrades) {
        this.x = x;
        this.y = y;
        this.width = 64;
        this.height = 32;
        this.speed = 4;
        this.acceleration = 0.2;
        this.dy = 0;
        this.lives = upgrades.shield ? 2 : 1;
        this.assets = assets;
        this.upgrades = upgrades;
    }

    update(input, canvasHeight) {
        // Controle vertical
        if (input.up) this.dy -= this.acceleration * (this.upgrades.engine ? 1.5 : 1);
        if (input.down) this.dy += this.acceleration * (this.upgrades.engine ? 1.5 : 1);
        // Fricção
        this.dy *= 0.92;
        // Limite de velocidade
        const maxSpeed = this.speed * (this.upgrades.engine ? 1.5 : 1);
        this.dy = Math.max(-maxSpeed, Math.min(maxSpeed, this.dy));
        // Atualiza posição
        this.y += this.dy;
        // Limites da tela
        if (this.y < 0) this.y = 0;
        if (this.y + this.height > canvasHeight) this.y = canvasHeight - this.height;
    }

    draw(ctx) {
        // Desenho simplificado (substitua por imagem se disponível)
        if (this.assets.submarine) {
            ctx.drawImage(this.assets.submarine, this.x, this.y, this.width, this.height);
        } else {
            ctx.save();
            ctx.fillStyle = '#ffe066';
            ctx.fillRect(this.x, this.y, this.width, this.height);
            ctx.restore();
        }
    }
}
