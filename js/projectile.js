import MovingObject from './moving_object';

class Projectile extends MovingObject {
  constructor(options){
    options.radius = 30;
    super(options);
    this.stuck = false;
    this.counted = false;

  }

  // draw(ctx) {
  //   ctx.drawImage(this.drawing,100, 100, 100, 100, this.pos[0], this.pos[1], 70, 70);
  // }
}

export default Projectile;
