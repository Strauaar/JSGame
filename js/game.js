import Disc from './disc';
import Goal from './goal';
import Projectile from './projectile';
import PowerUp from './power_up';
import * as Util from './util';
import Bullet from './bullet';

class Game {
  constructor(ctx) {
    this.projectiles = [];
    this.powerups = [];
    // TODO: Implement bullet as powerup
    this.bullets = [];
    this.goals = [];
    this.score = 0;
    this.ctx = ctx;
    this.DIM_X = 800;
    this.DIM_Y = 800;
    this.initProjectiles = this.initProjectiles.bind(this);
    this.initGoals();
    // this.initProjectiles();
    this.initPowerUps();
    this.randomPosition = this.randomPosition.bind(this);
    this.findCenter = this.findCenter.bind(this);
    this.initDisc();
    this.renderFragments();
    this.draw = this.draw.bind(this);
    this.anim = this.anim.bind(this);
    this.moveObjects = this.moveObjects.bind(this);
    this.wrap = this.wrap.bind(this);
    this.checkCollisionsWithDisc = this.checkCollisionsWithDisc.bind(this);
    this.checkCollisionsWithBullet = this.checkCollisionsWithBullet.bind(this);
    this.checkCollisionsWithGoal =
    this.checkCollisionsWithGoal.bind(this);
    this.step = this.step.bind(this);
    this.allObjects = this.allObjects.bind(this);
    this.shootBullet = this.shootBullet.bind(this);
    this.removePowerup = this.removePowerup.bind(this);
    this.removeObject = this.removeObject.bind(this);
    this.initTest();
  }

  initDisc() {
    this.disc = new Disc({pos: [this.DIM_X / 2, this.DIM_Y / 2], game: this});
  }

  initGoals() {
    this.goals.push(new Goal({pos: [200, 200], game: this, radius: 20}))
  }

  initTest() {
    this.projectiles.push(new Projectile({color: Util.randomColor(), pos: [800,0], vel: this.findCenter([800,0]), radius: 20, game: this}));
    // this.projectiles.push(new Projectile({color: Util.randomColor(), pos: [0,0], vel: this.findCenter([0,0]), radius: 20, game: this}));
    // this.projectiles.push(new Projectile({color: Util.randomColor(), pos: [0,800], vel: this.findCenter([0,800]), radius: 20, game: this}));
    // this.projectiles.push(new Projectile({color: Util.randomColor(), pos: [800,800], vel: this.findCenter([800,800]), radius: 20, game: this}));
  }

  initProjectiles() {
    let position;
    setInterval( () => {
      position = this.randomPosition();
      this.projectiles.push(new Projectile({color: Util.randomColor(), pos: position, vel: this.findCenter(position), radius: 20, game: this}));
    }, 1000)
  }

  initPowerUps() {
    let position;
    let random_number;
    position = this.randomPosition();
    this.powerups.push(new PowerUp({pos:position, vel: this.findCenter(position), game: this, disc: this.disc}));
    setInterval( () => {
      random_number = Math.floor(Math.random() * 3);
      switch(random_number) {
        default:
          position = this.randomPosition();
          this.powerups.push(new PowerUp({pos:position, vel: this.findCenter(position), game: this, disc: this.disc}));
          break;
      }
    }, 10000)
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
    let x_unit_vec = (rel_x/unit_vec_helper) * -2;
    let y_unit_vec = (rel_y/unit_vec_helper) * -2;
    return [x_unit_vec, y_unit_vec];
  }

