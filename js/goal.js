import MovingObject from './moving_object';

class Goal extends MovingObject {
  constructor(options){
    options.color = 'grey';
    options.vel = [0,0];
    options.color = 'green';
    super(options)
  }

  draw(ctx){
    ctx.fillStyle = this.color || 'red';
    ctx.beginPath();
    ctx.arc(
       this.pos[0],
       this.pos[1],
       this.radius,
       2 * Math.PI,
       false
     );
    ctx.fill();
  }
}

export default Goal;
