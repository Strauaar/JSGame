import Game from './game';

class GameView {
  constructor(ctx) {
    this.ctx = ctx;
    this.game = new Game(ctx);
    this.start = this.start.bind(this);
  }

  start(ctx) {
    requestAnimationFrame(this.game.anim(ctx))
  }
}

export default GameView;
