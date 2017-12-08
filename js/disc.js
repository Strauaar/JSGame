import MovingObject from './moving_object';
import Projectile from './projectile';
import PowerUp from './power_up';
import * as Util from './util';

class Disc extends MovingObject{
  constructor(options){
    super(options);
    this.outerRadius = 150;
    this.innerRadius = 60;
    this.fragments = [];
    this.theta = 0;
    this.angular_vel = 0;
    // this.renderFragments();
    this.draw = this.draw.bind(this);
    this.drawDonut = this.drawDonut.bind(this);
    this.move = this.move.bind(this);
    this.setRadialGradient = this.setRadialGradient.bind(this);
    this.caluclateCollision = this.caluclateCollision.bind(this);
    this.enablePowerup = this.enablePowerup.bind(this);
    this.bounce = this.bounce.bind(this);
  }

  // renderFragments() {
  //   let rel_x;
  //   let rel_y;
  //   const registerMovement = (e) => {
  //     if(e.clientX < (this.DIM_X / 2)){
  //       rel_x = ((this.DIM_X / 2) - pos[0]) * -1;
  //     }else {
  //       rel_x = pos[0] - (this.DIM_X / 2);
  //     }
  //   }
  //   document.addEventListener('mousemove', registerMovement)
  // }

  draw(ctx, rel_x = 10, rel_y = 10, theta = Math.PI/4) {
    // console.log(this.end_angle);
    this.rad = Util.calculateRad(rel_x, rel_y, theta);
    // this.rel_x = rel_x;
    // this.rel_y = rel_y;
    // this.theta = theta;
    this.pos[0] = this.game.DIM_X / 2;
    this.pos[1] = this.game.DIM_Y / 2;
    this.setRadialGradient(ctx, "#E81E2B", "#DC1C29");
    this.drawDonut(ctx, -this.rad, -this.rad + Math.PI * 2/3);
    this.setRadialGradient(ctx, "#84BC3D", "#84BC3D");
    this.drawDonut(ctx,-this.rad + Math.PI * 2/3, -this.rad + Math.PI * 4/3)
    this.setRadialGradient(ctx, "#27A1D4", "#27A1D4");
    this.drawDonut(ctx, -this.rad + Math.PI * 4/3, -this.rad + Math.PI * 2)
  }

  drawDonut(ctx, startRadian, endRadian){

      ctx.beginPath();
          ctx.arc(this.pos[0],  this.pos[1], this.outerRadius, startRadian, endRadian, false); // Outer: CCW
          ctx.arc(this.pos[0],  this.pos[1], this.innerRadius, endRadian, startRadian, true); // Inner: CW
      ctx.closePath();

      // add shadow
      this.addShadow(ctx);

      ctx.fill();
  }

  addShadow(ctx){
      ctx.shadowColor = "#333";
      ctx.shadowBlur = 6;
      ctx.shadowOffsetX = 0;
      ctx.shadowOffsetY = 0;
  }

  move () {

  }

  setRadialGradient(ctx, sgc, bgc){
      let grd = ctx.createRadialGradient(this.pos[0],  this.pos[1], this.innerRadius + 5, this.pos[0],  this.pos[1], this.outerRadius);
      grd.addColorStop(0,sgc);
      grd.addColorStop(1,bgc);
      ctx.fillStyle = grd;
  }

  bounce(otherObject, rel_x, rel_y){
    if(this.angular_vel >= 0) {
      if (isNaN(this.angular_vel) || this.angular_vel === 0){
        otherObject.vel[0] = -1 * otherObject.vel[0];
        otherObject.vel[1] = -1 * otherObject.vel[1];
      } else if (rel_x > 0 && rel_y > 0) {
        otherObject.vel[0] =  otherObject.vel[0] - (this.angular_vel * 100);
        otherObject.vel[1] = (( -1 * this.angular_vel * 100) + otherObject.vel[1]) ;
      } else if (rel_x < 0 && rel_y > 0) {
        otherObject.vel[0] = otherObject.vel[0] - (this.angular_vel * 100) ;
        otherObject.vel[1] = (this.angular_vel * 100) + (otherObject.vel[1]) ;
      } else if (rel_x < 0 && rel_y < 0) {
        otherObject.vel[0] = ((this.angular_vel * 100) + otherObject.vel[0]) ;
        otherObject.vel[1] = -1 * ((this.angular_vel * 100) + otherObject.vel[1]) ;
      } else if (rel_x > 0 && rel_y < 0) {
        otherObject.vel[0] = ((this.angular_vel * 100) + otherObject.vel[0]) ;
        otherObject.vel[1] = ((-1 * this.angular_vel * 100) + otherObject.vel[1]) ;
      }
    } else if (this.angular_vel < 0){
      let angular_vel = Math.abs(this.angular_vel);
      if (isNaN(this.angular_vel) || this.angular_vel === 0){
        otherObject.vel[0] = -1 * otherObject.vel[0];
        otherObject.vel[1] = -1 * otherObject.vel[1];
      } else if (rel_x > 0 && rel_y > 0) {
        otherObject.vel[0] =  otherObject.vel[0] + (angular_vel * 100);
        otherObject.vel[1] = ((angular_vel * 100) + otherObject.vel[1]) ;
      } else if (rel_x < 0 && rel_y > 0) {
        otherObject.vel[0] = otherObject.vel[0] + (angular_vel * 100) ;
        otherObject.vel[1] = (-1 * angular_vel * 100) + (otherObject.vel[1]) ;
      } else if (rel_x < 0 && rel_y < 0) {
        otherObject.vel[0] = -1 * ((angular_vel * 100) + otherObject.vel[0]) ;
        otherObject.vel[1] = ((angular_vel * 100) + otherObject.vel[1]) ;
      } else if (rel_x > 0 && rel_y < 0) {
        otherObject.vel[0] = (( -1 * angular_vel * 100) + otherObject.vel[0]) ;
        otherObject.vel[1] = ((angular_vel * 100) + otherObject.vel[1]) ;
      }
    }
    otherObject.vel[0] = otherObject.vel[0] * 1.1;
    otherObject.vel[1] = otherObject.vel[1] * 1.1;
  }

