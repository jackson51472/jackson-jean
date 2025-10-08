// Classe Coin: representa uma moeda coletável no jogo
// As moedas são usadas para comprar upgrades e aumentam o score do jogador
export class Coin {
    /**
     * Cria uma nova moeda
     * @param {number} x - Posição horizontal inicial (spawn na lateral direita)
     * @param {number} y - Posição vertical inicial
     * @param {number} speed - Velocidade de movimento para a esquerda
     * @param {object} assets - Imagens/sprites do jogo
     */
    constructor(x, y, speed, assets) {
        this.x = x;
        this.y = y;
        this.width = 24;
        this.height = 24;
        this.speed = speed;
        this.assets = assets;
        this.active = true; // Se false, será removida do jogo
    }

    /**
     * Atualiza a posição da moeda a cada frame
     * Move para a esquerda e desativa se sair da tela
     */
    update() {
        this.x -= this.speed;
        if (this.x + this.width < 0) this.active = false;
    }

    /**
     * Desenha a moeda no canvas
     * Se houver sprite, usa imagem; senão, desenha círculo dourado
     */
    draw(ctx) {
        if (this.assets.coin) {
            ctx.drawImage(this.assets.coin, this.x, this.y, this.width, this.height);
        } else {
            ctx.save();
            ctx.fillStyle = '#ffd700';
            ctx.beginPath();
            ctx.arc(this.x + 12, this.y + 12, 12, 0, Math.PI * 2);
            ctx.fill();
            ctx.restore();
        }
    }
}
