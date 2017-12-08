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
    this.drawing1 = new Image();
    this.drawing1.src = "assets/images/frame-2.png";
    this.drawing2 = new Image();
    this.drawing2.src = "assets/images/frame-3.png";
    this.drawing3 = new Image();
    this.drawing3.src = "assets/images/frame-4.png";
    this.drawing4 = new Image();
    this.drawing4.src = "assets/images/frame-5.png";

    this.count = 0;
    setInterval(() => {
      this.count += 1;
      this.count = this.count % 4;
    }, 190)
  }

  enablePowerup(toggle) {
    if(toggle === true && this.toggle !== true) {
      this.toggle = toggle;
      this.powerup = PowerUp.addShooter.bind(this);
      console.log(this.disc);
      document.addEventListener('click', this.powerup);
    } else if(toggle === false) {
      // console.log("disable");
      this.toggle = false;
      document.removeEventListener('click', this.powerup);
    }
  }

  draw(ctx) {
      if(this.count === 0) {
        ctx.drawImage(this.drawing, this.pos[0],this.pos[1], 50,50);
      } else if (this.count === 1) {
        ctx.drawImage(this.drawing1, this.pos[0],this.pos[1], 50,50);
      } else if (this.count === 2) {
        ctx.drawImage(this.drawing2, this.pos[0],this.pos[1], 50,50);
      } else if (this.count === 3) {
        ctx.drawImage(this.drawing3, this.pos[0],this.pos[1], 50,50);
      } else if (this.count === 4) {
        ctx.drawImage(this.drawing4, this.pos[0],this.pos[1], 50,50);
      }
  }


}

PowerUp.addShooter = function(e){
  this.disc.shoot(e.clientX, e.clientY);
}

export default PowerUp;
