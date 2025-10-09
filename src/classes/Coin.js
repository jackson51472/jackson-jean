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
    this.x = x
    this.y = y
    this.width = 24
    this.height = 24
    this.speed = speed
    this.assets = assets
    this.active = true // Se false, será removida do jogo
  }

  /**
   * Atualiza a posição da moeda a cada frame
   * Move para a esquerda e desativa se sair da tela
   */
  update() {
    this.x -= this.speed
    if (this.x + this.width < 0) this.active = false
  }

  /**
   * Desenha a moeda no canvas
   * Se houver sprite, usa imagem; senão, desenha círculo dourado
   */
  draw(ctx) {
    if (this.assets.coin) {
      ctx.drawImage(this.assets.coin, this.x, this.y, this.width, this.height)
      return // quando há asset, não aplicar overlay
    } else {
      ctx.save()
      ctx.fillStyle = "#ffd700"
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

    // Overlay: ícone de moeda (pequeno, canto superior esquerdo)
    const iconSize = Math.max(8, Math.min(14, this.width * 0.45))
    const r = iconSize * 0.45
    const cx = this.x + 4 + r
    const cy = this.y + 4 + r
    ctx.save()
    // Moeda: círculo dourado com aro e vinco central
    ctx.beginPath()
    ctx.fillStyle = "#ffdb4d"
    ctx.strokeStyle = "#b8860b"
    ctx.lineWidth = Math.max(1, iconSize * 0.12)
    ctx.arc(cx, cy, r, 0, Math.PI * 2)
    ctx.fill()
    ctx.stroke()
    // Vinco
    ctx.beginPath()
    ctx.strokeStyle = "#d4a017"
    ctx.moveTo(cx + r * 0.3, cy - r * 0.6)
    ctx.lineTo(cx + r * 0.3, cy + r * 0.6)
    ctx.stroke()
    ctx.restore()
  }
}
