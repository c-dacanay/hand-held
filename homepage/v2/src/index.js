let today = new Date();
let dd = String(today.getDate()).padStart(2, '0');
// let mm = String(today.getMonth() + 1).padStart(2, '0');
let mm = String(today.getMonth() + 1);
let hour = String(today.getHours()).padStart(1, '0');
let min = String(today.getMinutes());

let time = hour + ':' + min;
// today = mm + '/' + dd;

console.log(today);
console.log(time);

function init() {
  let timeBox = document.getElementById('time')
  let todayBox = document.getElementById('date')

  timeBox.innerHTML = `<p>` + time + `</p>`;
  todayBox.innerHTML = `<p>` + today + `<p>`;

}

window.addEventListener("load", init);