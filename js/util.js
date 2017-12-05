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

export const randomPosition = () => {
  // let x_bounds_left = [canvasWidth() - 50, 0];
  // let x_bounds_right = [canvasWidth(), canvasWidth() + 50];
  // let y_bounds_top = [canvasHeight() - 50, 0];
  // let y_bounds_bottom = [canvasHeight(), canvasHeight() + 50];
  let x = Math.random() * canvaswidth();
  let y = Math.random() * canvasHeight();
  return [x,y];
};
