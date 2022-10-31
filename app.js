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

// on submit, add form data to the table of the same type
document.getElementById('submit').addEventListener('submit', function (e) {
  e.preventDefault();
  let type = document.getElementById('type').value;
  let descr = document.getElementById('descr').value;
  let adjNPU = document.getElementById('adjacent').value;

  let table = document.getElementById(type);
  let row = table.insertRow(1);
  let cell1 = row.insertCell(0);
  let cell2 = row.insertCell(1);
  let cell3 = row.insertCell(2);
  cell1.innerHTML = descr;
  cell2.innerHTML = adjNPU;
  cell3.innerHTML = `<button type="button" class="btn btn-danger">Delete</button>`;
});


