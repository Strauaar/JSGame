import MovingObject from './moving_object';

class Projectile extends MovingObject {
  constructor(options){
    options.radius = 30;
    super(options);
    this.stuck = false;
    this.counted = false;
  }
}

export default Projectile;
