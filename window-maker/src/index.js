const left = document.getElementById("left");
const right = document.getElementById("right");

const frameButton = document.getElementById("button1");
const skyButton = document.getElementById("button2");
const extraButton = document.getElementById("button3");
const extraButton2 = document.getElementById("button4")
const soundButton = document.getElementById("button5");

let frameIndex = 0;
let skyIndex = 0;
let extraIndex = 0;
let extraIndex2 = 0;
let activeButton = 0;

//Identifying the assets
let frameUrls = [
  "assets/frame1.png",
  "assets/frame2.png",
  "assets/frame3.png",
  "assets/frame4.png",
  "assets/frame5.png"
];

let skyUrls = [
  "assets/sky1.png",
  "assets/sky2.png",
  "assets/sky3.png",
  "assets/sky4.png",
  "assets/sky5.png"
];

let extraUrls = [
  "assets/empty.png",
  "assets/extra1.png",
  "assets/extra2.png",
  "assets/extra3.png",
  "assets/extra4.png",
  "assets/extra5.png",
  "assets/extra6.png"
];


//Bottom Buttons
frameButton.addEventListener("click", () => {
  activeButton = 0;
  buttonPresses();
})

skyButton.addEventListener("click", () => {
  activeButton = 1;
  buttonPresses();
})

extraButton.addEventListener("click", () => {
  activeButton = 2;
  buttonPresses();
})

extraButton2.addEventListener("click", () => {
  activeButton = 3;
  buttonPresses();
})

let audio = new Audio('assets/Sakamoto.mp3');

soundButton.addEventListener("click", () => {
  let onImg = "assets/icons/speakon.png"
  let offImg = "assets/icons/speak.png"
  if (soundButton.className != "off") {
    soundButton.src = offImg;
    soundButton.className = "off";
    audio.pause();
  } else {
    soundButton.src = onImg;
    soundButton.className = "on";
    audio.play();
    audio.loop = true;
  } return false;
});

function buttonPresses() {
  if (activeButton == 0) {
    buttonOn(frameButton);
  } else if (activeButton == 1) {
    buttonOn(skyButton);
  } else if (activeButton == 2) {
    buttonOn(extraButton);
  } else if (activeButton == 3) {
    buttonOn(extraButton2);
  }
}
function buttonOn(button) {
  let buttonOn = button;
  frameButton.className = "off"
  skyButton.className = "off"
  extraButton.className = "off"
  extraButton2.className = "off"

  buttonOn.className = "on"
}

//Connecting frames to buttons
left.addEventListener("click", () => {
  if (activeButton === 0) {
    frameIndex = (frameUrls.length + frameIndex - 1) % frameUrls.length;
  } else if (activeButton === 1) {
    skyIndex === (skyUrls.length + skyIndex - 1) % skyUrls.length;
  } else if (activeButton === 2) {
    extraIndex = (extraUrls.length + extraIndex - 1) % extraUrls.length;
  } else if (activeButton === 3) {
    extraIndex2 = (extraUrls.length + extraIndex2 - 1) % extraUrls.length;
  }
  render();
});

right.addEventListener("click", () => {
  console.log(activeButton)
  if (activeButton === 0) {
    frameIndex = (frameUrls.length + frameIndex + 1) % frameUrls.length;
  } else if (activeButton === 1) {
    skyIndex = (skyUrls.length + skyIndex + 1) % skyUrls.length;
  } else if (activeButton === 2) {
    extraIndex = (extraUrls.length + extraIndex + 1) % extraUrls.length;
  } else if (activeButton === 3) {
    extraIndex2 = (extraUrls.length + extraIndex2 + 1) % extraUrls.length;
  }
  render();
});

let frameImages = frameUrls.map((url) => {
  const image = new Image();
  image.src = url;
  return image;
});

let skyImages = skyUrls.map((url) => {
  const image = new Image();
  image.src = url;
  return image;
});

let extraImages = extraUrls.map((url) => {
  const image = new Image();
  image.src = url;
  return image;
});

//Drawing on the canvas
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

frameImages[0].addEventListener("load", render);
skyImages[0].addEventListener("load", render);
extraImages[0].addEventListener("load", render);

let imgWidth = 400;
let centerWidth = (canvas.width / 2) - (imgWidth / 2)

function render() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  let extra = extraImages[extraIndex];
  let sky = skyImages[skyIndex];
  let image = frameImages[frameIndex];
  let extra2 = extraImages[extraIndex2];

  if (extraIndex > 3 && extraIndex2 > 3) {
    ctx.drawImage(sky, centerWidth, 0, imgWidth, 541);
    ctx.drawImage(extra, centerWidth, 0, imgWidth, 541);
    ctx.drawImage(extra2, centerWidth, 0, imgWidth, 541);
    ctx.drawImage(image, centerWidth, 0, imgWidth, 541);
  } else if (extraIndex > 3) {
    ctx.drawImage(sky, centerWidth, 0, imgWidth, 541);
    ctx.drawImage(extra, centerWidth, 0, imgWidth, 541);
    ctx.drawImage(image, centerWidth, 0, imgWidth, 541);
    ctx.drawImage(extra2, centerWidth, 0, imgWidth, 541);
  } else if (extraIndex2 > 3) {
    ctx.drawImage(sky, centerWidth, 0, imgWidth, 541);
    ctx.drawImage(extra2, centerWidth, 0, imgWidth, 541);
    ctx.drawImage(image, centerWidth, 0, imgWidth, 541);
    ctx.drawImage(extra, centerWidth, 0, imgWidth, 541);
  } else {
    ctx.drawImage(sky, centerWidth, 0, imgWidth, 541);
    ctx.drawImage(image, centerWidth, 0, imgWidth, 541);
    ctx.drawImage(extra, centerWidth, 0, imgWidth, 541);
    ctx.drawImage(extra2, centerWidth, 0, imgWidth, 541);

  };

}
function saveImage() {
  render();
  let linkToClick = document.createElement('A'); //hacky solution to save file
  linkToClick.setAttribute('download', 'window.png');
  linkToClick.setAttribute(
    'href',
    canvas
      .toDataURL('image/png')
      .replace('image/png', 'image/octet-stream')
  );
  let event = new MouseEvent('click');
  linkToClick.dispatchEvent(event);
}