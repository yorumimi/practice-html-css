//https://liginc.co.jp/560218

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.requestAnimationFrame =
  window.requestAnimationFrame ||
  window.mozRequestAnimationFrame ||
  window.weblitRequestAnimationFrame ||
  window.msRequestAnimationFrame ||
  function (cb) { setTimeout(cb, 17); };

const NUM = 200;
const particles = [];
const mouse = {
  x: null,
  y: null,
  radius: 100,
}

window.addEventListener('mousemove', (event) => {
  mouse.x = event.x;
  mouse.y = event.y;
});

class Particle {
  constructor(x, y, radius, directionX, directionY, index) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.directionX = directionX;
    this.directionY = directionY;
    this.index = index;
  }
  render() {
    // �F�̐ݒ�
    this.setColor();

    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true);
  }
  setColor() {
    if(this.index % 3 === 0) {
      ctx.fillStyle = "#fff";
      ctx.fill();
    } else {
      ctx.strokeStyle = "#fff";
      ctx.lineWidth = 1;
      ctx.stroke();
      }
    }
  update () {


    if (this.detectCollision()) {
      if (this.x > mouse.x) {
        this.x += this.radius;
        if (this.directionX < 0) this.directionX = -this.directionX;
      }
      if (this.x < mouse.x) {
        this.x -= this.radius;
        if (this.directionX > 0) this.directionX = -this.directionX;
      }
      if (this.y > mouse.y) {
        this.y += this.radius;
        if (this.y < 0) this.directionY = -this.directionY;
      }
      if (this.y < mouse.y) {
        this.y -= this.radius;
        if (this.y > 0) this.directionY = -this.directionY;
      }
    }

    this.x += this.directionX;
    this.y += this.directionY;

    if (this.x > canvas.width + this.radius || this.x < this.radius) {
      this.directionX = -this.directionX
    }
    if (this.y > canvas.height + this.radius || this.y < this.radius) {
      this.directionY = -this.directionY
    }
    this.render();
  }

  detectCollision () {
    // �Փ˂��Ă��邩�ǂ���
    const dx = mouse.x - this.x;
    const dy = mouse.y - this.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    return distance < mouse.radius + this.radius;
  }
}

init();
render();

function init() {
  for(let i = 0; i < NUM; i++) {
    // particles
    const x = Math.random() * canvas.width;
    const y = Math.floor(Math.random() * canvas.height);
    const radius = Math.floor(Math.random() * 3);
    const directionX = Math.random() * 2;
    const directionY = Math.random() * 2 - 1;
    const particle = new Particle(x, y, radius, directionX, directionY, i);
    particles.push(particle);
  }
}

function render() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for(let i = 0; i < particles.length; i++) {
    particles[i].update();
  }
  requestAnimationFrame(render);
}
