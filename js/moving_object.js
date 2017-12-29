class MovingObject {
  constructor(options) {
    this.pos = options.pos;
    this.vel = options.vel;
    this.radius = options.radius;
    this.game = options.game;
    this.color = options.color;
    this.draw = this.draw.bind(this);
    this.move = this.move.bind(this);
    this.didCollideWith = this.didCollideWith.bind(this);
  }

  draw(ctx) {
    // console.log(this);
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(
      this.pos[0],
      this.pos[1],
      this.radius,
      0,
      2 * Math.PI,
      false
    );
    ctx.fill();
  }

  move() {
    //maybe -50 /+50 will work
    // if(this.pos[0] < 0 || this.pos[0] > this.game.DIM_X) {
    //   let index = this.game.projectiles.indexOf(this);
    //   this.game.projectiles.splice(index, 1);
    // }
    // if(this.pos[1] < 0 || this.pos[1] > this.game.DIM_Y) {
    //   let index = this.game.projectiles.indexOf(this);
    //   this.game.projectiles.splice(index, 1);
    // }
    this.pos[0] += this.vel[0];
    this.pos[1] += this.vel[1];
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

export default MovingObject;
