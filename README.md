## Overview and Features
JSGame is a fun and colorful game comprised of four parts:
+ Disc
  + A user controlled disc in the middle of the canvas.
  + Only one instance of this disc.
  + The user controls the rotation of the disc with their mouse.
  + The disc is split by color.
+ Projectiles
  + A projectile comes from off the screen from random positions towards the user's disc.
  + The projectile is colored based on any of the colors of the user's disc.
  + The projectile will collide with the user's disc, and will reflect in a direction based on the incoming angle and velocity of the rotation of the disc.
  + If the color of the ball is the same as the side of the disc that it collides with, it will bounce off.
  + If not, the ball will stick to the outside of the disc.
  + Projectiles cannot bounce off parts of the disc that are covered in projectiles.
+ Goals
  + Goals will be placed around the canvas and the objective is to get the projectiles to go towards and pass the goals.
+ Power-ups
  + Such power-ups will be implemented:
    + The user can release all the stuck projectiles on the disc it directions normal to the the face of the disc.
    + The user gains the ability to shoot incoming projectiles.

In addition to the above features, the user will be able to access a game menu.

Game difficulty will increase in terms of faster projectiles, smaller goal targets, and higher projectile count.
The game will end once the disc is completely covered in projectiles and the objective is to get the most goals!

## Wireframes
The app will be a single screen which will take up the size of the window. The user will be introduced to the game with a splash title and tutorial options.
The main game layout is shown below.
![Main-page-image](https://github.com/Strauaar/JSGame/blob/master/wireframes/main.png)
