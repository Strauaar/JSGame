// TODO: import game components
import Projectile from './projectile';
import * as Util from './util';

class Game {
  constructor() {
    this.projectiles = [];
    // TODO: Implement bullet as powerup
    // this.bullets = [];

    // this.disc = new Disc(params here);
    this.DIM_X = 800;
    this.DIM_Y = 800;
    this.initProjectiles = this.initProjectiles.bind(this);
    this.initProjectiles();
    this.randomPosition = this.randomPosition.bind(this);
    this.findCenter = this.findCenter.bind(this);
    this.draw = this.draw.bind(this);
    this.moveObjects = this.moveObjects.bind(this);
    this.wrap = this.wrap.bind(this);
    this.checkCollisions = this.checkCollisions.bind(this);
    this.step = this.step.bind(this);
    this.allObjects = this.allObjects.bind(this);

  }

  initProjectiles() {
    let position;
    setInterval( () => {
      position = this.randomPosition();
      this.projectiles.push(new Projectile({color: Util.randomColor(), pos: position, vel: this.findCenter(position), game: this}));
    }, 1000)
  }

  randomPosition() {
    let x;
    let y;
    switch(Math.floor(Math.random() * 4)) {
      case 0:
        x = -50;
        y = Math.random() * this.DIM_Y;
      case 1:
        x = 50 + this.DIM_X;
        y = Math.random() * this.DIM_Y;
      case 2:
        x = Math.random() * this.DIM_X;
        y = -50;
      case 3:
        x = Math.random() * this.DIM_X;
        y = 50 + this.DIM_Y;
      default:
        x = 0;
        y = 0;
    }
    return [x,y];
  };

  findCenter(pos) {
    let rel_x;
    let rel_y;
    if(pos[0] < (this.DIM_X / 2)){
      rel_x = (this.DIM_X / 2) - pos[0];
    } else {
      rel_x = pos[0] - (this.DIM_X / 2);
    }
    if(pos[1] < (this.DIM_Y / 2)){
      rel_y = (this.DIM_Y / 2) - pos[1];
    } else {
      rel_y = pos[1] - (this.DIM_Y / 2);
    }
    let unit_vec_helper = Math.sqrt(Math.pow(rel_x, 2) + Math.pow(rel_y, 2));

    return [rel_x/unit_vec_helper, rel_y/unit_vec_helper];
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
