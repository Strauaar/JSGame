import MovingObject from './moving_object';

class Bullet extends MovingObject {
  constructor(options) {
    super(options)
    this.drawing = new Image();
    this.drawing.src = "assets/images/ball.png";
  }

  draw(ctx) {
    ctx.drawImage(this.drawing, this.pos[0],this.pos[1], 50,50);
  }
}

export default Bullet;
