let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let penDown = false;
let last_x = 0;
let last_y = 0;

canvas.addEventListener("touchstart", (evt) => {
  let touches = Array.from(evt.touches);
  console.log(touches);
  let touch = touches[0]
  drawStart(touch.clientX, touch.clientY)
});

canvas.addEventListener("mousedown", (evt) => {
  let x = evt.clientX;
  let y = evt.clientY;
  drawStart(x, y);
});

canvas.addEventListener("touchmove", (evt) => {
  evt.preventDefault();

  let touches = Array.from(evt.touches);
  let touch = touches[0];

  let x = touch.clientX;
  let y = touch.clientY;
  drawMove(x, y);
});

canvas.addEventListener("mousemove", (evt) => {
  if (penDown === false) {
    return;
  }
  let x = evt.clientX;
  let y = evt.clientY;
  drawMove(x, y);
});

canvas.addEventListener("touchend", (evt) => {
  let x = last_x;
  let y = last_y;
  drawEnd(x, y);
});

canvas.addEventListener("mouseout", () => {
  penDown = false;
});

canvas.addEventListener("mouseup", (evt) => {
  penDown = false;
  let x = evt.clientX;
  let y = evt.clientY;
  drawEnd(x, y);
});

function drawStart(x, y) {
  penDown = true;

  ctx.beginPath();
  ctx.arc(x, y, 1, 0, 2 * Math.PI);
  // ctx.stroke();
  ctx.shadowBlur = 5;
  ctx.shadowColor = 'black';

  last_x = x;
  last_y = y;
}

let change = .1;

function drawMove(x, y) {
  if (change > 6) {
    change = 0;
  } else {
    change++
  }
  // ctx.globalAlpha = .5;
  ctx.lineWidth = 2;
  ctx.lineJoin = ctx.lineCap = 'round';
  ctx.moveTo(last_x, last_y);
  ctx.lineTo(x, y);
  ctx.stroke();
  ctx.shadowBlur = 10;
  ctx.shadowColor = 'black';

  last_x = x;
  last_y = y;
}

function drawEnd(x, y) {
  ctx.lineWidth = 1;
  ctx.lineJoin = ctx.lineCap = 'round';
  ctx.lineTo(x, y);
  ctx.stroke();
  ctx.shadowBlur = 2;
  ctx.shadowColor = 'black';

}