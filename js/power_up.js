import MovingObject from './moving_object';

class PowerUp extends MovingObject {
  constructor(options) {
    options.radius = 10;
    options.color = 'yellow';
    super(options);
    this.disc = options.disc;
    this.toggle = false;
  }

  enablePowerup(toggle) {
    if(toggle === true && this.toggle !== true) {
      this.toggle = toggle;
      this.powerup = PowerUp.addShooter.bind(this);
      document.addEventListener('click', this.powerup);
    } else if(toggle === false) {
      // console.log("disable");
      this.toggle = false;
      document.removeEventListener('click', this.powerup);
    }
  }
}

PowerUp.addShooter = function(e){
  this.disc.shoot(e.clientX, e.clientY);
}

export default PowerUp;
