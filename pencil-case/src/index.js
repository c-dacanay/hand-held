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
  })
  pen2.addEventListener("click", () => {
    activePen = 1;
    clearPen();
  })
  pen3.addEventListener("click", () => {
    activePen = 2;
    clearPen();
  })
  clearButton.addEventListener("click", () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
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
  // drawEnd(last_x, last_y);
});

canvas.addEventListener("mouseout", () => {
  penDown = false;
});

canvas.addEventListener("mouseup", (evt) => {
  penDown = false;
  // drawEnd(evt.clientX, evt.clientY);
});

let speed = .2;
let change = .5;

function drawStart(x, y) {
  penDown = true;

  if (activePen == 0) {
    //pen 1
    ctx.beginPath();
    ctx.arc(x, y, 1, 0, 2 * Math.PI);
    ctx.shadowBlur = 10;
    ctx.shadowColor = 'black';
    ctx.closePath();
  } else if (activePen == 1) {
    // pen 2
    pen2(x, y, .5);
  } else {
    // pen 3
    change = 0;
    ctx.beginPath();
    ctx.lineWidth = 1;
    ctx.arc(x, y, 30, 0, 2 * Math.PI);
    ctx.fillStyle = 'black'
    ctx.fill();
    ctx.closePath();
  };

  last_x = x;
  last_y = y;
}

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
    speed = bounce(change, 0, 40, speed);
    change += speed
    ctx.beginPath();
    ctx.arc(x, y, 30 + change, 0, 2 * Math.PI);
    ctx.fillStyle = `hsl(` + (120 + change * 7) + `, 100%, 60%)`
    ctx.fill();
    ctx.strokeStyle = 'black'
    ctx.stroke();
    ctx.closePath();
  };

  last_x = x;
  last_y = y;
}


function bounce(pos, low, high, speed) {
  if (pos < low || pos > high) {
    return speed *= -1;
  } else {
    return speed;
  }
}

function drawEnd(x, y) {

}

function pen2(x, y, a) {
  ctx.globalAlpha = a;
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(Math.PI / 180 * getRandomInt(0, 360));
  for (var i = 20; i--;) {
    ctx.fillStyle = 'black';
    ctx.beginPath();
    ctx.moveTo(15, 15);
    ctx.lineTo(15, 0);
    ctx.lineTo(0, 1);
    ctx.closePath();
  }
  ctx.fill();
  ctx.restore();
}

function clearPen() {
  ctx.shadowBlur = 0;
  ctx.lineWidth = 0;
  ctx.globalAlpha = 1;
  ctx.shadowColor = 'black'
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}