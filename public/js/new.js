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
// window.onload = function () {
//   var today = new Date();
//   let dateString = `${today.getMonth() + 1}-${today.getDate()}-${today.getFullYear()}`;
//   console.log(dateString);
//   document.getElementById('date').value = today.toISOString().slice(0, 10);
// };

// on item type change, prefill the application name
document.querySelector('#type').addEventListener('change', function () {
  switch (document.querySelector('#type').value) {
    case 'MOSE':
      title.setAttribute('placeholder', 'Event Name');
      title.value = ('');
      descr.setAttribute('placeholder', 'Event Organizer');
      address.setAttribute('placeholder', 'Event Location');
      break;
    case 'LRB':
      title.setAttribute('placeholder', 'Applicant Name');
      title.value = ('');
      break;
    case 'ZRB':
      title.value = 'Z-22-';
      title.setAttribute('placeholder', 'Z-');
      break;
    case 'SUP':
      title.value = 'U-22-';
      title.setAttribute('placeholder', 'U-');
      break;
    case 'BZA':
      title.value = 'V-22-';
      title.setAttribute('placeholder', 'V-');
      break;
    case 'Text Amendment':
      title.value = 'Z-22-';
      title.setAttribute('placeholder', 'Z-');
      break;
    case 'CDP':
      title.value = 'CDP-22-';
      title.setAttribute('placeholder', 'CDP-');
      break;
    case 'SD':
      title.value = 'SD-22-';
      title.setAttribute('placeholder', 'SD-')
      break;
    case 'LOR':
      title.value = 'LOR-22-';
      title.setAttribute('placeholder', 'LOR-')
      // title.setAttribute('type', 'number');
      break;
    case 'N/A':
      title.value = '';
      title.removeAttribute('placeholder');
      break;
  }
});