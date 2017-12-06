import MovingObject from './moving_object';

class Goal extends MovingObject {
  constructor(options){
    // options.color =
    options.vel = [0,0];

    super(options)
  }

  draw(ctx){
    ctx.fillStyle = this.color || 'red';
    ctx.beginPath();
    ctx.arc(0,
       600,
       30,
       0,
       2 * Math.PI,
       false
     );
    ctx.fill();
  }


}
