import Game from './game';

class GameView {
  constructor(ctx) {
    this.game = new Game();
    this.ctx = ctx;
    this.start = this.start.bind(this);
  }


  start(ctx) {
    setInterval( () => {
      this.game.step();
      this.game.draw(ctx);
    }, 100);
  }
}

export default GameView;