  caluclateCollision(otherObject) {
    let rel_x = Util.relative_x(otherObject.pos[0], this.game.DIM_X);
    let rel_y = Util.relative_y(otherObject.pos[1], this.game.DIM_Y);
    // convert polar coordinates to cartesian coordinates

    if (otherObject instanceof Projectile) {
      let contact_point_x = Util.relative_x(otherObject.pos[0], this.game.DIM_X);
      let contact_point_y = Util.relative_y(otherObject.pos[1], this.game.DIM_Y);
      let angle = Math.atan(contact_point_y/contact_point_x);
      let abs_theta = Util.calculateRad(contact_point_x, contact_point_y, angle);

      let red_lower = this.rad - (Math.PI * 2/3);
      let red_upper = this.rad;
      // blue lower same as above
      let blue_upper = this.rad + (Math.PI * 2/3);

      if(((this.rad > abs_theta) && (abs_theta > (this.rad - Math.PI * 2 /3)) && otherObject.color === 'red') || ((abs_theta < Math.PI * 2) && (abs_theta > (Math.PI - (Math.PI * 2/3 - this.rad))) && otherObject.color === 'red')) {
        console.log("is red ball");
        this.bounce(otherObject, rel_x, rel_y);
      } else if ( (((this.rad + Math.PI * 2/3) > abs_theta) && (abs_theta > this.rad) && otherObject.color === 'blue') || (abs_theta > 0 && (abs_theta < (this.rad - Math.PI * 3/2)) && otherObject.color =="blue")){
        console.log("is blue");
        this.bounce(otherObject, rel_x, rel_y);
      } else if ( ((this.rad + Math.PI * 4/3) > abs_theta) && otherObject.color === 'green') {
        console.log("green");
        this.bounce(otherObject, rel_x, rel_y);
      } else {
        otherObject.stuck = true;
        otherObject.vel = [0,0];
      }
    }  else if (otherObject instanceof PowerUp) {
      this.enablePowerup(otherObject);
      this.game.removePowerup(otherObject);
    }
  }

  enablePowerup(powerup) {
    debugger
    powerup.enablePowerup(true);
    setTimeout(() => {
      powerup.enablePowerup(false);
    }, 5000)
  }

  shoot(x, y) {
    let vel_vectors = this.game.findCenter([x,y]);
    this.game.shootBullet({pos:[(this.game.DIM_X / 2), (this.game.DIM_Y / 2)], vel: [vel_vectors[0] * -10, vel_vectors[1] * -10] , color: 'black', radius: 2})
  }

  burst() {
    let projectiles = this.game.allObjects().filter(obj => obj instanceof Projectile)
    for(let i = 0; i < projectiles.length; i++) {
      // debugger
      if(projectiles[i].stuck === true) {
        let new_theta = (this.rad - projectiles[i].dTheta) % (Math.PI * 2);
        let new_rel_x = Math.cos(new_theta);
        let new_rel_y = Math.sin(new_theta);
        projectiles[i].stuck = false;
        projectiles[i].vel[0] = (new_rel_x/(Math.sqrt(Math.pow(new_rel_x, 2) + Math.pow(new_rel_y, 2)))) * 10;
        projectiles[i].vel[1] = (new_rel_y/(Math.sqrt(Math.pow(new_rel_x, 2) + Math.pow(new_rel_y, 2)))) * 10;
        debugger
      }
    }
  }

}

export default Disc;
