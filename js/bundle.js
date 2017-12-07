/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 4);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var MovingObject = function () {
  function MovingObject(options) {
    _classCallCheck(this, MovingObject);

    this.pos = options.pos;
    this.vel = options.vel;
    this.radius = options.radius;
    this.game = options.game;
    this.color = options.color;
    this.draw = this.draw.bind(this);
    this.move = this.move.bind(this);
    this.didCollideWith = this.didCollideWith.bind(this);
  }

  _createClass(MovingObject, [{
    key: "draw",
    value: function draw(ctx) {
      // console.log(this);
      ctx.fillStyle = this.color;
      ctx.beginPath();
      ctx.arc(this.pos[0], this.pos[1], this.radius, 0, 2 * Math.PI, false);
      ctx.fill();
    }
  }, {
    key: "move",
    value: function move() {
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
  }, {
    key: "didCollideWith",
    value: function didCollideWith(otherObejct) {
      // let totalRadius = this.radius + otherObejct.radius;
      // if (distance formula <= totalRadius){
      // return true;
      // } else {
      // return false;
      // }
    }
  }]);

  return MovingObject;
}();

exports.default = MovingObject;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _moving_object = __webpack_require__(0);

var _moving_object2 = _interopRequireDefault(_moving_object);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Projectile = function (_MovingObject) {
  _inherits(Projectile, _MovingObject);

  function Projectile(options) {
    _classCallCheck(this, Projectile);

    options.radius = 30;
    return _possibleConstructorReturn(this, (Projectile.__proto__ || Object.getPrototypeOf(Projectile)).call(this, options));
  }

  _createClass(Projectile, [{
    key: 'collideWith',
    value: function collideWith(otherObject) {}
  }]);

  return Projectile;
}(_moving_object2.default);

exports.default = Projectile;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _moving_object = __webpack_require__(0);

var _moving_object2 = _interopRequireDefault(_moving_object);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var PowerUp = function (_MovingObject) {
  _inherits(PowerUp, _MovingObject);

  function PowerUp(options) {
    _classCallCheck(this, PowerUp);

    options.radius = 10;
    options.color = 'yellow';

    var _this = _possibleConstructorReturn(this, (PowerUp.__proto__ || Object.getPrototypeOf(PowerUp)).call(this, options));

    _this.disc = options.disc;
    _this.toggle = false;
    return _this;
  }

  _createClass(PowerUp, [{
    key: 'enablePowerup',
    value: function enablePowerup(toggle) {
      if (toggle === true && this.toggle !== true) {
        this.toggle = toggle;
        this.powerup = PowerUp.addShooter.bind(this);
        document.addEventListener('click', this.powerup);
      } else if (toggle === false) {
        console.log("disable");
        this.toggle = false;
        document.removeEventListener('click', this.powerup);
      }
    }
  }]);

  return PowerUp;
}(_moving_object2.default);

PowerUp.addShooter = function (e) {
  this.disc.shoot(e.clientX, e.clientY);
};

exports.default = PowerUp;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var COLOR = ['red', 'blue', 'green'];

var randomColor = exports.randomColor = function randomColor() {
  return COLOR[Math.floor(Math.random() * COLOR.length)];
};

var canvasHeight = exports.canvasHeight = function canvasHeight() {
  return window.innerHeight;
};

var canvasWidth = exports.canvasWidth = function canvasWidth() {
  return window.innerWidth;
};

var relative_x = exports.relative_x = function relative_x(x_coord, x_dim) {
  var rel_x = void 0;
  if (x_coord < x_dim / 2) {
    rel_x = (x_dim / 2 - x_coord) * -1;
  } else {
    rel_x = x_coord - x_dim / 2;
  }
  return rel_x;
};

var relative_y = exports.relative_y = function relative_y(y_coord, y_dim) {
  var rel_y = void 0;
  if (y_coord < y_dim / 2) {
    rel_y = y_dim / 2 - y_coord;
  } else {
    rel_y = (y_coord - y_dim / 2) * -1;
  }
  return rel_y;
};

var distance = exports.distance = function distance(x1, y1, x2, y2) {
  return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
};

var calculateRad = exports.calculateRad = function calculateRad(rel_x, rel_y, theta) {
  var rad = void 0;
  if (rel_x < 0 && rel_y < 0) {
    rad = Math.PI + theta;
  } else if (rel_x > 0 && rel_y > 0) {
    rad = theta;
  } else if (rel_x < 0 && rel_y > 0) {
    rad = Math.PI / 2 + (Math.PI / 2 + theta);
  } else if (rel_x > 0 && rel_y < 0) {
    rad = Math.PI * 3 / 2 + (Math.PI / 2 + theta);
  }
  return rad;
};

var calculateAngVelocity = exports.calculateAngVelocity = function calculateAngVelocity(start_angle, end_angle, start_time, end_time) {
  var dTheta = end_angle - start_angle;
  var dTime = end_time - start_time;
  var omega = dTheta / dTime;
  // debugger
  return omega;
};

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _game_view = __webpack_require__(5);

var _game_view2 = _interopRequireDefault(_game_view);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

document.addEventListener('DOMContentLoaded', function () {
  var canvas = document.getElementById('game-canvas');
  canvas.width = 800;
  canvas.height = 800;
  var ctx = canvas.getContext('2d');
  var gameView = new _game_view2.default(ctx);
  gameView.start(ctx);
});

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _game = __webpack_require__(6);

var _game2 = _interopRequireDefault(_game);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var GameView = function () {
  function GameView(ctx) {
    _classCallCheck(this, GameView);

    this.ctx = ctx;
    this.game = new _game2.default(ctx);
    this.start = this.start.bind(this);
  }

  _createClass(GameView, [{
    key: 'start',
    value: function start(ctx) {
      requestAnimationFrame(this.game.anim(ctx));
      // setInterval( () => {
      //   this.game.step();
      //   this.game.draw(ctx);
      // }, 60);
    }
  }]);

  return GameView;
}();

exports.default = GameView;

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _disc = __webpack_require__(7);

var _disc2 = _interopRequireDefault(_disc);

var _goal = __webpack_require__(8);

var _goal2 = _interopRequireDefault(_goal);

var _projectile = __webpack_require__(1);

var _projectile2 = _interopRequireDefault(_projectile);

var _power_up = __webpack_require__(2);

var _power_up2 = _interopRequireDefault(_power_up);

var _util = __webpack_require__(3);

var Util = _interopRequireWildcard(_util);

var _bullet = __webpack_require__(9);

var _bullet2 = _interopRequireDefault(_bullet);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Game = function () {
  function Game(ctx) {
    _classCallCheck(this, Game);

    this.projectiles = [];
    this.powerups = [];
    // TODO: Implement bullet as powerup
    this.bullets = [];
    this.goals = [];
    this.score = 0;
    this.ctx = ctx;
    this.DIM_X = 800;
    this.DIM_Y = 800;
    this.initProjectiles = this.initProjectiles.bind(this);
    this.initGoals();
    // this.initProjectiles();
    this.initPowerUps();
    this.randomPosition = this.randomPosition.bind(this);
    this.findCenter = this.findCenter.bind(this);
    this.initDisc();
    this.renderFragments();
    this.draw = this.draw.bind(this);
    this.anim = this.anim.bind(this);
    this.moveObjects = this.moveObjects.bind(this);
    this.wrap = this.wrap.bind(this);
    this.checkCollisionsWithDisc = this.checkCollisionsWithDisc.bind(this);
    this.checkCollisionsWithBullet = this.checkCollisionsWithBullet.bind(this);
    this.checkCollisionsWithGoal = this.checkCollisionsWithGoal.bind(this);
    this.step = this.step.bind(this);
    this.allObjects = this.allObjects.bind(this);
    this.shootBullet = this.shootBullet.bind(this);
    this.removePowerup = this.removePowerup.bind(this);
    this.removeObject = this.removeObject.bind(this);
    this.initTest();
  }

  _createClass(Game, [{
    key: 'initDisc',
    value: function initDisc() {
      this.disc = new _disc2.default({ pos: [this.DIM_X / 2, this.DIM_Y / 2], game: this });
    }
  }, {
    key: 'initGoals',
    value: function initGoals() {
      this.goals.push(new _goal2.default({ pos: [200, 200], game: this, radius: 20 }));
    }
  }, {
    key: 'initTest',
    value: function initTest() {
      this.projectiles.push(new _projectile2.default({ color: Util.randomColor(), pos: [800, 0], vel: this.findCenter([800, 0]), radius: 20, game: this }));
      this.projectiles.push(new _projectile2.default({ color: Util.randomColor(), pos: [0, 0], vel: this.findCenter([0, 0]), radius: 20, game: this }));
      this.projectiles.push(new _projectile2.default({ color: Util.randomColor(), pos: [0, 800], vel: this.findCenter([0, 800]), radius: 20, game: this }));
      this.projectiles.push(new _projectile2.default({ color: Util.randomColor(), pos: [800, 800], vel: this.findCenter([800, 800]), radius: 20, game: this }));
    }
  }, {
    key: 'initProjectiles',
    value: function initProjectiles() {
      var _this = this;

      var position = void 0;
      setInterval(function () {
        position = _this.randomPosition();
        _this.projectiles.push(new _projectile2.default({ color: Util.randomColor(), pos: position, vel: _this.findCenter(position), radius: 20, game: _this }));
      }, 1000);
    }
  }, {
    key: 'initPowerUps',
    value: function initPowerUps() {
      var _this2 = this;

      var position = void 0;
      var random_number = void 0;
      position = this.randomPosition();
      this.powerups.push(new _power_up2.default({ pos: position, vel: this.findCenter(position), game: this, disc: this.disc }));
      setInterval(function () {
        random_number = Math.floor(Math.random() * 3);
        switch (random_number) {
          default:
            position = _this2.randomPosition();
            _this2.powerups.push(new _power_up2.default({ pos: position, vel: _this2.findCenter(position), game: _this2, disc: _this2.disc }));
            break;
        }
      }, 10000);
    }
  }, {
    key: 'randomPosition',
    value: function randomPosition() {
      var x = void 0;
      var y = void 0;
      var rand = Math.floor(Math.random() * 4);
      switch (rand) {
        case 0:
          x = -50;
          y = Math.random() * this.DIM_Y;
          break;
        case 1:
          x = 50 + this.DIM_X;
          y = Math.random() * this.DIM_Y;
          break;
        case 2:
          x = Math.random() * this.DIM_X;
          y = -50;
          break;
        case 3:
          x = Math.random() * this.DIM_X;
          y = 50 + this.DIM_Y;
          break;
      }
      return [x, y];
    }
  }, {
    key: 'findCenter',
    value: function findCenter(pos) {
      var rel_x = void 0;
      var rel_y = void 0;

      if (pos[0] < 0) {
        rel_x = this.DIM_X / 2 * -1 + pos[0];
      } else if (pos[0] < this.DIM_X / 2) {
        rel_x = (this.DIM_X / 2 - pos[0]) * -1;
      } else {
        rel_x = pos[0] - this.DIM_X / 2;
      }

      if (pos[1] < 0) {
        rel_y = this.DIM_Y / 2 * -1 + pos[1];
      } else if (pos[1] < this.DIM_Y / 2) {
        rel_y = (this.DIM_Y / 2 - pos[1]) * -1;
      } else {
        rel_y = pos[1] - this.DIM_Y / 2;
      }
      var unit_vec_helper = Math.sqrt(Math.pow(rel_x, 2) + Math.pow(rel_y, 2));
      var x_unit_vec = rel_x / unit_vec_helper * -2;
      var y_unit_vec = rel_y / unit_vec_helper * -2;
      return [x_unit_vec, y_unit_vec];
    }
  }, {
    key: 'renderFragments',
    value: function renderFragments() {
      var _this3 = this;

      var timeout = void 0;
      var angular_vel = void 0;
      this.disc.start_time = 1;
      var registerMovement = function registerMovement(e) {
        clearTimeout(timeout);
        console.log("moving");
        _this3.disc.rel_x = Util.relative_x(e.clientX, _this3.DIM_X);
        _this3.disc.rel_y = Util.relative_y(e.clientY, _this3.DIM_Y);
        _this3.disc.theta = Math.atan(_this3.disc.rel_y / _this3.disc.rel_x);
        if (_this3.disc.start_time === 1) {
          _this3.disc.start_time = Date.now();
          _this3.disc.start_angle = Util.calculateRad(_this3.disc.rel_x, _this3.disc.rel_y, _this3.disc.theta);
        }
        _this3.disc.end_angle = Util.calculateRad(_this3.disc.rel_x, _this3.disc.rel_y, _this3.disc.theta);
        _this3.disc.dTheta = _this3.disc.end_angle - _this3.disc.start_angle;
        // angular_vel =
        _this3.disc.end_time = Date.now();

        _this3.disc.angular_vel = Util.calculateAngVelocity(_this3.disc.start_angle, _this3.disc.end_angle, _this3.disc.start_time, _this3.disc.end_time);
        timeout = setTimeout(function () {
          var event = new CustomEvent("mousestop", {
            detail: {
              clientX: e.clientX,
              clientY: e.clientY
            },
            bubbles: true,
            cancelable: true
          });
          e.target.dispatchEvent(event);
        }, 50);
      };

      var registerStaticPosition = function registerStaticPosition(e) {
        console.log("stopped");
        _this3.disc.rel_x = Util.relative_x(e.detail.clientX, _this3.DIM_X);
        _this3.disc.rel_y = Util.relative_y(e.detail.clientY, _this3.DIM_Y);
        // this.disc.theta = Math.atan(this.disc.rel_y/this.disc.rel_x);
        // this.disc.end_time = Date.now();
        _this3.disc.start_time = 1;
        // this.disc.dTheta = Math.PI/2;
      };

      document.addEventListener('mousemove', registerMovement);
      document.addEventListener('mousestop', registerStaticPosition);
    }
  }, {
    key: 'draw',
    value: function draw(ctx) {
      ctx.clearRect(0, 0, this.DIM_X, this.DIM_Y);
      // ctx.fillStyle = "#2c2d23";
      // ctx.fillRect(0, 0, this.DIM_X, this.DIM_Y);
      ctx.font = "30px Arial";
      ctx.fillText(this.score, 10, 50);
      this.allObjects().forEach(function (obj) {
        obj.draw(ctx);
      });
      this.bullets.forEach(function (bullet) {
        bullet.draw(ctx);
      });
      this.goals.forEach(function (goal) {
        goal.draw(ctx);
      });
      // console.log("rel_x", this.disc.rel_x);
      // console.log("rel_y", this.disc.rel_y);
      console.log("ang_vel", this.disc.angular_vel);
      this.disc.draw(this.ctx, this.disc.rel_x, this.disc.rel_y, this.disc.theta);

      // this.goals.forEach(goal => {
      //   goal.draw(ctx);
      // })
    }
  }, {
    key: 'anim',
    value: function anim(ctx) {
      var _this4 = this;

      return function () {
        _this4.step();
        _this4.draw(ctx);
        requestAnimationFrame(_this4.anim(ctx));
      };
    }
  }, {
    key: 'moveObjects',
    value: function moveObjects() {
      // this.allObjects().forEach(object => {
      //   object.move();
      // });
      // console.log(this.disc.dTheta);

      this.allObjects().forEach(function (obj) {
        obj.move();
      });
      this.bullets.forEach(function (bullet) {
        bullet.move();
      });
    }
  }, {
    key: 'wrap',
    value: function wrap() {}
  }, {
    key: 'checkCollisionsWithDisc',
    value: function checkCollisionsWithDisc() {
      var totalRadius = void 0;
      var object_array = this.allObjects();
      var distance = void 0;
      for (var i = 0; i < object_array.length; i++) {
        totalRadius = object_array[i].radius + this.disc.outerRadius;
        distance = Util.distance(this.disc.pos[0], this.disc.pos[1], object_array[i].pos[0], object_array[i].pos[1]);

        if (distance <= totalRadius) {
          this.disc.caluclateCollision(object_array[i]);
          // object_array[i].vel[0] = -1 * object_array[i].vel[0];
          // object_array[i].vel[1] = -1 * object_array[i].vel[1];
        } else {}
      }
    }
  }, {
    key: 'checkCollisionsWithBullet',
    value: function checkCollisionsWithBullet() {
      var totalRadius = void 0;
      var object_array = this.allObjects();
      var distance = void 0;
      for (var j = 0; j < this.bullets.length; j++) {
        for (var i = 0; i < object_array.length; i++) {
          totalRadius = object_array[i].radius + this.bullets[j].radius;
          distance = Util.distance(this.bullets[j].pos[0], this.bullets[j].pos[1], object_array[i].pos[0], object_array[i].pos[1]);

          if (distance <= totalRadius) {
            this.removeObject(object_array[i]);
          }
        }
      }
    }
  }, {
    key: 'checkCollisionsWithGoal',
    value: function checkCollisionsWithGoal() {
      var totalRadius = void 0;
      var object_array = this.allObjects();
      var distance = void 0;
      for (var j = 0; j < this.goals.length; j++) {
        for (var i = 0; i < object_array.length; i++) {
          totalRadius = object_array[i].radius + this.goals[j].radius;
          distance = Util.distance(this.goals[j].pos[0], this.goals[j].pos[1], object_array[i].pos[0], object_array[i].pos[1]);

          if (distance <= totalRadius && object_array[i] instanceof _projectile2.default) {

            this.score += 1;
          }
        }
      }
    }
  }, {
    key: 'step',
    value: function step() {
      this.moveObjects();
      this.checkCollisionsWithDisc();
      this.checkCollisionsWithBullet();
      this.checkCollisionsWithGoal();
    }
  }, {
    key: 'allObjects',
    value: function allObjects() {
      var all = this.projectiles.slice();
      // all.push(this.disc);
      // TODO: Add other objects
      all = all.concat(this.powerups);
      // all = all.concat(this.bullets);
      return all;
    }
  }, {
    key: 'shootBullet',
    value: function shootBullet(options) {
      options.game = this.game;
      this.bullets.push(new _bullet2.default(options));
    }
  }, {
    key: 'removePowerup',
    value: function removePowerup(otherObject) {
      var index = this.powerups.indexOf(otherObject);
      this.powerups.splice(index, 1);
    }
  }, {
    key: 'removeObject',
    value: function removeObject(otherObject) {
      if (otherObject instanceof _projectile2.default) {
        var index = this.projectiles.indexOf(otherObject);
        this.projectiles.splice(index, 1);
      } else if (otherObject instanceof _bullet2.default) {
        var _index = this.bullets.indexOf(otherObject);
        this.bullets.splice(_index, 1);
      }
    }
  }]);

  return Game;
}();

exports.default = Game;

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _moving_object = __webpack_require__(0);

var _moving_object2 = _interopRequireDefault(_moving_object);

var _projectile = __webpack_require__(1);

var _projectile2 = _interopRequireDefault(_projectile);

var _power_up = __webpack_require__(2);

var _power_up2 = _interopRequireDefault(_power_up);

var _util = __webpack_require__(3);

var Util = _interopRequireWildcard(_util);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Disc = function (_MovingObject) {
  _inherits(Disc, _MovingObject);

  function Disc(options) {
    _classCallCheck(this, Disc);

    var _this = _possibleConstructorReturn(this, (Disc.__proto__ || Object.getPrototypeOf(Disc)).call(this, options));

    _this.outerRadius = 150;
    _this.innerRadius = 100;
    _this.fragments = [];
    _this.theta = 0;
    _this.angular_vel = 0;
    // this.renderFragments();
    _this.draw = _this.draw.bind(_this);
    _this.drawDonut = _this.drawDonut.bind(_this);
    _this.move = _this.move.bind(_this);
    _this.setRadialGradient = _this.setRadialGradient.bind(_this);
    _this.caluclateCollision = _this.caluclateCollision.bind(_this);
    _this.enablePowerup = _this.enablePowerup.bind(_this);

    return _this;
  }

  // renderFragments() {
  //   let rel_x;
  //   let rel_y;
  //   const registerMovement = (e) => {
  //     if(e.clientX < (this.DIM_X / 2)){
  //       rel_x = ((this.DIM_X / 2) - pos[0]) * -1;
  //     }else {
  //       rel_x = pos[0] - (this.DIM_X / 2);
  //     }
  //   }
  //   document.addEventListener('mousemove', registerMovement)
  // }

  _createClass(Disc, [{
    key: 'draw',
    value: function draw(ctx) {
      var rel_x = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 10;
      var rel_y = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 10;
      var theta = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : Math.PI / 4;

      // console.log(this.end_angle);
      var rad = Util.calculateRad(rel_x, rel_y, theta);
      // this.rel_x = rel_x;
      // this.rel_y = rel_y;
      // this.theta = theta;

      this.setRadialGradient(ctx, "#DC1C29", "#B7161B");
      this.drawDonut(ctx, -rad, -rad + Math.PI * 2 / 3);
      this.setRadialGradient(ctx, "#84BC3D", "#5B8829");
      this.drawDonut(ctx, -rad + Math.PI * 2 / 3, -rad + Math.PI * 4 / 3);
      this.setRadialGradient(ctx, "#27A1D4", "#2182AD");
      this.drawDonut(ctx, -rad + Math.PI * 4 / 3, -rad + Math.PI * 2);
    }
  }, {
    key: 'drawDonut',
    value: function drawDonut(ctx, startRadian, endRadian) {

      ctx.beginPath();
      ctx.arc(this.pos[0], this.pos[1], this.outerRadius, startRadian, endRadian, false); // Outer: CCW
      ctx.arc(this.pos[0], this.pos[1], this.innerRadius, endRadian, startRadian, true); // Inner: CW
      ctx.closePath();

      // add shadow
      // this.addShadow(ctx);

      ctx.fill();
    }
  }, {
    key: 'addShadow',
    value: function addShadow(ctx) {
      ctx.shadowColor = "#333";
      ctx.shadowBlur = 6;
      ctx.shadowOffsetX = 0;
      ctx.shadowOffsetY = 0;
    }
  }, {
    key: 'move',
    value: function move() {}
  }, {
    key: 'setRadialGradient',
    value: function setRadialGradient(ctx, sgc, bgc) {
      var grd = ctx.createRadialGradient(this.pos[0], this.pos[1], this.innerRadius + 5, this.pos[0], this.pos[1], this.outerRadius);
      grd.addColorStop(0, sgc);
      grd.addColorStop(1, bgc);
      ctx.fillStyle = grd;
    }
  }, {
    key: 'caluclateCollision',
    value: function caluclateCollision(otherObject) {
      var rel_x = Util.relative_x(otherObject.pos[0], 800);
      var rel_y = Util.relative_y(otherObject.pos[1], 800);
      if (otherObject instanceof _projectile2.default) {
        // debugger
        if (this.angular_vel >= 0) {
          if (isNaN(this.angular_vel) || this.angular_vel === 0) {
            otherObject.vel[0] = -1 * otherObject.vel[0];
            otherObject.vel[1] = -1 * otherObject.vel[1];
          } else if (rel_x > 0 && rel_y === 0) {
            otherObject.vel[0] = -1 * otherObject.vel[0];
            otherObject.vel[1] = this.angular_vel;
          } else if (rel_x > 0 && rel_y > 0) {
            otherObject.vel[0] = Math.sin(this.dTheta) * this.angular_vel + otherObject.vel[0];
            otherObject.vel[1] = -1 * (Math.cos(this.dTheta) * this.angular_vel + otherObject.vel[1]);
          } else if (rel_x === 0 && rel_y > 0) {
            otherObject.vel[0] = -1 * this.angular_vel;
            otherObject.vel[1] = -1 * otherObject.vel[1];
          } else if (rel_x < 0 && rel_y > 0) {
            otherObject.vel[0] = -1 * Math.cos(this.dTheta) * this.angular_vel + -1 * otherObject.vel[0];
            otherObject.vel[1] = -1 * Math.sin(this.dTheta) * this.angular_vel + otherObject.vel[1];
          } else if (rel_x < 0 && rel_y === 0) {
            otherObject.vel[0] = -1 * otherObject.vel[0];
            otherObject.vel[1] = -1 * this.angular_vel;
          } else if (rel_x < 0 && rel_y < 0) {
            otherObject.vel[0] = Math.sin(this.dTheta) * this.angular_vel + otherObject.vel[0];
            otherObject.vel[1] = -1 * Math.cos(this.dTheta) * this.angular_vel + -1 * otherObject.vel[1];
          } else if (rel_x === 0 && rel_y < 0) {
            otherObject.vel[0] = this.angular_vel;
            otherObject.vel[1] = -1 * otherObject.vel[1];
          } else if (rel_x > 0 && rel_y < 0) {
            otherObject.vel[0] = -1 * Math.cos(this.dTheta) * this.angular_vel + -1 * otherObject.vel[0];
            otherObject.vel[1] = Math.sin(this.dTheta) * this.angular_vel + otherObject.vel[1];
          }
        }
      } else if (otherObject instanceof _power_up2.default) {
        this.enablePowerup(otherObject);
        this.game.removePowerup(otherObject);
      }
    }
  }, {
    key: 'enablePowerup',
    value: function enablePowerup(powerup) {
      powerup.enablePowerup(true);
      setTimeout(function () {
        powerup.enablePowerup(false);
      }, 5000);
    }
  }, {
    key: 'shoot',
    value: function shoot(x, y) {
      var vel_vectors = this.game.findCenter([x, y]);
      this.game.shootBullet({ pos: [this.game.DIM_X / 2, this.game.DIM_Y / 2], vel: vel_vectors, color: 'black', radius: 2 });
    }
  }]);

  return Disc;
}(_moving_object2.default);

exports.default = Disc;

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _moving_object = __webpack_require__(0);

var _moving_object2 = _interopRequireDefault(_moving_object);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Goal = function (_MovingObject) {
  _inherits(Goal, _MovingObject);

  function Goal(options) {
    _classCallCheck(this, Goal);

    options.color = 'grey';
    options.vel = [0, 0];
    options.color = 'green';
    return _possibleConstructorReturn(this, (Goal.__proto__ || Object.getPrototypeOf(Goal)).call(this, options));
  }

  _createClass(Goal, [{
    key: 'draw',
    value: function draw(ctx) {
      ctx.fillStyle = this.color || 'red';
      ctx.beginPath();
      ctx.arc(this.pos[0], this.pos[1], this.radius, 2 * Math.PI, false);
      ctx.fill();
    }
  }]);

  return Goal;
}(_moving_object2.default);

exports.default = Goal;

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _moving_object = __webpack_require__(0);

var _moving_object2 = _interopRequireDefault(_moving_object);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Bullet = function (_MovingObject) {
  _inherits(Bullet, _MovingObject);

  function Bullet(options) {
    _classCallCheck(this, Bullet);

    return _possibleConstructorReturn(this, (Bullet.__proto__ || Object.getPrototypeOf(Bullet)).call(this, options));
  }

  return Bullet;
}(_moving_object2.default);

exports.default = Bullet;

/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map