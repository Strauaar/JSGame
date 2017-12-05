// TODO: import game components
import Projectile from './projectile';
import * as Util from './util';

class Game {
  constructor() {
    this.projectiles = [];
    // TODO: Implement bullet as powerup
    // this.bullets = [];

    // this.disc = new Disc(params here);
    this.DIM_X = window.innerWidth;
    this.DIM_Y = window.innerHeight;
    this.initProjectiles = this.initProjectiles.bind(this);
    this.initProjectiles();

    this.draw = this.draw.bind(this);
    this.moveObjects = this.moveObjects.bind(this);
    this.wrap = this.wrap.bind(this);
    this.checkCollisions = this.checkCollisions.bind(this);
    this.step = this.step.bind(this);
    this.allObjects = this.allObjects.bind(this);

  }

  initProjectiles() {
    let x = window.innerWidth / 2;
    let y = window.innerHeight / 2;
    setInterval( () => {
      // console.log(this.projectiles[0].pos);
      this.projectiles.push(new Projectile({color: 'red', pos: [0, 0], vel: [1,1], game: this}));}, 1000)
      // setInterval( () => {
      //
      //   console.log(this.projectiles[0].pos);
      // }, 1000)

    // }, 1000);
  }

  draw(ctx) {
    ctx.clearRect(0, 0, this.DIM_X, this.DIM_Y);
    this.projectiles.forEach(projectile => {
      projectile.draw(ctx);
    });
  }

  moveObjects() {
    // this.allObjects().forEach(object => {
    //   object.move();
    // });
    this.projectiles.forEach(projectile => {
      projectile.move();
    });
  }

  wrap() {

  }

  checkCollisions() {
    //nested loop for checking all objects
  }

  step() {
    this.moveObjects();
    // this.checkCollisions();
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
