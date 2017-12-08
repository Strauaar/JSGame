import GameView from './game_view';

document.addEventListener('DOMContentLoaded', () => {
  let canvas = document.getElementById('game-canvas');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  let ctx = canvas.getContext('2d');
  const gameView = new GameView(ctx);
  gameView.start(ctx);
});
