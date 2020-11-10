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
  p2 = {
    x: e.clientX * pixelRatio,
    y: e.clientY * pixelRatio
  };
  p3 = {
    x: e.clientX * pixelRatio,
    y: e.clientY * pixelRatio
  };
  p4 = {
    x: e.clientX * pixelRatio,
    y: e.clientY * pixelRatio
  };
  p5 = {
    x: e.clientX * pixelRatio,
    y: e.clientY * pixelRatio
  };
  render();
});

canvas.addEventListener("click", function (e) {

  if (animal < 4) {
    animal++
  }
  else {
    animal = 0;
  }

  render()
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
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  let booper = images[animal];

  // if (animal) {
  if (animal == 0) {
    ctx.drawImage(booper, p1.x - 350, p1.y - 700)
  } else if (animal == 1) {
    ctx.drawImage(booper, p2.x - 310, p2.y - 600)
  } else if (animal == 2) {
    ctx.drawImage(booper, p3.x - 290, p3.y - 850)
  } else if (animal == 3) {
    ctx.drawImage(booper, p4.x - 420, p4.y - 850)
  } else {
    ctx.drawImage(booper, p5.x - 400, p5.y - 650)
  }

}

render();
