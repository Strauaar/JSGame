import MovingObject from './moving_object';
import Projectile from './projectile';
import PowerUp from './power_up';
import * as Util from './util';

class Disc extends MovingObject{
  constructor(options){
    super(options);
    this.outerRadius = 160;
    this.innerRadius = 40;
    this.fragments = [];
    this.theta = 0;
    this.angular_vel = 0;
    this.draw = this.draw.bind(this);
    this.drawDonut = this.drawDonut.bind(this);
    this.move = this.move.bind(this);
    this.setRadialGradient = this.setRadialGradient.bind(this);
    this.caluclateCollision = this.caluclateCollision.bind(this);
    this.enablePowerup = this.enablePowerup.bind(this);
    this.bounce = this.bounce.bind(this);
  }

  draw(ctx, rel_x = 10, rel_y = 10, theta = Math.PI/4) {
    this.rad = Util.calculateRad(rel_x, rel_y);
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
          ctx.arc(this.pos[0],  this.pos[1], this.outerRadius, startRadian, endRadian, false);
          ctx.arc(this.pos[0],  this.pos[1], this.innerRadius, endRadian, startRadian, true);
      ctx.closePath();
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

  bounce(otherObject){
    otherObject.vel[0] = -1 * otherObject.vel[0];
    otherObject.vel[1] = -1 * otherObject.vel[1];
  }

  caluclateCollision(otherObject) {
    let rel_x = Util.relative_x(otherObject.pos[0], this.game.DIM_X);
    let rel_y = Util.relative_y(otherObject.pos[1], this.game.DIM_Y);
    // convert polar coordinates to cartesian coordinates

    if (otherObject instanceof Projectile) {
      let contact_point_x = Util.relative_x(otherObject.pos[0], this.game.DIM_X);
      let contact_point_y = Util.relative_y(otherObject.pos[1], this.game.DIM_Y);
      //projectile position in terms of rad
      let abs_theta = Util.calculateRad(contact_point_x, contact_point_y);
      //if this.rad === 0; 0 < blue < pi*2/3, pi*2/3 < green < pi*4/3, pi*4/3 < red < pi*2
      //if 0 <= this.rad < pi*2/3; this.rad < blue < (pi2/3 + this.rad),
                            //    (pi2/3 + this.rad) < green < (pi4/3 + this.rad) (()()((())))
                            //    (pi4/3 + this.rad) < red < 2pi AND 0 < red < this.rad
      //if pi2/3 <= this.rad < pi4/3; this.rad < blue < (pi2/3 + this.rad),
                            //       (pi2/3 + this.rad) < green < 2pi AND 0 < green < (this.rad - pi2/3)
                            //       (this.rad - pi2/3) < red < this.rad
      //if pi4/3 <= this.rad < 2pi; this.rad < blue < 2pi AND 0 < blue < (this.rad - pi4/3),
                            //      (this.rad - pi4/3) < green < (this.rad - pi2/3),
                            //      (this.rad - pi2/3) < red < this.rad
      if (0 <= this.rad && this.rad < (Math.PI * 2/3)) {
        if (
            (otherObject.color === 'blue' && (this.rad <= abs_theta && abs_theta <= (this.rad + (Math.PI * 2/3)))) || 
            (otherObject.color === 'green' && ((this.rad + (Math.PI * 2/3)) <= abs_theta && abs_theta <= (this.rad + (Math.PI * 4/3)))) ||
            (otherObject.color === 'red' && ( ((this.rad + (Math.PI * 4/3)) <= abs_theta && abs_theta <= (Math.PI * 2)) || (0 <= abs_theta && abs_theta <= this.rad) ))        
          ){
            otherObject.stuck = true;
            this.game.stuckCount++;
            otherObject.vel = [0,0];
        } else {
          this.bounce(otherObject);
        }
      } else if ((Math.PI * 2/3) <= this.rad && this.rad < (Math.PI * 4/3)) {
        if (
          (otherObject.color === 'blue' && (this.rad <= abs_theta && abs_theta <= (this.rad + (Math.PI * 2/3)))) || 
          (otherObject.color === 'green' && (((this.rad + (Math.PI * 2/3)) <= abs_theta && abs_theta <= (Math.PI * 2)) || (0 <= abs_theta && abs_theta <= (this.rad - (Math.PI * 2/3))))) ||
          (otherObject.color === 'red' && ((this.rad - (Math.PI * 2/3)) <= abs_theta && abs_theta <= this.rad))        
        ){
          otherObject.stuck = true;
          this.game.stuckCount++;
          otherObject.vel = [0,0];
        } else {
          this.bounce(otherObject);
        }
      } else if ((Math.PI * 4/3) <= this.rad && this.rad < (Math.PI * 2)) {
        if (
          (otherObject.color === 'blue' && ((this.rad <= abs_theta && abs_theta <= (Math.PI * 2)) || (0 <= abs_theta && abs_theta <= (this.rad - (Math.PI * 4/3))))) ||
          (otherObject.color === 'green' && ((this.rad - (Math.PI * 4/3)) <= abs_theta && abs_theta <= (this.rad - (Math.PI * 2/3)))) || 
          (otherObject.color === 'red' && ((this.rad - (Math.PI * 2/3)) <= abs_theta && abs_theta <= this.rad))        
        ){
          otherObject.stuck = true;
          this.game.stuckCount++;
          otherObject.vel = [0,0];
        } else {
          this.bounce(otherObject);
        }
      }
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
    this.game.shootBullet({pos:[(this.game.DIM_X / 2), (this.game.DIM_Y / 2)], vel: [vel_vectors[0] * -10, vel_vectors[1] * -10] , color: 'black', radius: 2})
  }

  burst() {
    let projectiles = this.game.allObjects().filter(obj => obj instanceof Projectile)
    for(let i = 0; i < projectiles.length; i++) {
      if(projectiles[i].stuck === true) {
        let new_theta = (this.rad - projectiles[i].dTheta) % (Math.PI * 2);
        let new_rel_x = this.outerRadius * Math.cos(new_theta);
        let new_rel_y = this.outerRadius * Math.sin(new_theta);
        projectiles[i].stuck = false;

        //ADD SPECIFIC CONDITIONALS
        // if (new_rel_x > 0 && new_rel_y > 0) {
        //   projectiles[i].pos[0] = this.game.DIM_X/2 + new_rel_x + 100;
        //   projectiles[i].pos[1] = this.game.DIM_Y/2 - new_rel_y - 100;
        //   projectiles[i].vel[0] = (new_rel_x/(Math.sqrt(Math.pow(new_rel_x, 2) + Math.pow(new_rel_y, 2)))) * 10;
        //   projectiles[i].vel[1] = (new_rel_y/(Math.sqrt(Math.pow(new_rel_x, 2) + Math.pow(new_rel_y, 2)))) * 10;
        // } else if (new_rel_x < 0 && new_rel_y > 0) {
        //   projectiles[i].pos[0] = this.game.DIM_X/2 + new_rel_x - 100;
        //   projectiles[i].pos[1] = this.game.DIM_Y/2 - new_rel_y - 100;
        //   projectiles[i].vel[0] = (new_rel_x/(Math.sqrt(Math.pow(new_rel_x, 2) + Math.pow(new_rel_y, 2)))) * 10;
        //   projectiles[i].vel[1] = (new_rel_y/(Math.sqrt(Math.pow(new_rel_x, 2) + Math.pow(new_rel_y, 2)))) * 10;
        // } else if (new_rel_x < 0 && new_rel_y < 0) {
        //   projectiles[i].pos[0] = this.game.DIM_X/2 - new_rel_x - 100;
        //   projectiles[i].pos[1] = this.game.DIM_Y/2 - new_rel_y + 100;
        //   projectiles[i].vel[0] = (new_rel_x/(Math.sqrt(Math.pow(new_rel_x, 2) + Math.pow(new_rel_y, 2)))) * 10;
        //   projectiles[i].vel[1] = (new_rel_y/(Math.sqrt(Math.pow(new_rel_x, 2) + Math.pow(new_rel_y, 2)))) * 10;
        // } else if (new_rel_x > 0 && new_rel_y < 0) {
        //   projectiles[i].pos[0] = this.game.DIM_X/2 - new_rel_x + 100;
        //   projectiles[i].pos[1] = this.game.DIM_Y/2 - new_rel_y - 100;
        //   projectiles[i].vel[0] = (new_rel_x/(Math.sqrt(Math.pow(new_rel_x, 2) + Math.pow(new_rel_y, 2)))) * 10;
        //   projectiles[i].vel[1] = (new_rel_y/(Math.sqrt(Math.pow(new_rel_x, 2) + Math.pow(new_rel_y, 2)))) * 10;
        // }

        projectiles[i].vel[0] = (new_rel_x/(Math.sqrt(Math.pow(new_rel_x, 2) + Math.pow(new_rel_y, 2)))) * 10;
        projectiles[i].vel[1] = (new_rel_y/(Math.sqrt(Math.pow(new_rel_x, 2) + Math.pow(new_rel_y, 2)))) * 10;
      }
    }
  }

}

export default Disc;
