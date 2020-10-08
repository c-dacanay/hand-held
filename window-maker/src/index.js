//some code credits:
//save as image function: https://algorat.club/ratmaker/index.html
//location.hash work: https://github.com/MaxBittker/fridgepoet/
//url to clipboard: https://stackoverflow.com/questions/49618618/copy-current-url-to-clipboard

const left = document.getElementById("left");
const right = document.getElementById("right");

const frameButton = document.getElementById("button1");
const skyButton = document.getElementById("button2");
const extraButton = document.getElementById("button3");
const extraButton2 = document.getElementById("button4")
const soundButton = document.getElementById("button5");

const bottomBar = document.getElementById("bottom");
const buttomButtons = document.getElementById("buttons")
const msgInput = document.getElementById("msg-in")
const msgOutput = document.getElementById("msg-out")
const message = document.getElementById("message")
const makeButton = document.getElementById("make");
let myMessage = null;
// const

let frameIndex = 0;
let skyIndex = 0;
let extraIndex = 0;
let extraIndex2 = 0;
let audioIndex = 0;
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

let audioUrls = [
  "assets/audio/breadcrumb.mp3",
  "assets/audio/ep1h.mp3",
  "assets/audio/peppermint-bark.mp3",
  "assets/audio/terrace.mp3",
]

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


//Audio stuff
const audioLeft = document.getElementById("audioleft")
const audioRight = document.getElementById("audioright")
let audio = new Audio(audioUrls[audioIndex]);

soundButton.addEventListener("click", () => {
  if (soundButton.className != "off") {
    soundButton.src = "assets/icons/speak.png";
    soundButton.className = "off";
    audio.pause();
  } else {
    soundButton.src = "assets/icons/speakon.png";
    soundButton.className = "on";
    audio.play();
    audio.loop = true;
  } return false;
});

audioLeft.addEventListener("click", () => {
  audioIndex = (audioUrls.length + audioIndex - 1) % audioUrls.length;
  console.log(audio.src);
  if (soundButton.className == "on") {
    audio.pause();
    audio.src = audioUrls[audioIndex];
    audio.play();
  } else {
    return
  }
});

audioRight.addEventListener("click", () => {
  audioIndex = (audioUrls.length + audioIndex + 1) % audioUrls.length;
  if (soundButton.className == "on") {
    audio.pause();
    audio.src = audioUrls[audioIndex];
    audio.play();
  } else {
    return
  }
});

//Menu buttons
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
window.addEventListener("load", init);

let imgWidth = 400;
let centerWidth = (canvas.width / 2) - (imgWidth / 2)

function init() {
  readHash();
  render();
}

//interesting render problems with calling readHash in render. As always, the answer is to have init :P 
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


//Share functions
function shareWindow() {
  const audioBar = document.getElementById("audio");
  bottomBar.style.display = "none";
  audioBar.style.display = "none";
  buttomButtons.style.display = "none";
  left.style.visibility = "hidden";
  right.style.visibility = "hidden";
  msgInput.style.display = "flex";
}

function createHash() {
  const msg = message.value;
  const newWindow = [skyIndex, frameIndex, extraIndex, extraIndex2, audioIndex, msg]
  location.hash = '#' + b64EncodeUnicode(JSON.stringify(newWindow))

  //copy URL to clipboard
  let dummy = document.createElement('input'),
    text = window.location.href;
  document.body.appendChild(dummy);
  dummy.value = text;
  dummy.select();
  document.execCommand('copy');
  document.body.removeChild(dummy);

  let shareMsg = document.getElementById("share-msg")
  shareMsg.innerHTML = 'Copied link and message to clipboard!'
}

const readHash = () => {
  if (location.hash) {
    let x = JSON.parse(b64DecodeUnicode(location.hash.substring(1)));
    skyIndex = x[0]
    frameIndex = x[1]
    extraIndex = x[2]
    extraIndex2 = x[3]
    audioIndex = x[4]
    myMessage = x[5]

    bottomBar.style.display = "none";
    buttomButtons.style.display = "none";
    left.style.visibility = "hidden";
    right.style.visibility = "hidden";
    audioleft.style.visibility = "hidden";
    audioright.style.visibility = "hidden";
    makeButton.style.display = "flex";
    soundButton.style.display = "flex";
    msgOutput.style.display = "flex";

    msgOutput.innerHTML = myMessage;
    audio = new Audio(audioUrls[audioIndex]);
    console.log(myMessage);
  } else {
    return [];
  }
};

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

//lmao copy/paste job whats this
function b64EncodeUnicode(str) {
  return btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, function (match, p1) {
    return String.fromCharCode('0x' + p1);
  }));
}
function b64DecodeUnicode(str) {
  return decodeURIComponent(Array.prototype.map.call(atob(str), function (c) {
    return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
  }).join(''));
}