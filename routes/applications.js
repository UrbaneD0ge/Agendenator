const express = require('express');
const router = express.Router();

// define agenda route
router.get('/', (req, res) => {
  const applications = [{
    NPU: 'A',
    adjacent: 'B',
    date: 'January 1 or 8, 2023',
    address: '1199 Merlin Ave SE',
    type: 'SD',
    descr: 'Applicant seeks to subdivide the property into 3 lots.',
  },
  {
    NPU: 'B',
    adjacent: 'C',
    date: 'January 1 or 8, 2023',
    address: '1207 South Main St NE',
    type: 'BZA',
    descr: 'Applicant seeks a variance to reduce the rear-yard setback.',
  }]
  res.render('applications', { applications: applications });
});



module.exports = router;