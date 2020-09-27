
let monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"
];

let dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

let today = new Date();
console.log(today.getDay());
let dd = String(dayNames[today.getDay()]);
let date = String(today.getDate());
let mm = String(monthNames[today.getMonth()]);
let hour = String(today.getHours()).padStart(1, '0');
let min = String(today.getMinutes());

let time = hour + ':' + min;
today = dd + ', ' + mm + ' ' + date;

console.log(today);
console.log(time);

function init() {
  let timeBox = document.getElementById('time')
  let todayBox = document.getElementById('date')

  timeBox.innerHTML = `<p>` + time + `</p>`;
  todayBox.innerHTML = `<p>` + today + `<p>`;

}

window.addEventListener("load", init);