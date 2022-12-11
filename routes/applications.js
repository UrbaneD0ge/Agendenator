const { application } = require('express');
const express = require('express');
const router = express.Router();
const Application = require('../models/applications');

router.get('/new', (req, res) => {
  res.render('applications/new', { applications: new Application() });
});

router.get('/edit/:id', async (req, res) => {
  const application = await Application.findById(req.params.id);
  res.render('applications/edit', { application: application });
});

router.get('/:slug', async (req, res) => {
  const application = await Application.findOne({ slug: req.params.slug });
  if (application == null) res.redirect('/')
  else res.render('applications/show', { application: application });
});

router.post('/', async (req, res, next) => {
  req.application = new Application()
  next()
}, saveAndRedirect('show'));

router.put('/:id', async (req, res, next) => {
  req.application = await Application.findById(req.params.id);
  next()
}, saveAndRedirect('show'));

router.delete('/:id', async (req, res) => {
  await Application.findByIdAndDelete(req.params.id)
  res.redirect('/')
})

router.get('/', async (req, res) => {
  const applications = await Application.find().sort({ NPU: 'asc' });
  await res.render('applications/applications', { applications: applications });
});

console.dir(router, { depth: 5 });

function saveAndRedirect(path) {
  return async (req, res) => {
    //    for (keys in req.body) {
    //      application[keys] = body[keys];
    //    }
    let application = req.application
    application.NPU = req.body.NPU
    application.adjacent = req.body.adjacent
    application.date = req.body.date
    application.month = req.body.month
    application.address = req.body.address
    application.type = req.body.type
    application.title = req.body.title
    application.descr = req.body.descr
    application.notes = req.body.notes
    application.applicant = req.body.applicant
    application.applURL = req.body.applURL
    application.URL1 = req.body.URL1
    application.URL2 = req.body.URL2
    application.URL3 = req.body.URL3
    application.URL4 = req.body.URL4
    try {
      console.dir(req);
      console.dir(application);
      //application = await application.save()
      res.redirect(`/show/${application.slug}`)
    } catch (err) {
      console.log(err)
      res.render(`/${path}`, { application: application })
    }
  }
}

module.exports = router;