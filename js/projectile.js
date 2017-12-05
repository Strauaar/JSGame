import MovingObject from './moving_object';

class Projectile extends MovingObject {
  constructor(options){
    options.radius = 30;
    super(options);
  }

  collideWith(otherObject) {

  }
}

export default Projectile;
