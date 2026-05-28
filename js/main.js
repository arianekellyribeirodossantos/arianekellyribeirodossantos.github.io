const canvas = document.getElementById('code-rain');
const ctx    = canvas.getContext('2d');

const CHARS = '01{}[]()<>/=+*&|!?;:_#@$recruit=>async function const let var true false null return import export class new if else for while'.split('');
const COL_W = 18;
const TARGET_FPS = 18;
const FRAME_MS   = 1000 / TARGET_FPS;

let cols, drops, lastTimestamp = 0;

function resize() {
  const newCols = Math.floor(window.innerWidth / COL_W);

  if (!drops) {
    drops = Array.from({ length: newCols }, () => Math.random() * -50);
  } else if (newCols > cols) {
    for (let i = cols; i < newCols; i++) drops.push(Math.random() * -50);
  } else {
    drops.length = newCols;
  }

  cols          = newCols;
  canvas.width  = window.innerWidth;
  canvas.height = window.innerHeight;
}

function draw(timestamp) {
  requestAnimationFrame(draw);

  if (timestamp - lastTimestamp < FRAME_MS) return;
  lastTimestamp = timestamp;

  ctx.fillStyle = 'rgba(15, 10, 30, 0.05)';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  for (let i = 0; i < cols; i++) {
    const char       = CHARS[Math.floor(Math.random() * CHARS.length)];
    const brightness = Math.random();

    if (brightness > 0.97) {
      ctx.fillStyle = 'rgba(232, 121, 249, 0.9)';
      ctx.font      = 'bold 13px monospace';
    } else if (brightness > 0.85) {
      ctx.fillStyle = 'rgba(168, 85, 247, 0.55)';
      ctx.font      = '13px monospace';
    } else {
      ctx.fillStyle = 'rgba(124, 58, 237, 0.18)';
      ctx.font      = '12px monospace';
    }

    ctx.fillText(char, i * COL_W, drops[i] * COL_W);

    if (drops[i] * COL_W > canvas.height && Math.random() > 0.975) {
      drops[i] = 0;
    }
    drops[i]++;
  }
}

resize();
window.addEventListener('resize', resize);
requestAnimationFrame(draw);

// Back to top
const backToTop = document.getElementById('back-to-top');
window.addEventListener('scroll', () => {
  backToTop.classList.toggle('visible', window.scrollY > 400);
});
backToTop.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});
