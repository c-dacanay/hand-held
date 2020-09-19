//CSS slider help: https://codepen.io/lucas-miranda-the-encoder/pen/OJLBWYd
//Gradients: http://127.0.0.1:5500/css-toy/index.html


//Questions: when I set a background-image gradient, opacity of the 1st div could make it impossible to see divs below.
//How can you pause a CSS animation without losing a position?

function init() {
  let l1Img = document.getElementById("layer1");
  let l1Input = document.getElementById("l1-input");

  let l2Img = document.getElementById("layer2");
  let l2Input = document.getElementById("l2-input");

  let l3Img = document.getElementById("layer3");
  let l3Input = document.getElementById("l3-input");


  //set opacity
  l1Img.style.opacity = l1Input.value;
  l2Img.style.opacity = l2Input.value;
  l3Img.style.opacity = l3Input.value;

  function update() {
    l1Img.style.opacity = l1Input.value;
    l2Img.style.opacity = l2Input.value;
    l3Img.style.opacity = l3Input.value;
  }

  function click() {
    console.log("hi")
    l1Img.classList.toggle('paused');
    l2Img.classList.toggle('paused');
    l3Img.classList.toggle('paused');
    console.log(l3Img);
  }
  document.body.addEventListener("mousedown", click);
  l1Input.addEventListener("input", update);
  l2Input.addEventListener("input", update);
  l3Input.addEventListener("input", update);

}

window.addEventListener("load", init);