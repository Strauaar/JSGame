import MovingObject from './moving_object';
import Projectile from './projectile';
import PowerUp from './power_up';
import * as Util from './util';

class Disc extends MovingObject{
  constructor(options){
    super(options);
    this.outerRadius = 150;
    this.innerRadius = 100;
    this.fragments = [];
    this.theta = 0;
    // this.renderFragments();
    this.draw = this.draw.bind(this);
    this.drawDonut = this.drawDonut.bind(this);
    this.move = this.move.bind(this);
    this.setRadialGradient = this.setRadialGradient.bind(this);
    this.caluclateCollision = this.caluclateCollision.bind(this);
    this.enablePowerup = this.enablePowerup.bind(this);
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

  draw(ctx, rel_x, rel_y, theta) {
    console.log(this.end_angle);
    let rad = Util.calculateRad(rel_x, rel_y, theta);
    // this.rel_x = rel_x;
    // this.rel_y = rel_y;
    // this.theta = theta;

    this.setRadialGradient(ctx, "#DC1C29", "#B7161B");
    this.drawDonut(ctx, -rad, -rad + Math.PI * 2/3);
    this.setRadialGradient(ctx, "#84BC3D", "#5B8829");
    this.drawDonut(ctx,-rad + Math.PI * 2/3, -rad + Math.PI * 4/3)
    this.setRadialGradient(ctx, "#27A1D4", "#2182AD");
    this.drawDonut(ctx, -rad + Math.PI * 4/3, -rad + Math.PI * 2)
  }

  drawDonut(ctx, startRadian, endRadian){

      ctx.beginPath();
          ctx.arc(this.pos[0],  this.pos[1], this.outerRadius, startRadian, endRadian, false); // Outer: CCW
          ctx.arc(this.pos[0],  this.pos[1], this.innerRadius, endRadian, startRadian, true); // Inner: CW
      ctx.closePath();

      // add shadow
      // this.addShadow(ctx);

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

  caluclateCollision(otherObject) {
    // let
    // console.log(this.end_);
    if (otherObject instanceof Projectile) {
      otherObject.vel[0] = ((Math.sin(this.dTheta) + Math.cos(this.dTheta)) * this.outerRadius * this.angular_vel) + otherObject.vel[0];
      otherObject.vel[1] = -1* ((Math.sin(this.dTheta)) * this.outerRadius * this.angular_vel) + otherObject.vel[1];
    } else if (otherObject instanceof PowerUp) {
      this.enablePowerup(otherObject);
      this.game.removePowerup(otherObject);
    }
  }

  enablePowerup(powerup) {
    powerup.enablePowerup(true);
    setTimeout(() => {
      powerup.enablePowerup(false);
    }, 5000)
  }

  shoot(x, y) {
    let vel_vectors = this.game.findCenter([x,y]);
    this.game.shootBullet({pos:[this.game.DIM_X / 2, this.game.DIM_Y / 2], vel: vel_vectors, color: 'black', radius: 2})
  }

}

export default Disc;
