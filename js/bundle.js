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
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var GameView = __webpack_require__(1);

document.addEventListener('DOMContentLoaded', function () {
  var canvas = document.getElementById('game-canvas');
  var ctx = canvas.getContext('2d');
  var gameView = new GameView(ctx);
  gameView.start(ctx);
});

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Game = __webpack_require__(2);

var GameView = function () {
  function GameView(ctx) {
    _classCallCheck(this, GameView);

    this.game = new Game();
    this.ctx = ctx;
    this.start = this.start.bind(this);
  }

  _createClass(GameView, [{
    key: 'start',
    value: function start() {
      // this.ctx.fillStyle = 'red';
      // this.ctx.beginPath();
      // this.ctx.arc(
      //   0,
      //   0,
      //   120,
      //   2 * Math.PI,
      //   false
      // );
      // this.ctx.fill();
      setInterval(function () {
        // this.game.step();
        // this.game.draw(this.ctx);
      }, 20);
    }
  }]);

  return GameView;
}();

module.exports = GameView;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// TODO: import game components

var Game = function () {
  function Game() {
    _classCallCheck(this, Game);

    this.projectiles = [];
    // TODO: Implement bullet as powerup
    // this.bullets = [];

    // this.disc = new Disc(params here);
    this.DIM_X = window.innerWidth;
    this.DIM_Y = window.innerHeight;
    this.randomPosition = this.randomPosition.bind(this);
    this.draw = this.draw.bind(this);
    this.moveObjects = this.moveObjects.bind(this);
    this.wrap = this.wrap.bind(this);
    this.checkCollisions = this.checkCollisions.bind(this);
    this.step = this.step.bind(this);
    this.allObjects = this.allObjects.bind(this);
  }

  _createClass(Game, [{
    key: "randomPosition",
    value: function randomPosition() {}
  }, {
    key: "draw",
    value: function draw(ctx) {
      ctx.clearRect(0, 0, this.DIM_X, this.DIM_Y);
      // re-draw all objects
    }
  }, {
    key: "moveObjects",
    value: function moveObjects() {
      this.allObjects().forEach(function (object) {
        object.move();
      });
    }
  }, {
    key: "wrap",
    value: function wrap() {}
  }, {
    key: "checkCollisions",
    value: function checkCollisions() {}
  }, {
    key: "step",
    value: function step() {
      this.moveObjects();
      this.checkCollisions();
    }
  }, {
    key: "allObjects",
    value: function allObjects() {
      // let all = this.projectiles.slice();
      // all.push(this.disc);
      // TODO: Add other objects
      // all = all.concat()
      // return all;
    }
  }]);

  return Game;
}();

module.exports = Game;

/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map