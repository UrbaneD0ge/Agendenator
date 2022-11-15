const { application } = require('express');
const express = require('express');
const router = express.Router();
const Application = require('../models/applications');

router.get('/new', (req, res) => {
  res.render('applications/new', { applications: new Application() });
});

router.get('/:slug', async (req, res) => {
  const application = await Application.findOne({ slug: req.params.slug });
  if (application == null) res.redirect('/')
  res.render('applications/show', { application: application });
});

router.get('/edit/:id', async (req, res) => {
  const application = await Application.findById(req.params.id);
  if (application == null) res.redirect('/')
  res.render('applications/edit', { application: application });
});

router.put('edit/:id', async (req, res, next) => {
  req.application = await Application.findById(req.params.id)
  if (application == null) res.redirect('/applications/show')
  next()
}, saveAndRedirect('/applications/show'));

router.get('/', async (req, res) => {
  const applications = await Application.find().sort({ NPU: 'asc' });
  await res.render('applications/applications', { applications: applications });
});

router.post('/', async (req, res, next) => {
  req.application = new Application()
  next()
}, saveAndRedirect('/show'));

router.delete('/:id', async (req, res) => {
  await Application.findByIdAndDelete(req.params.id)
  res.redirect('/applications')
})

function saveAndRedirect(path) {
  return async (req, res) => {
    let application = req.application
    application.NPU = req.body.NPU
    application.adjacent = req.body.adjacent
    application.date = req.body.date
    application.address = req.body.address
    application.type = req.body.type
    application.title = req.body.title
    application.descr = req.body.descr
    application.notes = req.body.notes
    try {
      application = await application.save()
      res.redirect(`/ applications / ${application.id}`)
    } catch (err) {
      console.log(err)
      res.render(`applications / ${path}`, { application: application })
    }
  }
}

module.exports = router;