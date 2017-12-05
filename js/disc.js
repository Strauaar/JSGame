import MovingObject from './moving_object';

class Disc extends MovingObject {
  constructor(options){
    super(options);
    this.outerRadius = 150;
    this.innerRadius = 100;
    this.draw = this.draw.bind(this);
    this.drawDonut = this.drawDonut.bind(this);
    this.move = this.move.bind(this);
  }

  draw(ctx) {
    this.drawDonut(ctx, 0, Math.PI * 2/3);
    this.drawDonut(ctx, Math.PI * 2/3, Math.PI * 4/3)
    this.drawDonut(ctx, Math.PI * 4/3, Math.PI * 2)
  }

  drawDonut(ctx, sRadian, eRadian){

      ctx.beginPath();
          ctx.arc(300, 300, this.outerRadius, sRadian, eRadian, false); // Outer: CCW
          ctx.arc(300, 300, this.innerRadius, eRadian, sRadian, true); // Inner: CW
      ctx.closePath();

      // add shadow
      // addShadow();

      ctx.fill();
  }

  move () {

  }

}

export default Disc;
