const flipCard = document.getElementById('flip-card');
const cardInner = flipCard.querySelector('.flip-card-inner');
const audio = document.getElementById('background-music');
const volumeSlider = document.getElementById('volume-slider');

let flipped = false;

flipCard.addEventListener('click', () => {
  if (!flipped) {
    cardInner.classList.add('flipped');
    audio.play().catch(() => {});
    flipped = true;
  }
});

audio.volume = parseFloat(volumeSlider.value || 0.5);
volumeSlider.addEventListener('input', () => {
  audio.volume = volumeSlider.value;
});

flipCard.addEventListener('mousemove', (e) => {
  const rect = flipCard.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;
  const centerX = rect.width / 2;
  const centerY = rect.height / 2;
  const rotateY = (x - centerX) / 15;
  const rotateX = -(y - centerY) / 15;
  flipCard.style.transform = `translate(-50%, -50%) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
});

flipCard.addEventListener('mouseleave', () => {
  flipCard.style.transform = `translate(-50%, -50%) rotateX(0deg) rotateY(0deg)`;
});

const SNOW_INTERVAL = 300;
const SNOW_LIFETIME = 8000;
const MOUSE_SNOW_LIFETIME = 3000;
const MAX_SNOW_SIZE = 8;
const MIN_SNOW_SIZE = 3;

function createSnowflake(x, y, size, lifetime, drift = 0) {
  const s = document.createElement('div');
  s.className = 'snowflake';
  s.style.left = (x != null ? x : Math.random() * window.innerWidth) + 'px';
  s.style.top = (y != null ? y : -10) + 'px';
  s.style.width = size + 'px';
  s.style.height = size + 'px';
  s.style.setProperty('--drift', drift + (Math.random() * 50 - 25) + 'px');
  document.body.appendChild(s);
  setTimeout(() => s.remove(), lifetime);
}

const snowTimer = setInterval(() => {
  const size = Math.random() * (MAX_SNOW_SIZE - MIN_SNOW_SIZE) + MIN_SNOW_SIZE;
  const x = Math.random() * window.innerWidth;
  const life = SNOW_LIFETIME + (Math.random() * 3000 - 1500);
  createSnowflake(x, -10, size, life, Math.random() * 40 - 20);
}, SNOW_INTERVAL);

document.addEventListener('mousemove', (e) => {
  const size = Math.random() * 4 + 2;
  createSnowflake(e.pageX, e.pageY, size, MOUSE_SNOW_LIFETIME, Math.random() * 30 - 15);
});

window.addEventListener('beforeunload', () => clearInterval(snowTimer));
