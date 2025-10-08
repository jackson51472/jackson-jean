// Entry point do jogo
import { GameState } from './classes/GameState.js';

window.onload = () => {
    const canvas = document.getElementById('gameCanvas');
    const hud = document.getElementById('hud');
    const upgradePanel = document.getElementById('upgradePanel');
    new GameState(canvas, hud, upgradePanel);
};
