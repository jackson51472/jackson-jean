// HUD: exibe pontuação, moedas e vidas
export class HUD {
    constructor(elem) {
        this.elem = elem;
    }
    update(score, coins, lives) {
        this.elem.innerHTML = `Pontuação: <b>${score}</b> | Moedas: <b>${coins}</b> | Vidas: <b>${lives}</b>`;
    }
    showGameOver(score) {
        this.elem.innerHTML = `<span style='color:#ff4c4c'>GAME OVER</span><br>Pontuação Final: <b>${score}</b><br><button onclick='location.reload()'>Reiniciar</button>`;
    }
}
