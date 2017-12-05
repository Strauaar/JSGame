// TODO: import game components
import Disc from './disc';
import Projectile from './projectile';
import * as Util from './util';

class Game {
  constructor(ctx) {
    this.projectiles = [];
    // TODO: Implement bullet as powerup
    // this.bullets = [];
    this.ctx = ctx;
    this.DIM_X = 800;
    this.DIM_Y = 800;
    this.disc = new Disc({pos: [this.DIM_X / 2, this.DIM_Y / 2], game: this});
    this.initProjectiles = this.initProjectiles.bind(this);
    this.initProjectiles();
    this.randomPosition = this.randomPosition.bind(this);
    this.findCenter = this.findCenter.bind(this);
    this.renderFragments();
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
    let rand = Math.floor(Math.random() * 4);
    switch(rand) {
      case 0:
        x = -50;
        y = Math.random() * this.DIM_Y;
        break;
      case 1:
        x = 50 + this.DIM_X;
        y = Math.random() * this.DIM_Y;
        break;
      case 2:
        x = Math.random() * this.DIM_X;
        y = -50;
        break;
      case 3:
        x = Math.random() * this.DIM_X;
        y = 50 + this.DIM_Y;
        break;
    }
    return [x,y];
  };

  findCenter(pos) {
    let rel_x;
    let rel_y;

    if(pos[0] < 0) {
      rel_x = (this.DIM_X / 2 * -1) + pos[0];
    }else if(pos[0] < (this.DIM_X / 2)){
      rel_x = ((this.DIM_X / 2) - pos[0]) * -1;
    }else {
      rel_x = pos[0] - (this.DIM_X / 2);
    }

    if(pos[1] < 0) {
      rel_y = (this.DIM_Y / 2 * -1) + pos[1];
    }else if(pos[1] < (this.DIM_Y / 2)){
      rel_y = ((this.DIM_Y / 2) - pos[1]) * -1;
    } else {
      rel_y = pos[1] - (this.DIM_Y / 2);
    }
    let unit_vec_helper = Math.sqrt(Math.pow(rel_x, 2) + Math.pow(rel_y, 2));
    let x_unit_vec = (rel_x/unit_vec_helper) * -10;
    let y_unit_vec = (rel_y/unit_vec_helper) * -10;
    return [x_unit_vec, y_unit_vec];
  }

  renderFragments() {
    let rel_x;
    let rel_y;
    let timeout;
    const registerMovement = (e) => {
      clearTimeout(timeout);
      rel_x = Util.relative_x(e.clientX, this.DIM_X);
      rel_y = Util.relative_y(e.clientY, this.DIM_Y);
      this.disc.draw(this.ctx, rel_x, rel_y, Math.atan(rel_y/rel_x));
      timeout = setTimeout(function () {
          var event = new CustomEvent("mousestop", {
              detail: {
                  clientX: e.clientX,
                  clientY: e.clientY
              },
              bubbles: true,
              cancelable: true
          });
          e.target.dispatchEvent(event);
      }, 1);
    };

    const registerStaticPosition = (e) => {
      rel_x = Util.relative_x(e.detail.clientX, this.DIM_X);
      rel_y = Util.relative_y(e.detail.clientY, this.DIM_Y);
      setInterval(() => {this.disc.draw(this.ctx, rel_x, rel_y, Math.atan(rel_y/rel_x))}, 1);
    };

    document.addEventListener('mousemove', registerMovement)
    document.addEventListener('mousestop', registerStaticPosition)

    // document.addEventListener('mousemove', function (e) {
    //     clearTimeout(timeout);
    //     timeout = setTimeout(function () {
    //         var event = new CustomEvent("mousestop", {
    //             detail: {
    //                 clientX: e.clientX,
    //                 clientY: e.clientY
    //             },
    //             bubbles: true,
    //             cancelable: true
    //         });
    //         e.target.dispatchEvent(event);
    //     }, mouseStopDelay);
    // });
  }

  draw(ctx) {
    ctx.clearRect(0, 0, this.DIM_X, this.DIM_Y);
    this.allObjects().forEach(obj => {
      obj.draw(ctx);
    });
  }

  moveObjects() {
    // this.allObjects().forEach(object => {
    //   object.move();
    // });
    this.allObjects().forEach(obj => {
      obj.move();
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
    let all = this.projectiles.slice();
    // all.push(this.disc);
    // TODO: Add other objects
    // all = all.concat()
    return all;

  }
}

export default Game;
