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



// // if an adjacent NPU is selected, create another adjacent NPU dropdown
// document.getElementById('adjacent').addEventListener('change', addAdj);

// function addAdj() {
//   let adjNPU = document.getElementById('adjacent');
//   let adjNPUoptions = adjNPU.options;
//   let adjNPUselected = adjNPUoptions[adjNPU.selectedIndex].value;
//   let adjNPUselectedText = adjNPUoptions[adjNPU.selectedIndex].text;
//   let adjNPUselectedIndex = adjNPU.selectedIndex;
//   let newAdjNPU = document.createElement('select');
//   newAdjNPU.id = 'adjacent2';
//   newAdjNPU.name = 'adjacent2';
//   newAdjNPU.className = 'form-control';
//   let newAdjNPUoptions = adjNPUoptions;
//   for (let i = 0; i < adjNPUoptions.length; i++) {
//     if (adjNPUoptions[i].value === adjNPUselected) {
//       adjNPUoptions[i].remove();
//     }
//   }
//   let newAdjNPUoption = document.createElement('option');
//   newAdjNPUoption.value = adjNPUselected;
//   newAdjNPUoption.text = adjNPUselectedText;
//   newAdjNPUoptions[adjNPUselectedIndex].selected = true;
//   newAdjNPU.appendChild(newAdjNPUoption);
//   document.getElementById('adjacentNPU').appendChild(newAdjNPU);
//   document.getElementById('adjacent2').addEventListener('change', addAdj2);
// }
