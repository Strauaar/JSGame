import MovingObject from './moving_object';

class PowerUp extends MovingObject {
  constructor(options) {
    options.radius = 10;
    options.color = 'yellow';
    super(options);
    this.disc = options.disc;
    this.toggle = false;
    this.drawing = new Image();
    this.drawing.src = "assets/images/frame-1.png";
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

  draw(ctx) {
       ctx.drawImage(this.drawing, this.pos[0],this.pos[1], 50,50);
    }

}

PowerUp.addShooter = function(e){
  this.disc.shoot(e.clientX, e.clientY);
}

export default PowerUp;
