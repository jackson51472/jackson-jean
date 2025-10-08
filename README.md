dupla-sobrenome1-sobrenome2-tema

# Deep Diver: Submarine Runner

## Sobre o Jogo

Deep Diver: Submarine Runner é um jogo runner 2D vertical, onde você controla um submarino que deve desviar de minas marítimas e coletar moedas para comprar upgrades. O objetivo é sobreviver o máximo possível, acumulando pontos e moedas para melhorar seu submarino.

## Como Jogar

- **Movimentação:** Use as teclas **W/S** ou **Setas Cima/Baixo** para mover o submarino verticalmente.
- **Desviar:** Evite colidir com as minas que aparecem pela direita da tela.
- **Coletar Moedas:** Pegue moedas para acumular saldo e comprar upgrades.
- **Upgrades:** Pressione **U** para abrir/fechar o painel de upgrades. Compre melhorias usando moedas:
	- **Propulsão Avançada:** Aumenta a velocidade e aceleração vertical.
	- **Blindagem Reforçada:** Permite resistir a mais colisões (vidas extras).
- **Game Over:** Ao perder todas as vidas, clique em "Reiniciar" para jogar novamente.

## Controles

- **W / S** ou **Seta Cima / Seta Baixo**: Movimenta o submarino para cima/baixo
- **U**: Abre/fecha o painel de upgrades
- **Mouse**: Clique em "Iniciar Jogo" ou "Reiniciar" para começar ou reiniciar a partida

## Como o Jogo Foi Feito

- **Tecnologias:** HTML5, CSS3 e JavaScript puro, utilizando a **Canvas API** para renderização gráfica.
- **Arquitetura:** Estrutura modular orientada a objetos, com classes separadas para Submarino, Mina, Moeda, Gerenciador de Colisões, Estado do Jogo e UI.
- **Game Loop:** Utiliza `requestAnimationFrame` para garantir animação suave e alta performance.
- **Geração Procedural:** Minas e moedas são geradas de forma procedural, com dificuldade progressiva.
- **Sistema de Upgrades:** Implementado via painel de UI, com lógica de compra e aplicação dos upgrades.
- **Expansibilidade:** O projeto permite fácil adição de novos elementos, como power-ups, inimigos ou efeitos visuais.
- **Spritesheet:** (Opcional) Suporte para animação do submarino via spritesheet, facilmente reativável no código.

## Como Executar

1. **Baixe ou clone o projeto.**
2. **Abra o arquivo `index.html` em seu navegador.**
3. **Jogue!**

## Estrutura do Projeto

```
assets/
	images/   # Sprites, imagens do submarino, minas, moedas
	sounds/   # Sons do jogo (opcional)
src/
	classes/  # Classes JS do jogo
	ui/       # Módulos de interface
index.html  # Arquivo principal
style.css   # Estilos visuais
README.md   # Este manual
```
