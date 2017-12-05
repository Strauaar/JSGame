const COLOR = ['red', 'blue', 'green'];

export const randomColor = () => {
  return COLOR[Math.floor(Math.random() * COLOR.length)];
};

export const canvasHeight = () => {
  return window.innerHeight;
};

export const canvasWidth = () => {
  return window.innerWidth;
};

export const relative_x = (x_coord, x_dim) => {
  let rel_x;
  if(x_coord < (x_dim / 2)){
    rel_x = ((x_dim / 2) - x_coord) * -1;
  }else {
    rel_x = x_coord - (x_dim / 2);
  }
  return rel_x;
};

export const relative_y = (y_coord, y_dim) => {
  let rel_y;
  if(y_coord < (y_dim / 2)){
    rel_y = (y_dim / 2) - y_coord;
  } else {
    rel_y = (y_coord - (y_dim / 2)) * -1;
  }
  return rel_y;
};

export const distance = (x1, y1, x2, y2) => {
  return Math.sqrt(Math.pow((x2-x1), 2) + Math.pow((y2-y1), 2));
};

export const calculateRad = (rel_x, rel_y, theta) => {
  let rad;
  if(rel_x < 0 && rel_y < 0) {
    rad = Math.PI + theta
  } else if (rel_x > 0 && rel_y > 0) {
    rad = theta
  } else if (rel_x < 0 && rel_y > 0){
    rad = (Math.PI / 2) + (Math.PI / 2 + theta)
  } else if (rel_x > 0 && rel_y < 0) {
    rad = (Math.PI*3/2) + (Math.PI / 2 + theta)
  }
  return rad;
}
