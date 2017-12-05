import Game from './game';

class GameView {
  constructor(ctx) {
    this.ctx = ctx;
    this.game = new Game(ctx);
    this.start = this.start.bind(this);
  }

  start(ctx) {
    setInterval( () => {
      this.game.step();
      this.game.draw(ctx);
    }, 60);
  }
}

export default GameView;
