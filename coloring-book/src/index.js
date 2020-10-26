import { pointsAlongLine } from "./vector.js";

let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

////Trying to draw a grave on another canvas////
// let grave = document.getElementById("grave");
// let gravectx = canvas.getContext("2d");
// let graveImg = new Image();
// graveImge.src = "./assets/grave.png"
// let imgWidth = 400;
// let centerWidth = (canvas.width / 2) - (imgWidth / 2);
// let graveHeight = (canvas.height) * .25;
// function render() {
//   // console.log(window.mobileCheck)
//   console.log(check)
//   if (check) {
//     ctx.drawImage(graveImg, centerWidth, 10, imgWidth, 500)
//     console.log('here')
//   } else {
//     ctx.drawImage(graveImg, centerWidth, graveHeight, imgWidth, 500)
//     console.log('yo')
//   }
// }

let penDown = false;
let last_x = 0;
let last_y = 0;
let activePen = 0;

window.addEventListener("load", init);

let undoStack = [];
function pushState() {
  undoStack.push(ctx.getImageData(0, 0, canvas.width, canvas.height));
  console.log(undoStack.length)

  if (undoStack.length > 30) {
    undoStack.shift();
  }
}

function init() {
  let pen0 = document.getElementById("moon");
  let pen1 = document.getElementById("bat");
  let pen2 = document.getElementById("blood");
  let undo = document.getElementById("undo");
  // let save = document.getElementById("save");

  pen0.addEventListener("click", () => {
    activePen = 0;
    clearPen();
  })

  pen1.addEventListener("click", () => {
    activePen = 1;
    clearPen();
  })

  pen2.addEventListener("click", () => {
    activePen = 2;
    clearPen();
  })

  // save.addEventListener("click", () => {

  // })

  undo.addEventListener("click", () => {
    if (undoStack.length > 1) {
      undoStack.pop();
    }

    let lastElement = undoStack[undoStack.length - 1];
    ctx.putImageData(lastElement, 0, 0);
  });
  pushState();
}
//Canvas Touches
canvas.addEventListener("touchstart", (evt) => {
  let touches = Array.from(evt.touches);
  let touch = touches[0];
  drawStart(touch.clientX, touch.clientY);
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

canvas.addEventListener("mouseout", () => {
  // pushState();
  penDown = false;
});

canvas.addEventListener("mouseup", (evt) => {
  pushState();
  penDown = false;
});

canvas.addEventListener("touchend", (evt) => {
  pushState();
  penDown = false;
});

function drawStart(x, y) {
  penDown = true;
  if (activePen == 0) {

  } else if (activePen == 1) {
    ctx.beginPath();
    ctx.arc(x, y, 5, 0, 2 * Math.PI);
    ctx.fillStyle = 'black'
    ctx.fill();
    ctx.closePath();
  } else {
    ctx.beginPath();
    ctx.arc(x, y, 2, 0, 2 * Math.PI);
    // ctx.shadowBlur = 10;
    ctx.fillStyle = 'red'
    ctx.fill();
    ctx.closePath();
  };

  last_x = x;
  last_y = y;
}

function drawMove(x, y) {
  if (activePen == 0) {
    ctx.fillStyle = `rgb(255, 255, 255, .4)`
    let interpolatedPoints = pointsAlongLine(x, y, last_x, last_y, 0.1);
    interpolatedPoints.forEach(function (p) {
      ctx.fillRect(p.x + norm_random(30), p.y + norm_random(30), 1, 1);
    });
  } else if (activePen == 1) {

    ctx.beginPath();
    ctx.arc(x, y, 5, 0, 2 * Math.PI);
    ctx.fillStyle = 'black'
    ctx.fill();
    ctx.closePath();

  } else if (activePen == 2) {
    ctx.lineWidth = 1;
    ctx.lineJoin = ctx.lineCap = 'round';
    ctx.strokeStyle = 'red'
    ctx.moveTo(last_x, last_y);
    ctx.lineTo(x, y);
    ctx.stroke();
    ctx.shadowBlur = 5;
    ctx.shadowColor = 'red';
  }

  last_x = x;
  last_y = y;
}

function clearPen() {
  ctx.shadowBlur = 0;
  ctx.lineWidth = 0;
  ctx.globalAlpha = 1;
  ctx.shadowColor = 'white'
}

function norm_random(size) {
  return (Math.random() - 0.5) * size;
}

//Mobile
let check = false;
window.mobileCheck = function () {
  (function (a) { if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4))) check = true; })(navigator.userAgent || navigator.vendor || window.opera);
  return check;
};