  renderFragments() {
    let timeout;
    let angular_vel;
    this.disc.start_time = 1;
    const registerMovement = (e) => {
      clearTimeout(timeout);

      this.disc.rel_x = Util.relative_x(e.clientX, this.DIM_X);
      this.disc.rel_y = Util.relative_y(e.clientY, this.DIM_Y);
      this.disc.theta = Math.atan(this.disc.rel_y/this.disc.rel_x);
      if(this.disc.start_time === 1){
          this.disc.start_time = Date.now();
          this.disc.start_angle = Util.calculateRad(this.disc.rel_x, this.disc.rel_y, this.disc.theta);
      }
      this.disc.end_angle = Util.calculateRad(this.disc.rel_x, this.disc.rel_y, this.disc.theta);
      this.disc.dTheta = this.disc.end_angle - this.disc.start_angle;
      // angular_vel =
      this.disc.end_time = Date.now();

      this.disc.angular_vel = Util.calculateAngVelocity(this.disc.start_angle, this.disc.end_angle, this.disc.start_time, this.disc.end_time);
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
      }, 50);
    };

    const registerStaticPosition = (e) => {
      // console.log("stopped");
      this.disc.angular_vel = 0;
      this.disc.rel_x = Util.relative_x(e.detail.clientX, this.DIM_X);
      this.disc.rel_y = Util.relative_y(e.detail.clientY, this.DIM_Y);
      // this.disc.theta = Math.atan(this.disc.rel_y/this.disc.rel_x);
      // this.disc.end_time = Date.now();
      this.disc.start_time = 1;
      // this.disc.dTheta = Math.PI/2;
    };

    document.addEventListener('mousemove', registerMovement);
    document.addEventListener('mousestop', registerStaticPosition);
  }

  draw(ctx) {
    // console.log("x_vel", this.projectiles[0].vel[0]);
    // console.log("y_vel", this.projectiles[0].vel[1]);
    // console.log(this.disc.angular_vel);
    ctx.clearRect(0, 0, this.DIM_X, this.DIM_Y);
    ctx.fillStyle = "#2c2d23";
    ctx.fillRect(0, 0, this.DIM_X, this.DIM_Y);
    ctx.font = "30px Arial";
    ctx.fillText(this.score,10,50);
    this.allObjects().forEach(obj => {
      obj.draw(ctx);
    });
    this.bullets.forEach(bullet => {
      bullet.draw(ctx);
    });
    this.goals.forEach(goal => {
      goal.draw(ctx);
    });
    // console.log("rel_x", this.disc.rel_x);
    // console.log("rel_y", this.disc.rel_y);
    // console.log("ang_vel", this.disc.angular_vel);
    this.disc.draw(this.ctx, this.disc.rel_x, this.disc.rel_y, this.disc.theta);

    // this.goals.forEach(goal => {
    //   goal.draw(ctx);
    // })
  }

  anim(ctx) {
    return () => {
      this.step();
      this.draw(ctx);
      requestAnimationFrame(this.anim(ctx))
    }
  }

  moveObjects() {
    // this.allObjects().forEach(object => {
    //   object.move();
    // });
    // console.log(this.disc.dTheta);

    this.allObjects().forEach(obj => {
      obj.move();
    });
    this.bullets.forEach(bullet => {
      bullet.move();
    });
  }

  wrap() {

  }

  checkCollisionsWithDisc() {
    let totalRadius;
    let object_array = this.allObjects();
    let distance;
    for(let i = 0; i < object_array.length; i++) {
      totalRadius = object_array[i].radius + this.disc.outerRadius;
      distance = Util.distance(this.disc.pos[0], this.disc.pos[1], object_array[i].pos[0], object_array[i].pos[1])

      if(distance <= totalRadius) {
        this.disc.caluclateCollision(object_array[i]);
        // object_array[i].vel[0] = -1 * object_array[i].vel[0];
        // object_array[i].vel[1] = -1 * object_array[i].vel[1];
      } else {
      }
    }
  }

  checkCollisionsWithBullet() {
    let totalRadius;
    let object_array = this.allObjects();
    let distance;
    for(let j = 0; j < this.bullets.length; j++) {
      for(let i = 0; i < object_array.length; i++) {
        totalRadius = object_array[i].radius + this.bullets[j].radius;
        distance = Util.distance(this.bullets[j].pos[0], this.bullets[j].pos[1], object_array[i].pos[0], object_array[i].pos[1])

        if(distance <= totalRadius) {
          this.removeObject(object_array[i]);
        }
      }
    }
  }

  checkCollisionsWithGoal() {
    let totalRadius;
    let object_array = this.allObjects();
    let distance;
    for(let j = 0; j < this.goals.length; j++) {
      for(let i = 0; i < object_array.length; i++) {
        totalRadius = object_array[i].radius + this.goals[j].radius;
        distance = Util.distance(this.goals[j].pos[0], this.goals[j].pos[1], object_array[i].pos[0], object_array[i].pos[1])

        if(distance <= totalRadius && object_array[i] instanceof Projectile) {

          this.score += 1
        }
      }
    }
  }

  step() {
    // console.log(this.disc.rad);
    this.moveObjects();
    this.checkCollisionsWithDisc();
    this.checkCollisionsWithBullet();
    this.checkCollisionsWithGoal();
  }

  allObjects() {
    let all = this.projectiles.slice();
    // all.push(this.disc);
    // TODO: Add other objects
    all = all.concat(this.powerups);
    // all = all.concat(this.bullets);
    return all;

  }

  shootBullet(options) {
    options.game = this.game;
    this.bullets.push(new Bullet(options));
  }

  removePowerup(otherObject) {
    let index = this.powerups.indexOf(otherObject);
    this.powerups.splice(index, 1);
  }

  removeObject(otherObject) {
    if(otherObject instanceof Projectile) {
      let index = this.projectiles.indexOf(otherObject);
      this.projectiles.splice(index, 1);
    } else if (otherObject instanceof Bullet) {
      let index = this.bullets.indexOf(otherObject);
      this.bullets.splice(index, 1);
    }
  }
}

export default Game;
