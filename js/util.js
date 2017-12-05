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
