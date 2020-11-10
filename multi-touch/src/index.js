// import { distance, scale, add, sub, angle, magnitude } from "./vector.js";
let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");

let imgs = [
  "src/0.png",
  "src/1.png",
  "src/2.png",
  "src/3.png",
  "src/4.png"
];

let animal = 0;

let pixelRatio = 1.5;
canvas.width = window.innerWidth * pixelRatio;
canvas.height = window.innerHeight * pixelRatio;

let p1 = { x: 100, y: 100 };
let p2 = { x: 200, y: 200 };
let p3 = { x: 300, y: 300 };
let p4 = { x: 400, y: 400 };
let p5 = { x: 500, y: 500 };

canvas.addEventListener("mousemove", function (e) {
  p1 = {
    x: e.clientX * pixelRatio,
    y: e.clientY * pixelRatio
  };
  render();
});

canvas.addEventListener("click", function (e) {
  p1 = {
    x: e.clientX * pixelRatio,
    y: e.clientY * pixelRatio
  };

  render();

  console.log('eyy')
})

canvas.addEventListener("touchmove", function (e) {
  e.preventDefault();
  let touches = Array.from(e.touches);

  let touch = touches[0];
  if (touch) {
    animal = 0;
    p1 = {
      x: touch.clientX * pixelRatio,
      y: touch.clientY * pixelRatio
    }
  };

  touch = touches[1];
  if (touch) {
    animal = 1;
    p2 = {
      x: touch.clientX * pixelRatio,
      y: touch.clientY * pixelRatio
    };
  }

  touch = touches[2];
  if (touch) {
    animal = 2;
    p3 = {
      x: touch.clientX * pixelRatio,
      y: touch.clientY * pixelRatio
    };
  }

  touch = touches[3];
  if (touch) {
    animal = 3;
    p4 = {
      x: touch.clientX * pixelRatio,
      y: touch.clientY * pixelRatio
    };
  }
  touch = touches[4];
  if (touch) {
    animal = 4;
    p5 = {
      x: touch.clientX * pixelRatio,
      y: touch.clientY * pixelRatio
    };
  }

  render();
});


let images = imgs.map((url) => {
  const image = new Image();
  image.crossOrigin = "anonymous";
  image.src = url;
  return image;
});

function render() {
  let length = distance(p1, p2);
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = `hsl(240,90%,60%)`;

  let booper = images[animal];

  // if (animal) {
  if (animal == 0) {
    ctx.drawImage(booper, p1.x - 350, p1.y - 700)
  } else if (animal == 1) {
    ctx.drawImage(booper, p2.x - 290, p2.y - 600)
  } else if (animal == 2) {
    ctx.drawImage(booper, p3.x - 290, p3.y - 850)
  } else if (animal == 3) {
    ctx.drawImage(booper, p4.x - 310, p4.y - 850)
  } else {
    ctx.drawImage(booper, p3.x - 290, p3.y - 600)
  }
  // console.log(animal)
  // }

  // ctx.beginPath();
  // ctx.arc(p1.x, p1.y, 30, 0, Math.PI * 2);
  // ctx.fill();

  // ctx.beginPath();
  // ctx.stroke();

  // ctx.fillStyle = `hsl(30,90%,60%)`;

  // ctx.beginPath();
  // ctx.arc(p2.x, p2.y, 30, 0, Math.PI * 2);
  // ctx.fill();

  // ctx.beginPath();
  // ctx.arc(p3.x, p3.y, 30, 0, Math.PI * 2);
  // ctx.fill();

  // ctx.beginPath();
  // ctx.arc(p4.x, p4.y, 30, 0, Math.PI * 2);
  // ctx.fill();

  // ctx.beginPath();
  // ctx.arc(p5.x, p5.y, 30, 0, Math.PI * 2);
  // ctx.fill();

  //between touch 1-2
  // ctx.beginPath();
  // ctx.stroke();

  // let pDifference = sub(p1, p2);

  // pDifference = scale(pDifference, 0.5);
  // let otherp = add(p1, pDifference);

  // ctx.fillStyle = `black`;
  // ctx.strokeStyle = `black`;
  // ctx.beginPath();
  // ctx.arc(otherp.x, otherp.y, length / 2, 0, Math.PI * 2);
  // ctx.stroke();
  // ctx.beginPath();
  // ctx.arc(otherp.x, otherp.y, 15, 0, Math.PI * 2);
  // ctx.font = "20px monospace";
  // ctx.fillText(length.toFixed(1) + "px", otherp.x + 20, otherp.y);


  // ctx.fill();
  // ctx.beginPath();
  // ctx.moveTo(p1.x, p1.y);
  // ctx.lineTo(p2.x, p2.y);
  // ctx.stroke();
}

render();


////////Vector.js
function add(a, b) {
  return { x: a.x + b.x, y: a.y + b.y };
}

function sub(a, b) {
  return { x: b.x - a.x, y: b.y - a.y };
}

function scale(a, s) {
  return { x: a.x * s, y: a.y * s };
}
function magnitude(a) {
  return Math.sqrt(Math.pow(a.x, 2) + Math.pow(a.y, 2));
}
function angle(a) {
  return Math.atan2(a.y, a.x); //radians
}

function normalize(a) {
  let mag = magnitude(a);
  return { x: a.x / mag, y: a.y / mag };
}

function distance(a, b) {
  return magnitude(sub(a, b));
}

function random(n) {
  return (Math.random() - 0.5) * n;
}
function random_vector(n) {
  return { x: random(n), y: random(n) };
}

function pointsAlongLine(startx, starty, endx, endy, spacing) {
  let dist = distance(startx, starty, endx, endy);
  let points = [];

  let start = { x: startx, y: starty };
  let end = { x: endx, y: endy };
  for (var d = 0; d <= dist + 1; d += spacing) {
    let relative = sub(end, start);
    let delta = scale(normalize(relative), -d);
    let point = add(start, delta);
    points.push(point);
    if (points.length >= 10000) break;
  }
  return points;
}