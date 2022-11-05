const express = require('express');
const router = express.Router();
const Application = require('../models/applications');

// define agenda route
router.get('/', async (req, res) => {
  const applications = await Application.find().sort({ NPU: 'asc' });
  await res.render('applications/applications', { applications: applications });
});

router.get('/new', (req, res) => {
  res.render('applications/new', { applications: new Application() });
});

router.get('/:slug', async (req, res) => {
  const application = await Application.find({ slug: req.params.slug });
  if (application == null) res.redirect('/');
  res.render('applications/show', { application: application });
});

router.get('/edit/:id', async (req, res) => {
  const application = await Application.findOne({ slug: req.params.slug });
  if (application == null) res.redirect('/')
  res.render('applications/edit', { application: application });
});

// router.get('/save/:slug', async (req, res) => {
//   const application = await Application.findOne({ slug: req.params.slug });
//   if (application == null) res.redirect('/')
//   res.render('applications/save', { application: application });
// });

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
    res.redirect(`applications/${application.slug}`, { application: application })
  } catch (err) {
    console.log(err)
    res.render('applications/new', { application: application })
  }
})

router.put('/:id', async (req, res) => {
  let application = await Application.findById(req.params.id)
  application.NPU = req.body.NPU
  application.adjacent = req.body.adjacent
  application.date = req.body.date
  application.address = req.body.address
  application.type = req.body.type
  application.title = req.body.title
  application.descr = req.body.descr
  try {
    application = await application.save()
    res.redirect(`/applications/${application.slug}`)
  } catch (err) {
    console.log(err)
    res.render('applications/edit', { application: application })
  }
})

router.delete('/:id', async (req, res) => {
  await Application.findByIdAndDelete(req.params.id)
  res.redirect('/applications')
})

module.exports = router;