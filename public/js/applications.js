// reverse sort table
const npuSort = document.getElementById('npuSort');
npuSort.addEventListener('click', (e) => {
  e.preventDefault();
  const table = document.querySelector('table');
  const rows = Array.from(table.querySelectorAll('tr'));
  rows.shift();
  rows.reverse();
  rows.forEach(row => table.appendChild(row));
  // toggle header emoji
  if (npuSort.innerText.includes('🔼')) {
    npuSort.innerText = 'NPU 🔽';
  } else {
    npuSort.innerText = 'NPU 🔼';
  }
});

// sort by title
const titleSort = document.getElementById('titleSort');
titleSort.addEventListener('click', (e) => {
  e.preventDefault();
  const table = document.querySelector('table');
  const rows = Array.from(table.querySelectorAll('tr'));
  rows.shift();
  rows.sort((a, b) => {
    const titleA = a.querySelector('.title').innerText;
    const titleB = b.querySelector('.title').innerText;
    if (titleA < titleB) {
      return -1;
    } else if (titleA > titleB) {
      return 1;
    } else {
      return 0;
    }
  });
  rows.forEach(row => table.appendChild(row));
  // toggle header emoji
  if (titleSort.innerText.includes('🔼')) {
    titleSort.innerText = 'Title 🔽';
    rows.reverse();
  } else {
    titleSort.innerText = 'Title 🔼';
  }
});