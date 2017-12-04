const COLOR = ['red', 'blue', 'green'];

export const randomColor = () => {
  return COLOR[Math.floor(Math.random() * COLOR.length)];
}
