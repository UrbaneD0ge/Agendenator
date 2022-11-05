const express = require('express');
const router = express.Router();
const Application = require('../models/applications');

// define agenda route
router.get('/', async (req, res) => {
  // const applications = [{
  //   NPU: 'A',
  //   adjacent: 'B',
  //   date: 'January 1 or 8, 2023',
  //   address: '1199 Merlin Ave SE',
  //   type: 'SD',
  //   title: 'SD-01-234',
  //   descr: 'Applicant seeks to subdivide the property into 3 lots.',
  // },
  // {
  //   NPU: 'B',
  //   date: 'January 1 or 8, 2023',
  //   address: '1207 South Main St NE',
  //   type: 'BZA',
  //   title: 'V-22-123',
  //   descr: 'Applicant seeks a variance to reduce the rear-yard setback.',
  // }]
  await res.render('applications/applications');
});

router.get('/new', (req, res) => {
  res.render('applications/new', { applications: new Application() });
});

router.get('/:id', async (req, res) => {
  const application = await Application.findById(req.params.id)
  if (application == null) res.redirect('/')
  res.render('applications/show', { application: application });
});

router.post('/', async (req, res) => {
  let application = new Application({
    NPU: req.body.NPU,
    adjacent: req.body.adjacent,
    date: req.body.date,
    address: req.body.address,
    type: req.body.type,
    title: req.body.title,
    descr: req.body.descr
  })
  try {
    application = await application.save()
    res.redirect(`applications/${application.id}`)
  } catch (err) {
    console.log(err)
    res.render('applications/new', { application: application })
  }
})

module.exports = router;