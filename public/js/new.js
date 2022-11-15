let NPU = document.getElementById('NPU');
let date = document.getElementById('date');

// on change, console log the value of NPU
NPU.addEventListener('change', NPUid);
// date.addEventListener('change', dateid);

function NPUid() {
  console.log(NPU.value);
  document.getElementsByClassName('NPUletter').innerText = NPU.value;
};

// on ready, set the datepicker to today's date
window.onload = function () {
  var today = new Date();
  let dateString = `${today.getMonth() + 1}-${today.getDate()}-${today.getFullYear()}`;
  console.log(dateString);
  document.getElementById('date').value = today.toISOString().slice(0, 10);

  // on change, replace the date in the letter
  date.addEventListener('change', dateid);

  function dateid() {
    console.log(date.value);
    document.getElementById('datePlc').
      innerText = dateString;
  };
};