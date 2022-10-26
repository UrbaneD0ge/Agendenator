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
  document.getElementById('datePlc').innerText = dateString;

  // on change, replace the date in the letter
  date.addEventListener('change', dateid);

  function dateid() {
    console.log(date.value);
    document.getElementById('datePlc').
      innerText = dateString;
  };

  document.getElementById('NPU').addEventListener('change', removeAdj);

  // remove the option for the selected NPU from the adjacent NPU dropdown
  function removeAdj() {
    let adjNPU = document.getElementById('adjacent');
    let adjNPUoptions = adjNPU.options;
    for (let i = 0; i < adjNPUoptions.length; i++) {
      if (adjNPUoptions[i].value === NPU.value) {
        adjNPUoptions[i].remove();
      }
    }
  };
};

// on submit, add form data to the letter
document.getElementById('form').addEventListener('submit', function (e) {
  e.preventDefault();
  let type = document.getElementById('type').value;
  let descr = document.getElementById('descr').value;
  let adjNPU = document.getElementById('adjacent').value;

  // create a new div for the item type
  let newType = document.createElement('div');
  newType.setAttribute('class', 'type');
  newType.innerText = type;
  document.getElementById('letter').appendChild(newType);
});