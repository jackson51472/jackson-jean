// Classe Submarine: representa o jogador
export class Submarine {
  constructor(x, y, assets, upgrades) {
    this.x = x
    this.y = y
    // Tamanho lógico na tela
    this.width = 64
    this.height = 32
    // Movimento
    this.speed = 4
    this.acceleration = 0.2
    this.dy = 0
    this.lives = upgrades.shield ? 2 : 1
    this.assets = assets
    this.upgrades = upgrades

    // Spritesheet (Opção A: 4 colunas x 3 linhas, 64x32 por frame)
    this.sheet = assets.playerSheet || null
    this.sheetLoaded = !!this.sheet
    this.frameW = 64 // larguraFrame
    this.frameH = 32 // alturaFrame
    this.cols = 4
    this.rows = 3

    // Animações: idle (row 0), run (row 1), shoot (row 2)
    this.animations = {
      idle: { row: 0, from: 0, to: 3, fps: 6, loop: true },
      run: { row: 1, from: 0, to: 3, fps: 10, loop: true },
      shoot: { row: 2, from: 0, to: 3, fps: 12, loop: false },
    }
    this.state = "idle"
    this.frameIndex = this.animations[this.state].from
    this.frameTimer = 0 // ms acumulados
    this.frameDuration = 1000 / this.animations[this.state].fps // ms por frame
    this.shootingTimer = 0 // ms restantes do estado de tiro
  }

  setState(name) {
    if (this.state === name) return
    this.state = name
    const anim = this.animations[this.state]
    this.frameIndex = anim.from
    this.frameTimer = 0
    this.frameDuration = 1000 / anim.fps
  }

  shoot() {
    if (!this.sheetLoaded) return // sem sheet, ignore animação de shoot
    const anim = this.animations.shoot
    this.setState("shoot")
    this.shootingTimer = ((anim.to - anim.from + 1) / anim.fps) * 1000 // ms
  }

  update(input, canvasHeight, dt = 16) {
    // Controle vertical
    if (input.up)
      this.dy -= this.acceleration * (this.upgrades.engine ? 1.5 : 1)
    if (input.down)
      this.dy += this.acceleration * (this.upgrades.engine ? 1.5 : 1)
    // Fricção
    this.dy *= 0.92
    // Limite de velocidade
    const maxSpeed = this.speed * (this.upgrades.engine ? 1.5 : 1)
    this.dy = Math.max(-maxSpeed, Math.min(maxSpeed, this.dy))
    // Atualiza posição
    this.y += this.dy
    // Limites da tela
    if (this.y < 0) this.y = 0
    if (this.y + this.height > canvasHeight) this.y = canvasHeight - this.height

    // Atualiza estado (idle/run ou mantém shoot até acabar o timer)
    if (this.sheetLoaded) {
      if (this.shootingTimer > 0) {
        this.shootingTimer -= dt
        if (this.shootingTimer <= 0) {
          const moving = Math.abs(this.dy) > 0.2 || input.up || input.down
          this.setState(moving ? "run" : "idle")
        }
      } else {
        const moving = Math.abs(this.dy) > 0.2 || input.up || input.down
        this.setState(moving ? "run" : "idle")
      }

      // Controle de frames
      const anim = this.animations[this.state]
      this.frameTimer += dt
      while (this.frameTimer >= this.frameDuration) {
        this.frameTimer -= this.frameDuration
        if (this.frameIndex < anim.to) {
          this.frameIndex++
        } else if (anim.loop) {
          this.frameIndex = anim.from
        } else {
          this.frameIndex = anim.to // mantém último frame
        }
      }
    }
  }

  draw(ctx) {
    if (this.sheetLoaded) {
      const anim = this.animations[this.state]
      const col = this.frameIndex % this.cols
      const sx = col * this.frameW
      const sy = anim.row * this.frameH
      const sw = this.frameW
      const sh = this.frameH
      const dx = this.x
      const dy = this.y
      const dw = this.width
      const dh = this.height
      ctx.drawImage(this.sheet, sx, sy, sw, sh, dx, dy, dw, dh)
    } else if (this.assets.submarine) {
      // Fallback: sprite estático simples
      ctx.drawImage(
        this.assets.submarine,
        this.x,
        this.y,
        this.width,
        this.height
      )
    } else {
      // Fallback: retângulo
      ctx.save()
      ctx.fillStyle = "#ffe066"
      ctx.fillRect(this.x, this.y, this.width, this.height)
      ctx.restore()
    }
  }
}
