//CSS slider help: https://codepen.io/lucas-miranda-the-encoder/pen/OJLBWYd

function init() {
  let innerImg = document.getElementById("inner-img");
  let inputBook = document.getElementById("img-input");

  function update() {
    innerImg.style.opacity = inputBook.value;
    // console.log("input changed");
  }

  inputBook.addEventListener("input", update);

}

window.addEventListener("load", init);