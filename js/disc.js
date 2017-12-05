import MovingObject from './moving_object';


class Disc extends MovingObject{
  constructor(options){
    super(options);
    this.outerRadius = 150;
    this.innerRadius = 100;
    this.fragments = [];
    this.theta = 0;
    // this.renderFragments();
    this.addListener();
    this.draw = this.draw.bind(this);
    this.drawDonut = this.drawDonut.bind(this);
    this.move = this.move.bind(this);
    this.setRadialGradient = this.setRadialGradient.bind(this);
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

  addListener() {

  }

  draw(ctx, rel_x, rel_y, theta) {
    let rad;
    if(rel_x < 0 && rel_y < 0) {
      rad = Math.PI + theta
    } else if (rel_x > 0 && rel_y > 0) {
      rad = theta
    } else if (rel_x < 0 && rel_y > 0){
      rad = (Math.PI / 2) + (Math.PI / 2 + theta)
    } else if (rel_x > 0 && rel_y < 0) {
      rad = (Math.PI*3/2) + (Math.PI / 2 + theta)
    }

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

}

export default Disc;
