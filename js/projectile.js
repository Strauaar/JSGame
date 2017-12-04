const MovingObject = require('./moving_object.js');

class Projectile extends MovingObject {
  constructor(options){
    // options include color, pos: random position
    super(options);
  }
}
