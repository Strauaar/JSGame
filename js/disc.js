import MovingObject from './moving_object';

class Disc {
  constructor(options){
    // super(options);
    this.outerRadius = 150;
    this.innerRadius = 100;
    this.draw = this.draw.bind(this);
    this.drawDonut = this.drawDonut.bind(this);
    this.move = this.move.bind(this);
    this.setRadialGradient = this.setRadialGradient.bind(this);
  }

  draw(ctx) {
    this.setRadialGradient(ctx, "#DC1C29", "#B7161B");
    this.drawDonut(ctx, 0, Math.PI * 2/3);
    this.setRadialGradient(ctx, "#84BC3D", "#5B8829");
    this.drawDonut(ctx, Math.PI * 2/3, Math.PI * 4/3)
    this.setRadialGradient(ctx, "#27A1D4", "#2182AD");
    this.drawDonut(ctx, Math.PI * 4/3, Math.PI * 2)
  }

  drawDonut(ctx, sRadian, eRadian){

      ctx.beginPath();
          ctx.arc(300, 300, this.outerRadius, sRadian, eRadian, false); // Outer: CCW
          ctx.arc(300, 300, this.innerRadius, eRadian, sRadian, true); // Inner: CW
      ctx.closePath();

      // add shadow
      this.addShadow(ctx);

      ctx.fill();
  }

  addShadow(ctx){
      ctx.shadowColor = "#333";
      ctx.shadowBlur = 5;
      ctx.shadowOffsetX = 0;
      ctx.shadowOffsetY = 0;
  }

  move () {

  }

  setRadialGradient(ctx, sgc, bgc){
      let grd = ctx.createRadialGradient(300, 300, this.innerRadius + 5, 300, 300, this.outerRadius);
      grd.addColorStop(0,sgc);
      grd.addColorStop(1,bgc);
      ctx.fillStyle = grd;
  }

}

export default Disc;
