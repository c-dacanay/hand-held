// import "./styles.css";

const left = document.getElementById("left");
const right = document.getElementById("right");

const left1 = document.getElementById("left2");
const right1 = document.getElementById("right2");

const frameButton = document.getElementById("button1");
const skyButton = document.getElementById("button2");
const extraButton = document.getElementById("button3");
const soundButton = document.getElementById("button4");

let frameIndex = 0;
let skyIndex = 0;
let extraIndex = 0;

//Identifying the assets
let frameUrls = [
  "assets/frame1.png",
  "assets/frame2.png",
  "assets/frame3.png"
];

let skyUrls = [
  "assets/sky1.png",
  "assets/sky2.png",
  "assets/sky3.png"
];

let extraUrls = [
  "assets/extra1.png",
  "assets/extra2.png",
  "assets/extra3.png"
];


//Bottom Buttons
frameButton.addEventListener("click", () => {
  let onImg = "assets/icons/winon.png"
  let offImg = "assets/icons/win.png"
  toggle(frameButton, onImg, offImg);
})

skyButton.addEventListener("click", () => {
  let onImg = "assets/icons/cloudon.png"
  let offImg = "assets/icons/cloud.png"
  toggle(skyButton, onImg, offImg);
})

extraButton.addEventListener("click", () => {
  let onImg = "assets/icons/exton.png"
  let offImg = "assets/icons/ext.png"
  toggle(extraButton, onImg, offImg);
})

soundButton.addEventListener("click", () => {
  let onImg = "assets/icons/speakon.png"
  let offImg = "assets/icons/speak.png"
  toggle(soundButton, onImg, offImg);
})

//There is def a better way of doing this but I can't be bothered rn
function toggle(el, onImg, offImg) {
  if (el.className != "off") {
    el.src = offImg;
    el.className = "off";
  }
  else if (el.className == "off") {
    //Set all buttons off
    frameButton.className = "off";
    frameButton.src = "assets/icons/win.png"

    skyButton.className = "off";
    skyButton.src = "assets/icons/cloud.png"

    extraButton.className = "off";
    extraButton.src = "assets/icons/ext.png"

    //then turn this on
    el.src = onImg;
    el.className = "on";
  }

  return false;
}

//Connecting frames to buttons
let frameImages = frameUrls.map((url) => {
  const image = new Image();
  image.src = url;
  return image;
});

left.addEventListener("click", () => {
  frameIndex = (frameUrls.length + frameIndex - 1) % frameUrls.length;
  render();
});
right.addEventListener("click", () => {
  frameIndex = (frameUrls.length + frameIndex + 1) % frameUrls.length;
  render();
});

let skys = skyUrls.map((url) => {
  const image = new Image();
  image.src = url;
  return image;
});

left1.addEventListener("click", () => {
  skyIndex = (skyUrls.length + skyIndex - 1) % skyUrls.length;
  render();
});
right1.addEventListener("click", () => {
  skyIndex = (skyUrls.length + skyIndex + 1) % skyUrls.length;
  render();
});

let extras = extraUrls.map((url) => {
  const image = new Image();
  image.src = url;
  return image;
});

left1.addEventListener("click", () => {
  extraIndex = (extraUrls.length + extraIndex - 1) % extraUrls.length;
  render();
});
right1.addEventListener("click", () => {
  extraIndex = (extraUrls.length + extraIndex + 1) % extraUrls.length;
  render();
});


//Drawing on the canvas
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

frameImages[0].addEventListener("load", render);

let imgWidth = 400;
let centerWidth = (canvas.width / 2) - (imgWidth / 2)
function render() {
  let sky = skys[skyIndex];
  ctx.drawImage(sky, centerWidth, 0, imgWidth, 541);

  let image = frameImages[frameIndex];
  ctx.drawImage(image, centerWidth, 0, imgWidth, 541);

  let extra = extras[extraIndex];
  ctx.drawImage(extra, centerWidth, 0, imgWidth, 541);
}

