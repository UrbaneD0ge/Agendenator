const submit = document.getElementById('submit');
const table = document.getElementById('table');
let modal = document.getElementById('dialog');
let message = document.getElementById('message');

// function to store the values of the form in local storage
function storeForm() {
  // header inputs
  let NPU = document.getElementById('NPU').selectedOptions[0].value || '';
  let chair = document.querySelector('#chair').value.trim() || '';
  let loc = document.querySelector('#location').value.trim() || '';
  let planner = document.querySelector('#planner').value.trim() || '';
  // save inputs to object
  let data = {
    NPU: NPU,
    chair: chair,
    loc: loc,
    planner: planner,
  };
  // save data to local storage
  localStorage.setItem('data', JSON.stringify(data));
  console.log(data);
}

// on load, check if there is data in local storage and if so, pre-fill the form
window.onload = function () {
  if (localStorage.getItem('data')) {
    let data = JSON.parse(localStorage.getItem('data'));
    document.querySelector('#NPU').value = data.NPU;
    document.querySelector('#chair').value = data.chair;
    document.querySelector('#location').value = data.loc;
    document.querySelector('#planner').value = data.planner;
  };
};

// on itemType change, preFill the applName
document.querySelector('#itmType').addEventListener('change', preFill);

const autoFill = document.querySelector('#autofill');

function preFill() {
  switch (document.querySelector('#itmType').value) {
    case 'MOSE':
      applName.setAttribute('placeholder', 'Applicant Name');
      applName.value = ('');
      applName.setAttribute('type', 'text');
      applName.oninput = (e) => {
        e.target.value = patternMatch({
          input: e.target.value,
          template: "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
        });
      };
      break;
    case 'LRB':
      applName.setAttribute('placeholder', 'Applicant Name');
      applName.value = ('');
      applName.setAttribute('type', 'text');
      applName.oninput = (e) => {
        e.target.value = patternMatch({
          input: e.target.value,
          template: "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
        });
      };
      break;
    case 'ZRB':
      applName.setAttribute('placeholder', 'Z-');
      if (autoFill.checked) {
        applName.value = ('Z-2');
        applName.setAttribute('type', 'tel');
        applName.oninput = (e) => {
          e.target.value = patternMatch({
            input: e.target.value,
            template: "Z-xx-xxx",
          });
        };
      };
      break;
    case 'SUP':
      applName.setAttribute('placeholder', 'U-');
      if (autoFill.checked) {
        applName.value = 'U-2';
        applName.setAttribute('type', 'tel');
        applName.oninput = (e) => {
          e.target.value = patternMatch({
            input: e.target.value,
            template: "U-xx-xxx",
          });
        };
      };
      break;
    case 'BZA':
      applName.setAttribute('placeholder', 'V-');
      if (autoFill.checked) {
        applName.value = 'V-2';
        applName.setAttribute('type', 'tel');
        applName.oninput = (e) => {
          e.target.value = patternMatch({
            input: e.target.value,
            template: "V-xx-xxx",
          });
        };
      };
      break;
    case 'Text Amendment':
      applName.setAttribute('placeholder', 'Z-');
      if (autoFill.checked) {
        applName.value = 'Z-2';
        applName.setAttribute('type', 'tel');
        applName.oninput = (e) => {
          e.target.value = patternMatch({
            input: e.target.value,
            template: "Z-xx-xxx",
          });
        };
      };
      break;
    case 'CDP':
      applName.setAttribute('placeholder', 'CDP-');
      if (autoFill.checked) {
        applName.value = 'CDP-2';
        applName.setAttribute('type', 'tel');
        applName.oninput = (e) => {
          e.target.value = patternMatch({
            input: e.target.value,
            template: "CDP-xx-xxx",
          });
        };
      };
      break;
    case 'SD':
      applName.setAttribute('placeholder', 'SD-')
      if (autoFill.checked) {
        applName.value = 'SD-2';
        applName.setAttribute('type', 'tel');
        applName.oninput = (e) => {
          e.target.value = patternMatch({
            input: e.target.value,
            template: "SD-xx-xxx",
          });
        };
      };
      disposal.value = 'R&C'
      break;
    case 'LOR':
      applName.setAttribute('placeholder', 'LOR-')
      if (autoFill.checked) {
        applName.value = 'LOR-2';
        applName.setAttribute('type', 'tel');
        applName.oninput = (e) => {
          e.target.value = patternMatch({
            input: e.target.value,
            template: "LOR-xx-xxx",
          });
        };
      };
      disposal.value = 'R&C'
      break;
    case 'N/A':
      applName.removeAttribute('placeholder');
      applName.value = '';
      applName.setAttribute('type', 'text');
      applName.oninput = (e) => {
        e.target.value = patternMatch({
          input: e.target.value,
          template: "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
        });
      };
      break;
    default:
      applName.removeAttribute('placeholder');
      applName.value = '';
      applName.setAttribute('type', 'text');
      applName.oninput = (e) => {
        e.target.value = patternMatch({
          input: e.target.value,
          template: "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
        });
      };
      break;
  }
};

