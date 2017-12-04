const Game = require('./game.js');

class GameView {
  constructor(ctx) {
    this.game = new Game();
    this.ctx = ctx;
    this.start = this.start.bind(this);
  }


  start() {
    // this.ctx.fillStyle = 'red';
    // this.ctx.beginPath();
    // this.ctx.arc(
    //   0,
    //   0,
    //   120,
    //   2 * Math.PI,
    //   false
    // );
    // this.ctx.fill();
    setInterval( () => {
      // this.game.step();
      // this.game.draw(this.ctx);
    }, 20);
  }
}

module.exports = GameView;
