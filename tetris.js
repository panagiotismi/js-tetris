const canvas = document.getElementById('tetris');
const ctx = canvas.getContext('2d');

ctx.scale(20, 20);

const matrixT = [[0, 0, 0], [1, 1, 1], [0, 1, 0]];

const player = {
  matrix: matrixT,
  offset: { x: 5, y: 5 },
};

const drawMatrix = ({ matrix, offset }) =>
  matrix.forEach((row, y) =>
    row.forEach((value, x) => {
      if (value) {
        ctx.fillStyle = 'red';
        ctx.fillRect(x + offset.x, y + offset.y, 1, 1);
      }
    })
  );

const draw = () => {
  ctx.fillStyle = '#000';
  ctx.fillRect(0, 0, canvas.clientWidth, canvas.clientHeight);

  drawMatrix(player);
};

const step = (start = 0, lastTime = 0, elapsed = 0) => (now = 0) => {
  player.offset.y += elapsed < 1000 ? 0 : 1;
  const interval = elapsed < 1000 ? elapsed + start - lastTime : 0;
  draw();
  requestAnimationFrame(step(now, start, interval));
};
const animate = step();

animate();
document.addEventListener('keydown', e => {
  switch (e.key) {
    case 'ArrowLeft':
      player.offset.x -= 1;
      break;
    case 'ArrowRight':
      player.offset.x += 1;
      break;
    case 'ArrowDown':
      player.offset.y += 1;
      // elapsed = 0;
      break;
    default:
      break;
  }
});
