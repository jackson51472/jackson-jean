// Painel de upgrades simples
export class UpgradePanel {
    constructor(elem, upgrades, onUpgrade) {
        this.elem = elem;
        this.upgrades = upgrades;
        this.onUpgrade = onUpgrade;
        this.selected = null;
        this.elem.addEventListener('click', e => {
            if (e.target.dataset.upgrade) {
                this.selected = e.target.dataset.upgrade;
                this.onUpgrade();
            }
        });
    }
    toggle(coins) {
        if (this.elem.classList.contains('hidden')) {
            this.render(coins);
            this.elem.classList.remove('hidden');
        } else {
            this.elem.classList.add('hidden');
        }
    }
    render(coins) {
        this.elem.innerHTML = `
            <h3>Upgrades</h3>
            <button data-upgrade="engine" ${this.upgrades.engine ? 'disabled' : ''}>Propulsão Avançada (10 moedas)</button><br>
            <button data-upgrade="shield" ${this.upgrades.shield ? 'disabled' : ''}>Blindagem Reforçada (15 moedas)</button><br>
            <small>Moedas disponíveis: ${coins}</small>
            <br><span style='font-size:0.9em'>Pressione U para abrir/fechar</span>
        `;
    }
}
