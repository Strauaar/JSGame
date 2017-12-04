// TODO: import game components
import Projectile from './projectile';
import * as Util from './util';

class Game {
  constructor(){
    this.projectiles = [];
    // TODO: Implement bullet as powerup
    // this.bullets = [];

    // this.disc = new Disc(params here);
    this.DIM_X = window.innerWidth;
    this.DIM_Y = window.innerHeight;
    this.initProjectiles = this.initProjectiles.bind(this);
    this.initProjectiles();
    this.randomPosition = this.randomPosition.bind(this);
    this.draw = this.draw.bind(this);
    this.moveObjects = this.moveObjects.bind(this);
    this.wrap = this.wrap.bind(this);
    this.checkCollisions = this.checkCollisions.bind(this);
    this.step = this.step.bind(this);
    this.allObjects = this.allObjects.bind(this);

  }

  initProjectiles() {
    setInterval( () => {
      this.projectiles.push(new Projectile())
    }, 1000)
  }

  randomPosition() {

  }

  draw(ctx) {
    ctx.clearRect(0, 0, this.DIM_X, this.DIM_Y);
    this.projectiles.forEach(projectile => {
      projectile.draw();
    });
  }

  moveObjects() {
    // this.allObjects().forEach(object => {
    //   object.move();
    // });
  }

  wrap() {

  }

  checkCollisions() {
    //nested loop for checking all objects
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

export default Game;
