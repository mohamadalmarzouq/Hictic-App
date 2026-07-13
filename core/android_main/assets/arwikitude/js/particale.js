var SCREEN_WIDTH = window.innerWidth,
  SCREEN_HEIGHT = window.innerHeight,
  mousePos = {
    x: 400,
    y: 300
  },


  // create canvas
  canvas = document.createElement("canvas"),
  context = canvas.getContext("2d"),
  particles = [],
  rockets = [],
  MAX_PARTICLES = 1000,
  //   colorCode = 0;
  launchId = null;
loopId = null;
flag = true;
colorParticaleEffect =true;

// init
$(document).ready(function() {
  document.body.appendChild(canvas);
  canvas.width = SCREEN_WIDTH;
  canvas.height = SCREEN_HEIGHT;
});

function launch() {
  startexplode();
  launchFrom(mousePos.x);
  clearInterval(launchId);
}
function instantiateParticale() {
  flag = true;
  launchId = setInterval(launch, 150);
  loopId = setInterval(loop, 1);
}

function launchFrom(x) {
  if (rockets.length < 1) {
    var rocket = new Rocket(x);
    //   rocket.explosionColor = Math.floor(Math.random() * 360 / 10) * 10;
    rocket.vel.y = Math.random() * -3 - 4;
    rocket.vel.x = Math.random() * 6 - 3;
    rocket.size = 8;
    rocket.shrink = 0.999;
    rocket.gravity = 0.01;
    rockets.push(rocket);
  }
}

function loop() {
  // update screen size
  if (SCREEN_WIDTH != window.innerWidth) {
    canvas.width = SCREEN_WIDTH = window.innerWidth;
  }
  if (SCREEN_HEIGHT != window.innerHeight) {
    canvas.height = SCREEN_HEIGHT = window.innerHeight;
  }

  // clear canvas
  //  context.fillStyle = "rgba(0, 0, 0, 0.05)";
  context.fillRect(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT);
  context.clearRect(0, 0, canvas.width, canvas.height);

  var existingRockets = [];

  for (var i = 0; i < rockets.length; i++) {
    rockets[0].explode();
  }

  rockets = existingRockets;

  var existingParticles = [];

  for (var i = 0; i < particles.length; i++) {
    particles[i].update();

    // render and save particles that can be rendered
    if (particles[i].exists()) {
      particles[i].render(context);
      existingParticles.push(particles[i]);
    }
  }

  // update array with existing particles - old particles should be garbage collected
  particles = existingParticles;

  while (particles.length > MAX_PARTICLES) {
    particles.shift();
  }
  if (flag == false) {
    clearInterval(loopId);
  }
}

function Particle(pos) {
  this.pos = {
    x: pos ? pos.x : 0,
    y: pos ? pos.y : 0
  };
  this.vel = {
    x: 0,
    y: 0
  };
  this.shrink = 0.97;
  this.size = 20;

  this.resistance = 0;
  this.gravity = 0;

  this.flick = false;

  this.alpha = 1;
  this.fade = 0;
  //  this.color = 0;
}

Particle.prototype.update = function() {
  // apply resistance
  this.vel.x *= this.resistance;
  this.vel.y *= this.resistance;

  // gravity down
  this.vel.y += this.gravity;

  // update position based on speed
  this.pos.x += this.vel.x;
  this.pos.y += this.vel.y;

  // shrink
  this.size *= this.shrink;

  // fade out
  this.alpha -= this.fade;
};

Particle.prototype.render = function(c) {
  if (!this.exists()) {
    return;
  }

  c.save();

  c.globalCompositeOperation = "lighter";

  var x = this.pos.x,
    y = this.pos.y,
    r = this.size / 2;

  /*   var gradient = c.createRadialGradient(x, y, 0.1, x, y, r);
    gradient.addColorStop(0.1, "rgba(255, 209, 97," + this.alpha + ")");
       gradient.addColorStop(0.8, "rgba(255, 209, 97," + this.alpha + ")");
       gradient.addColorStop(1, "rgba(255, 209, 97, 0.1)");

       c.fillStyle = gradient;*/

  //c.beginPath();
  //c.arc(this.pos.x, this.pos.y, this.flick ? Math.random() * this.size : this.size, 0, Math.PI * 2, true);
  // c.closePath();
  //c.fill();

  var alpha = (2 * Math.PI) / 10;
  var radius = this.size / 2;
  var starXY = [this.pos.x, this.pos.y];

  c.beginPath();

  for (var i = 11; i != 0; i--) {
    var r = (radius * ((i % 2) + 1)) / 2;
    var omega = alpha * i;
    c.lineTo(r * Math.sin(omega) + starXY[0], r * Math.cos(omega) + starXY[1]);
  }
  c.closePath();
  c.strokeStyle = "#fff";
  test=Boolean(Math.round(Math.random()));
  c.fillStyle=(test==true) ? "#F1C40F" : "#003F7F";

 // c.fillStyle = "#F1C40F";
  //  c.fillStyle = "#FFF116";
  c.lineWidth = 2;
  c.fill();

  c.restore();
};

Particle.prototype.exists = function() {
  return this.alpha >= 0.1 && this.size >= 1;
};

function Rocket(x) {
  if (flag) {
    Particle.apply(this, [
      {
        x: SCREEN_WIDTH / 2,
        y: SCREEN_HEIGHT / 2
      }
    ]);

    //  this.explosionColor = 0;
    //flag=true;
  }
}

Rocket.prototype.explode = function() {
  var count = 150; //500 + 80;

  for (var i = 0; i < count; i++) {
    var particle = new Particle(this.pos);
    var angle = Math.random() * Math.PI * 2;

    // emulate 3D effect by using cosine and put more particles in the middle
    var speed = Math.cos((Math.random() * Math.PI) / 2) * 90;

    particle.vel.x = Math.cos(angle) * speed;
    particle.vel.y = Math.sin(angle) * speed;

    particle.size = 40;

    //particle.gravity = 0.2;
    particle.resistance = 0.92;
    particle.shrink = Math.random() * 0.05 + 0.93;

    particle.flick = true;
    //   particle.color = 32;

    particles.push(particle);
  }
  this.alpha = 0;
};

function startexplode() {
  setTimeout(function myfunction() {
    flag = false;
  }, 10000);
}