// on submit, add form data to table
submit.addEventListener('click', (e) => {
  e.preventDefault();

  // Add Item form
  let itmType = document.querySelector('#itmType').selectedOptions[0].value;
  let applName = document.querySelector('#applName').value.trim();
  let disposal = document.querySelector('#disposal').value || '';
  let comments = document.querySelector('#conditions').value.trim() || '';

  if (itmType === 'Type' || applName === '') {
    message.innerText = 'Please enter an item type and applicant name';
    modal.showModal();
    return;
  }

  // create table row
  let row = document.createElement('tr');
  // create table cells
  let itmTypeCell = document.createElement('td');
  let deleteButton = document.createElement('button');
  let applNameCell = document.createElement('td');
  let disposalCell = document.createElement('td');
  let commentsCell = document.createElement('td');
  // add text to cells
  itmTypeCell.innerText = itmType;
  itmTypeCell.prepend(deleteButton);
  deleteButton.setAttribute('type', 'button');
  deleteButton.setAttribute('class', 'btn-close my-1');
  applNameCell.textContent = applName;
  applNameCell.setAttribute('contenteditable', 'true');
  applNameCell.classList.add('applName');
  disposalCell.textContent = disposal;
  disposalCell.classList.add('disp');
  commentsCell.textContent = comments;
  commentsCell.classList.add('comments');

  // wrap each new item in a <tbody> that is draggable
  let tbody = document.createElement('tbody');
  tbody.setAttribute('draggable', 'true');
  tbody.setAttribute('class', 'draggable');
  tbody.append(row);

  // append new tbody to table
  table.append(tbody);

  // append cells to row
  row.appendChild(itmTypeCell);
  row.appendChild(applNameCell);
  row.appendChild(disposalCell);

  if (comments !== '') {
    // create new row for comments
    let commentsRow = document.createElement('tr');
    // create new cell for comments
    // let commentsCell = document.createElement('td')
    commentsCell.setAttribute('colspan', '3');
    commentsCell.setAttribute('contenteditable', 'true');
    commentsCell.classList.add('comments');
    // add text to cell
    commentsCell.textContent = comments;
    // append cell to row
    commentsRow.appendChild(commentsCell);
    // append row to tbody
    tbody.appendChild(commentsRow);
  }

  // console.log('new row added');
  // clear inputs
  document.querySelector('#addItem').reset();
  document.getElementById('applName').setAttribute('placeholder', 'Application number or name');
  removeDemo();
}
);

// on button click, remove that tbody
document.querySelector('#table').addEventListener('click', (e) => {
  if (e.target.classList.contains('btn-close')) {
    if (confirm('Are you sure you want to delete this item?')) {
      e.target.parentElement.parentElement.parentElement.remove();
    } else { return; }
  }
}
);

// remove #demo if it exists
function removeDemo() {
  if (document.querySelector('#demo') === null) {
    return;
  } else {
    document.querySelector('#demo').remove();
  }
};

// on disposalCell click, show select box
document.querySelector('#table').addEventListener('click', (e) => {
  if (e.target.classList.contains('disp')) {
    // e.target.setAttribute('contenteditable', 'false');
    e.target.innerHTML = '<select><option value="Approval">Approval</option><option value="Approval w/C">Approval w/C</option><option value="Denial">Denial</option><option value="Defer">Defer</option><option value="Abstain">Abstain</option><option value="R&C">Review & Comment</option></select>';
    e.target.firstChild.focus();
  }
  // on blur, change selected value to td text
  e.target.addEventListener('focusout', (e) => {
    if (e.target.tagName === 'SELECT') {
      e.target.parentElement?.classList.remove('highlight');
      e.target.parentElement.innerText = e.target.value;
    }
  });
});

// listen for tab key press in applName cells, add new row for comments
document.querySelector('#table').addEventListener('keydown', (e) => {
  if (e.target.classList.contains('applName') === true && e.key === 'Tab' && e.target.parentElement.nextElementSibling == null) {
    // create new row for comments
    let commentsRow = document.createElement('tr');
    // create new cell for comments
    let commentsCell = document.createElement('td')
    commentsCell.setAttribute('colspan', '3');
    commentsCell.setAttribute('contenteditable', 'true');
    commentsCell.classList.add('comments');
    // add text to cell
    commentsCell.textContent = '';
    // append cell to row
    commentsRow.appendChild(commentsCell);
    // append row to tbody
    e.target.parentElement.parentElement.appendChild(commentsRow);
  }
});

// Warn before leaving page
window.onbeforeunload = function (e) {
  return 'Form contents will be lost!';
};

// set datepicker to today
// today = document.querySelector('#date').valueAsDate = new Date();

