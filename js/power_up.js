import MovingObject from './moving_object';

class PowerUp extends MovingObject {
  constructor(options) {
    options.radius = 10;
    options.color = 'yellow';
    super(options);
    this.disc = options.disc;
  }

  enablePowerup(toggle) {
    if(toggle === true && this.toggle !== true) {
      this.toggle = toggle;
      document.addEventListener('click', (e) => {
        console.log(e);
        this.disc.shoot(e.clientX, e.clientY);
      })
    } else {
      this.toggle = false;
      // removeEventListener
    }
  }
}

export default PowerUp;
