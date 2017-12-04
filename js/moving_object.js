// TODO: Import files
class MovingObject {
  constructor(options) {
    this.pos = options.pos;
    this.vel = options.vel;
    this.radius = options.radius;
    // this.color = random color
    this.game = options.game;
    this.draw = this.draw.bind(this);
    this.move = this.move.bind(this);
    this.didCollideWith = this.didCollideWith.bind(this);
  }

  draw(ctx) {
    // ctx.fillStyle = this.color
    // ctx.beginPath();
    // ctx.arc(
    //   this.pos[0],
    //   this.pos[1],
    //   this.radius,
    //   0,
    //   2 * Math.PI,
    //   false
    // );
    // ctx.fill();
  }

  move() {
    this.pos[0] += this.vel[0];
    this.pos[1] += this.vel[0];
  }

  didCollideWith(otherObejct) {
    // let totalRadius = this.radius + otherObejct.radius;
    // if (distance formula <= totalRadius){
    // return true;
    // } else {
        // return false;
    // }
  }


}

module.exports = MovingObject;