// expand pNotes textarea on to fit text
document.querySelector('#pNotes').addEventListener('input', (e) => {
  e.target.style.height = 'auto';
  e.target.style.height = e.target.scrollHeight + 2 + 'px';
});

// get date from datepicker
let field = document.querySelector('#date');

// listen for print event
window.addEventListener('beforeprint', () => {
  let NPU = document.getElementById('NPU').value;
  let notes = document.getElementById('pNotes').value.trim();

  // Get the date
  let date = new Date(`${field.value}T00:00:00`);
  // Format date as MM-DD-YYYY
  let dateString = `${date.getMonth() + 1}-${date.getDate()}-${date.getFullYear()}`;
  // console.log(dateString);

  // change document title
  document.title = `Voting Report_NPU-${NPU}_${dateString}`
  document.querySelector('#header').innerText = `VOTING REPORT: NPU-${NPU}  |  ${dateString}`;
  // change pNotes textarea to <h5> element
  document.querySelector('#pNotes').outerHTML = `<h5 id="pNotes">${notes}</h5>`;
  // Hide instructions, print btn, and delete item buttons for printing
  document.getElementById('instructions').style.display = 'none';
  document.getElementById('print').style.display = 'none';
  document.getElementById('report').style.display = 'none';
  document.getElementById('signature').style.display = 'block';
  document.querySelectorAll('.btn-close').forEach(btn => {
    btn.style.display = 'none';
  });
  // if comment cells are empty, remove them
  document.querySelectorAll('td[contenteditable="true"]').forEach(cell => {
    console.log('remove empty comments')
    if (cell.textContent === '') {
      cell.parentElement.remove();
    }
  });
  if (document.querySelector('#demo') === !null) {
    document.getElementById('demo').style.display = 'none';
  };
});

// on print button click, print page
document.querySelector('#print').addEventListener('click', () => {
  let dispCell = document.querySelectorAll('.disp');
  // if datepicker is empty, return
  if (field.value === '') {
    message.innerText = 'Please select a date';
    modal.showModal();
    return;
  }
  // if any dispCell is "PENDING", cancel print and highlight cell
  dispCell.forEach(cell => {
    if (cell.textContent === 'PENDING') {
      cell.classList.add('highlight');
      return;
    } else {
      cell.classList.remove('highlight');
    }
  });
  // check if any disp cell contains "PENDING", if so, cancel printing
  if (document.querySelectorAll('.highlight').length > 0) {
    message.innerText = 'Please select a disposition for all items';
    modal.showModal();
    return;
  } else {
    window.print();
  }
});

// reset title after print
window.addEventListener('afterprint', () => {
  document.title = 'Planner’s Voting Report';
  storeForm();
  document.getElementById('report').style.display = 'block';
  document.getElementById('instructions').style.display = 'block';
  document.getElementById('print').style.display = 'block';
  document.getElementById('report').style.display = 'block';
  document.querySelectorAll('.btn-close').forEach(btn => {
    btn.style.display = 'inline';
  });
  document.getElementById('signature').style.display = 'none';
  let notes = document.getElementById('pNotes').textContent;
  document.querySelector('#pNotes').outerHTML = `<textarea id="pNotes" class="form-control" placeholder="Enter any notes here...">${notes}</textarea>`;
});

// auto-format application numbers
function patternMatch({
  input,
  template
}) {
  try {

    let j = 0;
    let plaintext = "";
    let countj = 0;
    while (j < template.length) {

      if (countj > input.length - 1) {
        template = template.substring(0, j);
        break;
      }

      if (template[j] == input[j]) {
        j++;
        countj++;
        continue;
      }

      if (template[j] == "x") {
        template = template.substring(0, j) + input[countj] + template.substring(j + 1);
        plaintext = plaintext + input[countj];
        countj++;
      }
      j++;
    }

    return template

  } catch {
    return ""
  }
};

// make tbody rows draggable
const draggables = document.querySelectorAll('.draggable');
const container = document.getElementById('table');

draggables.forEach(draggable => {
  draggable.addEventListener('dragstart', () => {
    draggable.classList.add('dragging');
  });

  draggable.addEventListener('dragend', () => {
    draggable.classList.remove('dragging');
  });
});

container.addEventListener('dragover', e => {
  e.preventDefault();
  const afterElement = getDragAfterElement(container, e.clientY);
  // console.log(afterElement)
  const draggable = document.querySelector('.dragging')
  if (afterElement == null) {
    container.appendChild(draggable);
  } else {
    container.insertBefore(draggable, afterElement);
  }
})

function getDragAfterElement(container, y) {
  const draggableElements = [...container.querySelectorAll('.draggable:not(.dragging)')]

  return draggableElements.reduce((closest, child) => {
    const box = child.getBoundingClientRect()
    const offset = y - box.top - box.height / 2
    if (offset < 0 && offset > closest.offset) {
      return { offset: offset, element: child }
    } else {
      return closest
    }
  }, { offset: Number.NEGATIVE_INFINITY }).element
}
