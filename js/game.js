// TODO: import game components

class Game {
  constructor(){
    this.projectiles = [];
    // TODO: Implement bullet as powerup
    // this.bullets = [];

    // this.disc = new Disc(params here);
    this.DIM_X = window.innerWidth;
    this.DIM_Y = window.innerHeight;
    this.randomPosition = this.randomPosition.bind(this);
    this.draw = this.draw.bind(this);
    this.moveObjects = this.moveObjects.bind(this);
    this.wrap = this.wrap.bind(this);
    this.checkCollisions = this.checkCollisions.bind(this);
    this.step = this.step.bind(this);
    this.allObjects = this.allObjects.bind(this);
  }

  randomPosition() {

  }

  draw(ctx) {
    ctx.clearRect(0, 0, this.DIM_X, this.DIM_Y);
    // re-draw all objects
  }

  moveObjects() {
    this.allObjects().forEach(object => {
      object.move();
    });
  }

  wrap() {

  }

  checkCollisions() {

  }

  step() {
    this.moveObjects();
    this.checkCollisions();
  }

  allObjects() {
    // let all = this.projectiles.slice();
    // all.push(this.disc);
    // TODO: Add other objects
    // all = all.concat()
    // return all;
  }
}


module.exports = Game;
