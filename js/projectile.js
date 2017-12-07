import MovingObject from './moving_object';

class Projectile extends MovingObject {
  constructor(options){
    options.radius = 30;
    super(options);
    this.stuck = false;
  }

  collideWith(otherObject) {

  }
}

export default Projectile;
