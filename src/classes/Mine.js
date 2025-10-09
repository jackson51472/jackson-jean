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
    this.x = x
    this.y = y
    this.width = 32
    this.height = 32
    this.speed = speed
    this.assets = assets
    this.active = true // Se false, será removida do jogo
  }

  /**
   * Atualiza a posição da mina a cada frame
   * Move para a esquerda e desativa se sair da tela
   */
  update() {
    this.x -= this.speed
    if (this.x + this.width < 0) this.active = false
  }

  /**
   * Desenha a mina no canvas
   * Se houver sprite, usa imagem; senão, desenha círculo vermelho
   */
  draw(ctx) {
    if (this.assets.mine) {
      ctx.drawImage(this.assets.mine, this.x, this.y, this.width, this.height)
      return // quando há asset, não aplicar overlay
    } else {
      ctx.save()
      ctx.fillStyle = "#c0392b"
      ctx.beginPath()
      ctx.arc(
        this.x + this.width / 2,
        this.y + this.height / 2,
        Math.min(this.width, this.height) / 2,
        0,
        Math.PI * 2
      )
      ctx.fill()
      ctx.restore()
    }

    // Overlay: ícone de mina (cruz com pontas e núcleo cinza) canto superior direito
    const iconSize = Math.max(8, Math.min(14, this.width * 0.5))
    const cx = this.x + this.width - 4 - iconSize / 2
    const cy = this.y + 4 + iconSize / 2
    const arm = iconSize * 0.45
    ctx.save()
    // Braços (cruz)
    ctx.strokeStyle = "#531a16"
    ctx.lineWidth = Math.max(1, iconSize * 0.14)
    ctx.beginPath()
    ctx.moveTo(cx - arm, cy)
    ctx.lineTo(cx + arm, cy)
    ctx.moveTo(cx, cy - arm)
    ctx.lineTo(cx, cy + arm)
    ctx.stroke()
    // Núcleo
    ctx.beginPath()
    ctx.fillStyle = "#7f8c8d"
    ctx.arc(cx, cy, iconSize * 0.28, 0, Math.PI * 2)
    ctx.fill()
    ctx.restore()
  }
}
