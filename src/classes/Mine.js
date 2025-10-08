// Classe Mine: representa uma mina marítima (obstáculo)
// As minas causam dano ao submarino ao colidir
export class Mine {
    /**
     * Cria uma nova mina
     * @param {number} x - Posição horizontal inicial (spawn na lateral direita)
     * @param {number} y - Posição vertical inicial
     * @param {number} speed - Velocidade de movimento para a esquerda
     * @param {object} assets - Imagens/sprites do jogo
     */
    constructor(x, y, speed, assets) {
        this.x = x;
        this.y = y;
        this.width = 32;
        this.height = 32;
        this.speed = speed;
        this.assets = assets;
        this.active = true; // Se false, será removida do jogo
    }

    /**
     * Atualiza a posição da mina a cada frame
     * Move para a esquerda e desativa se sair da tela
     */
    update() {
        this.x -= this.speed;
        if (this.x + this.width < 0) this.active = false;
    }

    /**
     * Desenha a mina no canvas
     * Se houver sprite, usa imagem; senão, desenha círculo vermelho
     */
    draw(ctx) {
        if (this.assets.mine) {
            ctx.drawImage(this.assets.mine, this.x, this.y, this.width, this.height);
        } else {
            ctx.save();
            ctx.fillStyle = '#c0392b';
            ctx.beginPath();
            ctx.arc(this.x + 16, this.y + 16, 16, 0, Math.PI * 2);
            ctx.fill();
            ctx.restore();
        }
    }
}
