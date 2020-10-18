let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let penDown = false;
let last_x = 0;
let last_y = 0;
let activePen = 2;

window.addEventListener("load", init);
//buttons
function init() {
  let pen1 = document.getElementById("button1");
  let pen2 = document.getElementById("button2");
  let pen3 = document.getElementById("button3");
  let clearButton = document.getElementById("buttonClear");

  pen1.addEventListener("click", () => {
    activePen = 0;
    clearPen();
    console.log(activePen)
  })
  pen2.addEventListener("click", () => {
    activePen = 1;
    clearPen();
    console.log(activePen)
  })
  pen3.addEventListener("click", () => {
    activePen = 2;
    clearPen();
    console.log(activePen)
  })
  clearButton.addEventListener("click", () => {
    console.log('hi4')
  })

}

//canvas touches
canvas.addEventListener("touchstart", (evt) => {
  let touches = Array.from(evt.touches);
  let touch = touches[0]
  drawStart(touch.clientX, touch.clientY)
});

canvas.addEventListener("mousedown", (evt) => {
  drawStart(evt.clientX, evt.clientY);
});

canvas.addEventListener("touchmove", (evt) => {
  evt.preventDefault();
  let touches = Array.from(evt.touches);
  let touch = touches[0];
  drawMove(touch.clientX, touch.clientY);
});

canvas.addEventListener("mousemove", (evt) => {
  if (penDown === false) {
    return;
  }
  drawMove(evt.clientX, evt.clientY);
});

canvas.addEventListener("touchend", (evt) => {
  drawEnd(last_x, last_y);
});

canvas.addEventListener("mouseout", () => {
  penDown = false;
});

canvas.addEventListener("mouseup", (evt) => {
  penDown = false;
  drawEnd(evt.clientX, evt.clientY);
});

function drawStart(x, y) {
  penDown = true;

  if (activePen == 0) {
    //pen 1
    ctx.beginPath();
    ctx.arc(x, y, 1, 0, 2 * Math.PI);
    ctx.shadowBlur = 10;
    ctx.shadowColor = 'black';
  } else if (activePen == 1) {
    // pen 2
    pen2(x, y, .5);
  } else {
    // pen 3
  };

  last_x = x;
  last_y = y;
}

// let img = new Image();
// img.src = "./src/dots.png"
function drawMove(x, y) {
  if (activePen == 0) {
    //pen 1
    ctx.lineWidth = 2;
    ctx.lineJoin = ctx.lineCap = 'round';
    ctx.moveTo(last_x, last_y);
    ctx.lineTo(x, y);
    ctx.stroke();
    ctx.shadowBlur = 5;
    ctx.shadowColor = 'black';
  } else if (activePen == 1) {
    // pen 2
    pen2(x, y, .3);
  } else {
    // pen 3
  };


  // var dist = distanceBetween(last_x, x);
  // var angle = angleBetween(last_y, y);
  // for (var i = 0; i < dist; i++) {
  //   x = last_x + (Math.sin(angle) * i);
  //   y = last_y + (Math.cos(angle) * i);
  //   ctx.save();
  //   ctx.translate(x, y);
  //   ctx.scale(0.5, 0.5);
  // ctx.rotate(Math.PI * 20 / 180);
  // ctx.translate(x - 150, y - 125);
  // ctx.drawImage(img, x - 150, y - 125);
  // ctx.restore();
  // }
  // ctx.drawImage(img, x - 25, y - 25, 50, 50)
  // ctx.stroke();


  last_x = x;
  last_y = y;
}

function drawEnd(x, y) {

  // ctx.drawImage(img, x - 150, y - 125)

  //Pen1
  // ctx.lineWidth = 1;
  // ctx.lineJoin = ctx.lineCap = 'round';
  // ctx.lineTo(x, y);
  // ctx.stroke();
  // ctx.shadowBlur = 2;
  // ctx.shadowColor = 'black';

}

function pen2(x, y, a) {
  ctx.globalAlpha = a;
  ctx.save();
  ctx.translate(x, y);
  ctx.beginPath();
  ctx.rotate(Math.PI / 180 * getRandomInt(0, 360));
  for (var i = 20; i--;) {
    ctx.fillStyle = 'red';
    ctx.beginPath();
    ctx.moveTo(15, 15);
    ctx.lineTo(15, 0);
    ctx.lineTo(0, 1);
    ctx.closePath();
  }
  ctx.fill();
  // ctx.stroke();
  ctx.restore();
}
function clearPen() {
  ctx.shadowBlur = 0;
  ctx.lineWidth = 0;
  ctx.globalCanvas = 1;
}
function distanceBetween(point1, point2) {
  return Math.sqrt(Math.pow(point2.x - point1.x, 2) + Math.pow(point2.y - point1.y, 2));
}
function angleBetween(point1, point2) {
  return Math.atan2(point2.x - point1.x, point2.y - point1.y);
}
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function norm_random(size) {
  return (Math.random() - 0.5) * size;
}