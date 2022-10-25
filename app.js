let NPU = document.getElementById('NPU');
let date = document.getElementById('date');

// on change, console log the value of NPU
NPU.addEventListener('change', NPUid);
// date.addEventListener('change', dateid);

function NPUid() {
  console.log(NPU.value);
  document.getElementById('NPUletter').innerText = NPU.value;
};

// on ready, set the datepicker to today's date
window.onload = function () {
  var today = new Date();
  document.getElementById('date').value = today.toISOString().slice(0, 10);
  document.getElementById('datePlc').innerText = today.toDateString();
};

// on change, replace the date in the letter
date.addEventListener('change', dateid);

function dateid() {
  document.getElementById('datePlc').innerText = date.value;
}