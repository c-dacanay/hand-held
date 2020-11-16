// import { } from "./draggable.js";
let f1URL = "./assets/flower1.png";
let f2URL = "./assets/flower2.png";
let f3URL = "./assets/flower3.png";
let f4URL = "./assets/flower4.png"

let f1Button = document.getElementById("flower1Add");
let f2Button = document.getElementById("flower2Add");
let f3Button = document.getElementById("flower3Add");
let f4Button = document.getElementById("flower4Add");


let appDiv = document.getElementById("app");
let ranNum = 100;

f1Button.addEventListener("click", function () {
  appDiv.innerHTML += `
  <image crossorigin="anonymous"
   class="draggable"
   src=${f1URL}
   style="left:${window.innerWidth / 2.5 + Math.random() * ranNum}px;
          top:${window.innerHeight / 3 + Math.random() * ranNum}px;" />
  `;
});

f2Button.addEventListener("click", function () {
  appDiv.innerHTML += `
  <image crossorigin="anonymous"
   class="draggable"
   src=${f2URL}
   style="left:${window.innerWidth / 2.5 + Math.random() * ranNum}px;
          top:${window.innerHeight / 3 + Math.random() * ranNum}px;" />
  `;
});

f3Button.addEventListener("click", function () {
  appDiv.innerHTML += `
  <image crossorigin="anonymous"
   class="draggable"
   src=${f3URL}
   style="left:${window.innerWidth / 2.5 + Math.random() * ranNum}px;
          top:${window.innerHeight / 3 + Math.random() * ranNum}px;" />
  `;
});

f4Button.addEventListener("click", function () {
  appDiv.innerHTML += `
  <image crossorigin="anonymous"
   class="draggable"
   src=${f4URL}
   style="left:${window.innerWidth / 2.5 + Math.random() * ranNum}px;
          top:${window.innerHeight / 3 + Math.random() * ranNum}px;" />
  `;
});

var deleteFlower = function () {
  this.remove();
};
document.addEventListener("click", function () {
  let draggableEl = document.getElementsByClassName("draggable");
  for (var i = 0; i < draggableEl.length; i++) {
    draggableEl[i].addEventListener('dblclick', deleteFlower, false);
    // console.log(draggableEl.length)
  }
});