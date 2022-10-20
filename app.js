let NPU = document.getElementById('NPU')
let date = document.getElementById('date')

let mtgDate = new Date(date.value).toDateString();
console.log(mtgDate);

// on change, console log the value of NPU
NPU.addEventListener('change', NPUid);
date.addEventListener('change', dateid);

function NPUid() {
  console.log(NPU.value);
  document.getElementById('NPUletter').innerText = NPU.value;
};

function dateid() {
  console.log(mtgDate);
  document.getElementById('datePlc').innerText = mtgDate;
}