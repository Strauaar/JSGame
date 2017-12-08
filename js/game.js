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
    this.bullets = [];
    this.goals = [];
    this.score = 0;
    this.stuckCount = 0;
    this.lost = false;
    this.ctx = ctx;
    this.gameover_count = 0;
    this.DIM_X = window.innerWidth;
    this.DIM_Y = window.innerHeight;
    this.initProjectiles = this.initProjectiles.bind(this);
    this.initGoals();
    this.initProjectiles();
    this.initDisc();
    this.renderFragments();
    this.initPowerUps();
    this.randomPosition = this.randomPosition.bind(this);
    this.findCenter = this.findCenter.bind(this);
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
    this.start_time = new Date().getTime();
    this.timer = setInterval(() => {
      let time = new Date().getTime();
      let distance = time - this.start_time;
      this.milliseconds = (distance)/1000;
    }, 3);
    window.addEventListener('resize', () => {
      this.DIM_X = window.innerWidth;
      this.DIM_Y = window.innerHeight;
    });
    this.checkWin = this.checkWin.bind(this);
    this.reset = this.reset.bind(this);
    this.initTest();
    setInterval( ()=> {
       this.gameover_count++;
       this.gameover_count = this.gameover_count % 4;
    }, 300);
    this.game_start = true;
  }

  initDisc() {
    this.disc = new Disc({pos: [this.DIM_X / 2, this.DIM_Y / 2], game: this});
  }

  initGoals() {
    this.goals.push(new Goal({pos: [130, 130], game: this, radius: 25}))
    this.goals.push(new Goal({pos: [this.DIM_X - 130, 130], game: this, radius: 25}))
    this.goals.push(new Goal({pos: [130, this.DIM_Y - 130], game: this, radius: 25}))
    this.goals.push(new Goal({pos: [this.DIM_X - 130, this.DIM_Y - 130], game: this, radius: 25}))
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
    this.powerups.push(new PowerUp({pos:position, vel: [this.findCenter(position)[0] * 10, this.findCenter(position)[1] * 10], game: this, disc: this.disc}));
    setInterval( () => {
      random_number = Math.floor(Math.random() * 3);
      switch(random_number) {
        case 0:
          break;
        case 1:
          break;
        default:
          position = this.randomPosition();
          this.powerups.push(new PowerUp({pos:position, vel: this.findCenter(position), game: this, disc: this.disc}));
          break;
      }
    }, 10000)
  }

  reset() {
    this.lost = false;
    this.stuckCount = 0;
    this.ctx.clearRect(0, 0, this.DIM_X, this.DIM_Y);
    this.projectiles = [];
    this.score = 0;
    this.game_start = false;
    this.start_time = new Date().getTime();
    this.timer = setInterval(() => {
      let time = new Date().getTime();
      let distance = time - this.start_time;
      this.milliseconds = (distance)/1000;
    }, 3);
    window.removeEventListener('click', this.reset)
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

      // debugger

    ctx.clearRect(0, 0, this.DIM_X, this.DIM_Y);


      ctx.fillStyle = "#2c2d23";
      ctx.fillRect(0, 0, this.DIM_X, this.DIM_Y);
      ctx.font = '80px "Press Start 2P"';
      ctx.fillStyle = 'white';
      ctx.fillText(20 - this.stuckCount, 70, 100);
      ctx.font = '20px "Press Start 2P"';
      ctx.fillStyle = 'white';
      ctx.fillText(this.milliseconds, this.DIM_X -150, 50);
      if (this.stuckCount >= 1) {
        this.lost = true;
        clearInterval(this.timer);
        this.survive_time = this.milliseconds;
        this.ctx.clearRect(0, 0, this.DIM_X, this.DIM_Y);
        ctx.fillStyle = "#2c2d23";
        ctx.fillRect(0, 0, this.DIM_X, this.DIM_Y);
        if(this.gameover_count === 0) {
          this.ctx.font = '80px "Press Start 2P"';
          this.ctx.fillStyle = 'rgba(255,255,255,0.3)';
          this.ctx.fillText('GAME OVER', this.DIM_X/2 - 380, this.DIM_Y/2);
          this.ctx.font = '20px "Press Start 2P"';
          this.ctx.fillStyle = 'rgba(255,255,255,0.3)';
          this.ctx.fillText('Click to play again', this.DIM_X/2 - 380, this.DIM_Y/2 + 100);
          this.ctx.font = '20px "Press Start 2P"';
          this.ctx.fillStyle = 'rgba(255,255,255,0.3)';
          this.ctx.fillText(`Survival time: ${this.survive_time}`, this.DIM_X/2 - 380, this.DIM_Y/2 + 200);
        } else if (this.gameover_count === 1) {
          this.ctx.font = '80px "Press Start 2P"';
          this.ctx.fillStyle = 'rgba(255,255,255,0.4)';
          this.ctx.fillText('GAME OVER', this.DIM_X/2 - 380, this.DIM_Y/2);
          this.ctx.font = '20px "Press Start 2P"';
          this.ctx.fillStyle = 'rgba(255,255,255,0.4)';
          this.ctx.fillText('Click to play again', this.DIM_X/2 - 380, this.DIM_Y/2 + 100);
          this.ctx.font = '20px "Press Start 2P"';
          this.ctx.fillStyle = 'rgba(255,255,255,0.4)';
          this.ctx.fillText(`Survival time: ${this.survive_time}`, this.DIM_X/2 - 380, this.DIM_Y/2 + 200);
        } else if (this.gameover_count === 2) {
          this.ctx.font = '80px "Press Start 2P"';
          this.ctx.fillStyle = 'rgba(255,255,255,0.6)';
          this.ctx.fillText('GAME OVER', this.DIM_X/2 - 380, this.DIM_Y/2);
          this.ctx.font = '20px "Press Start 2P"';
          this.ctx.fillStyle = 'rgba(255,255,255,0.5)';
          this.ctx.fillText('Click to play again', this.DIM_X/2 - 380, this.DIM_Y/2 + 100);
          this.ctx.font = '20px "Press Start 2P"';
          this.ctx.fillStyle = 'rgba(255,255,255,0.6)';
          this.ctx.fillText(`Survival time: ${this.survive_time}`, this.DIM_X/2 - 380, this.DIM_Y/2 + 200);
        } else if (this.gameover_count === 3) {
          this.ctx.font = '80px "Press Start 2P"';
          this.ctx.fillStyle = 'rgba(255,255,255,0.7)';
          this.ctx.fillText('GAME OVER', this.DIM_X/2 - 380, this.DIM_Y/2);
          this.ctx.font = '20px "Press Start 2P"';
          this.ctx.fillStyle = 'rgba(255,255,255,0.7)';
          this.ctx.fillText('Click to play again', this.DIM_X/2 - 380, this.DIM_Y/2 + 100);
          this.ctx.font = '20px "Press Start 2P"';
          this.ctx.fillStyle = 'rgba(255,255,255,0.7)';
          this.ctx.fillText(`Survival time: ${this.survive_time}`, this.DIM_X/2 - 380, this.DIM_Y/2 + 200);
        } else if (this.gameover_count === 4) {
          this.ctx.font = '80px "Press Start 2P"';
          this.ctx.fillStyle = 'rgba(255,255,255,0.8)';
          this.ctx.fillText('GAME OVER', this.DIM_X/2 - 380, this.DIM_Y/2);
          this.ctx.font = '20px "Press Start 2P"';
          this.ctx.fillStyle = 'rgba(255,255,255,0.8)';
          this.ctx.fillText('Click to play again', this.DIM_X/2 - 380, this.DIM_Y/2 + 100);
          this.ctx.font = '20px "Press Start 2P"';
          this.ctx.fillStyle = 'rgba(255,255,255,0.8)';
          this.ctx.fillText(`Survival time: ${this.survive_time}`, this.DIM_X/2 - 380, this.DIM_Y/2 + 200);
        }
      window.addEventListener('click', this.reset);
    }


    if (this.lost === false) {
      this.allObjects().forEach(obj => {
        obj.draw(ctx);
      });
      this.bullets.forEach(bullet => {
        bullet.draw(ctx);
      });
      this.goals.forEach(goal => {
        goal.draw(ctx);
      });
      this.disc.draw(this.ctx, this.disc.rel_x, this.disc.rel_y, this.disc.theta);
    }

    if (this.power_type === 'burst') {
      if(this.gameover_count === 0) {
        ctx.font = '14px "Press Start 2P"';
        ctx.fillStyle = 'rgba(255,255,255,0.3)';
        ctx.fillText('Click to release!', this.DIM_X/2 - 120, 100);
      } else if (this.gameover_count === 1) {
        ctx.font = '14px "Press Start 2P"';
        ctx.fillStyle = 'rgba(255,255,255,0.4)';
        ctx.fillText('Click to release!', this.DIM_X/2 - 120, 100);
      } else if (this.gameover_count === 2) {
        ctx.font = '14px "Press Start 2P"';
        ctx.fillStyle = 'rgba(255,255,255,0.6)';
        ctx.fillText('Click to release!', this.DIM_X/2 - 120, 100);
      } else if (this.gameover_count === 3) {
        ctx.font = '14px "Press Start 2P"';
        ctx.fillStyle = 'rgba(255,255,255,0.7)';
        ctx.fillText('Click to release!', this.DIM_X/2 - 120, 100);
      } else if (this.gameover_count === 4) {
        ctx.font = '14px "Press Start 2P"';
        ctx.fillStyle = 'rgba(255,255,255,0.8)';
        ctx.fillText('Click to release!', this.DIM_X/2 - 120, 100);
      }
    } else if (this.power_type === 'shoot') {
      if(this.gameover_count === 0) {
        ctx.font = '14px "Press Start 2P"';
        ctx.fillStyle = 'rgba(255,255,255,0.3)';
        ctx.fillText('Click to shoot!', this.DIM_X/2 - 120, 100);
      } else if (this.gameover_count === 1) {
        ctx.font = '14px "Press Start 2P"';
        ctx.fillStyle = 'rgba(255,255,255,0.4)';
        ctx.fillText('Click to shoot!', this.DIM_X/2 - 120, 100);
      } else if (this.gameover_count === 2) {
        ctx.font = '14px "Press Start 2P"';
        ctx.fillStyle = 'rgba(255,255,255,0.6)';
        ctx.fillText('Click to shoot!', this.DIM_X/2 - 120, 100);
      } else if (this.gameover_count === 3) {
        ctx.font = '14px "Press Start 2P"';
        ctx.fillStyle = 'rgba(255,255,255,0.7)';
        ctx.fillText('Click to shoot!', this.DIM_X/2 - 120, 100);
      } else if (this.gameover_count === 4) {
        ctx.font = '14px "Press Start 2P"';
        ctx.fillStyle = 'rgba(255,255,255,0.8)';
        ctx.fillText('Click to shoot!', this.DIM_X/2 - 120, 100);
      }
    }

    // console.log("rel_x", this.disc.rel_x);
    // console.log("rel_y", this.disc.rel_y);
    // console.log("ang_vel", this.disc.angular_vel);
    if(this.game_start === true) {
      ctx.fillStyle = "#2c2d23";
      ctx.fillRect(0, 0, this.DIM_X, this.DIM_Y);
      ctx.font = '20px "Press Start 2P"';
      ctx.fillStyle = 'white';
      ctx.fillText('Match the color of the ball', this.DIM_X/2- 300, this.DIM_Y/2);
      ctx.font = '20px "Press Start 2P"';
      ctx.fillStyle = 'white';
      ctx.fillText('to the color of the circle.', this.DIM_X/2- 300, this.DIM_Y/2 + 25);
      window.addEventListener('click', this.reset);
    }


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
      if(object_array[i] instanceof PowerUp || object_array[i].stuck === false)
      {
        if(distance <= totalRadius) {
        this.disc.caluclateCollision(object_array[i]);
        // object_array[i].vel[0] = -1 * object_array[i].vel[0];
        // object_array[i].vel[1] = -1 * object_array[i].vel[1];
        }
      } else if (object_array[i].stuck === true) {
        let contact_point_x = Util.relative_x(object_array[i].pos[0], this.DIM_X);
        let contact_point_y = Util.relative_y(object_array[i].pos[1], this.DIM_Y);
        let angle = Math.atan(contact_point_y/contact_point_x);

        let abs_theta = Util.calculateRad(contact_point_x, contact_point_y, angle);
        // calculate the difference between the angle of the mouse position to the contact point
        let theta_diff = Math.abs(this.disc.rad - abs_theta);
        object_array[i].dTheta = object_array[i].dTheta || theta_diff;
        object_array[i].vel = [0,0];

        let new_theta = (this.disc.rad - object_array[i].dTheta) % (Math.PI * 2);
        let new_rel_x = (this.disc.outerRadius * Math.cos(new_theta)) + (Math.cos(new_theta) * object_array[i].radius) ;
        let new_rel_y = this.disc.outerRadius * Math.sin(new_theta) + (Math.sin(new_theta) * object_array[i].radius);

        let mid_screen_x = this.DIM_X/2;
        let mid_screen_y = this.DIM_Y/2;

        object_array[i].pos[0] = mid_screen_x + new_rel_x;
        object_array[i].pos[1] = mid_screen_y - new_rel_y;

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
        debugger

          if(distance <= totalRadius) {
            this.removeObject(object_array[i]);
          }

      }
    }
    // debugger

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
          if(object_array[i].counted === true) {

          } else if (object_array[i].counted === false){
            object_array[i].counted = true;
            this.score += 1
          }
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

  checkWin() {

  }

  allObjects() {
    let all = this.projectiles.slice();
    all = all.concat(this.powerups);
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
