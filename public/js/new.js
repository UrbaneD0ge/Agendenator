let NPU = document.getElementById('NPU');
let date = document.getElementById('date');

// on change, console log the value of NPU
NPU.addEventListener('change', NPUid);
// date.addEventListener('change', dateid);

function NPUid() {
  console.log(NPU.value);
  document.getElementsByClassName('NPUletter').innerText = NPU.value;
};

// on item type change, prefill the application name
document.querySelector('#type').addEventListener('change', function () {
  switch (document.querySelector('#type').value) {
    case 'MOSE':
      title.setAttribute('placeholder', 'Event Name');
      title.value = ('');
      dateLabel.innerText = 'Event Date';
      descrLabel.innerText = 'Event Organizer';
      descr.setAttribute('placeholder', 'Event Organizer');
      addressLabel.innerText = 'Event Location';
      address.setAttribute('placeholder', 'Event Location');
      break;
    case 'LRB':
      titleLabel.innerText = 'Business Name';
      title.setAttribute('placeholder', 'Business Name');
      title.value = ('');
      address.setAttribute('placeholder', 'Property Address');
      descrLabel.innerText = 'Request';
      descr.setAttribute('placeholder', 'Request');

      // create applicant label
      const applicantLabel = document.createElement('label');
      applicantLabel.setAttribute('for', 'applicant');
      applicantLabel.setAttribute('class', 'col form-label');
      applicantLabel.innerText = 'Applicant';

      // create applicant input
      const applicantInput = document.createElement('input');
      applicantInput.setAttribute('id', 'applicant');
      applicantInput.setAttribute('name', 'applicant');
      applicantInput.setAttribute('placeholder', 'Applicant');
      applicantInput.setAttribute('class', 'col form-control');
      applicantInput.setAttribute('type', 'text');
      applicantInput.setAttribute('required', 'required');

      // get placeholder div and append label and input
      const applicantPlaceholderDiv = document.getElementById('applicantDivPlaceholder');
      if (!applicantPlaceholderDiv.hasChildNodes()) {
        applicantPlaceholderDiv.appendChild(applicantLabel);
        applicantPlaceholderDiv.appendChild(applicantInput);
      }

      // insert select element for LRB type
      const LRBtype = document.createElement('select');
      LRBtype.setAttribute('id', 'bizType');
      LRBtype.setAttribute('name', 'bizType');
      LRBtype.setAttribute('placeholder', 'Business Type');
      LRBtype.setAttribute('class', 'col form-select');
      // create options
      const bizTypeOption1 = document.createElement('option');
      bizTypeOption1.setAttribute('value', 'Restaurant');
      bizTypeOption1.innerText = 'Restaurant';
      const bizTypeOption2 = document.createElement('option');
      bizTypeOption2.setAttribute('value', 'Bar');
      bizTypeOption2.innerText = 'Bar';
      const bizTypeOption3 = document.createElement('option');
      bizTypeOption3.setAttribute('value', 'Retail Package');
      bizTypeOption3.innerText = 'Retail Package';
      const bizTypeOption4 = document.createElement('option');
      bizTypeOption4.setAttribute('value', 'Hotel');
      bizTypeOption4.innerText = 'Hotel';
      const bizTypeOption5 = document.createElement('option');
      bizTypeOption5.setAttribute('value', 'Manufacturer');
      bizTypeOption5.innerText = 'Manufacturer';
      const bizTypeOption6 = document.createElement('option');
      bizTypeOption6.setAttribute('value', 'Wholesale');
      bizTypeOption6.innerText = 'Wholesale';
      const bizTypeOption7 = document.createElement('option');
      bizTypeOption7.setAttribute('value', 'Night Club');
      bizTypeOption7.innerText = 'Night Club';
      const bizTypeOption8 = document.createElement('option');
      bizTypeOption8.setAttribute('value', 'Other');
      bizTypeOption8.innerText = 'Other';

      if (document.getElementById('bizType') == null) {

        // append options to select element
        LRBtype.appendChild(bizTypeOption1);
        LRBtype.appendChild(bizTypeOption2);
        LRBtype.appendChild(bizTypeOption3);
        LRBtype.appendChild(bizTypeOption4);
        LRBtype.appendChild(bizTypeOption5);
        LRBtype.appendChild(bizTypeOption6);
        LRBtype.appendChild(bizTypeOption7);
        LRBtype.appendChild(bizTypeOption8);

        const bizTypePlaceholderLabel = document.createElement('label');
        bizTypePlaceholderLabel.setAttribute('for', 'bizType');
        bizTypePlaceholderLabel.setAttribute('class', 'col form-label');
        bizTypePlaceholderLabel.innerText = 'Business Type';

        // insert select element
        const bizTypePlaceholder = document.getElementById('bizTypePlaceholder');
        bizTypePlaceholder.appendChild(bizTypePlaceholderLabel);
        bizTypePlaceholder.appendChild(LRBtype);

        // insert select element for LRB request
        const LRBrequest = document.createElement('select');
        LRBrequest.setAttribute('id', 'descr');
        LRBrequest.setAttribute('name', 'descr');
        LRBrequest.setAttribute('placeholder', 'Request');
        LRBrequest.setAttribute('class', 'col form-select');
        // create options
        const LRBoption1 = document.createElement('option');
        LRBoption1.setAttribute('value', 'New Business');
        LRBoption1.innerText = 'New Business';
        const LRBoption2 = document.createElement('option');
        LRBoption2.setAttribute('value', 'Change of Ownership');
        LRBoption2.innerText = 'Change of Ownership';
        const LRBoption3 = document.createElement('option');
        LRBoption3.setAttribute('value', 'Change of Agent');
        LRBoption3.innerText = 'Change of Agent';
        const LRBoption4 = document.createElement('option');
        LRBoption4.setAttribute('value', 'Change of Licensee');
        LRBoption4.innerText = 'Change of Licensee';
        const LRBoption5 = document.createElement('option');
        LRBoption5.setAttribute('value', 'Other');
        LRBoption5.innerText = 'Other';
        // if other, change descr to input type text
        LRBoption5.addEventListener('change', function () {
          if (LRBoption5.selected) {
            descr.setAttribute('type', 'text');
            descr.setAttribute('placeholder', 'Request');
          }
        });
        // append options to select
        LRBrequest.appendChild(LRBoption1);
        LRBrequest.appendChild(LRBoption2);
        LRBrequest.appendChild(LRBoption3);
        LRBrequest.appendChild(LRBoption4);
        LRBrequest.appendChild(LRBoption5);
        // replace descr with select
        descr.replaceWith(LRBrequest);
        descr.setAttribute('class', 'col form-select');
      }
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
    default:
      title.value = '';
      title.removeAttribute('placeholder');
      break;
  }
});