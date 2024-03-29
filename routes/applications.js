const express = require('express');
const router = express.Router();
const Application = require('../models/applications');

router.get('/new', (req, res) => {
  if (req.session.isPopulated) {
    res.render('applications/new', { applications: new Application(), req: req });
  } else {
    res.redirect('/login/google')
  }
});

router.get('/edit/:id', async (req, res) => {
  if (req.session.isPopulated) {
    const application = await Application.findById(req.params.id);
    res.render('applications/edit', { application: application, req: req });
  } else {
    res.redirect('/login/google')
  }
});

router.get('/:slug', async (req, res) => {
  const application = await Application.findOne({ slug: req.params.slug });
  if (application == null) res.redirect('/')
  else res.render('applications/show', { application: application, req: req });
});

router.post('/', async (req, res, next) => {
  if (req.session.isPopulated) {
    req.application = new Application()
    next()
  } else {
    res.redirect('/login/google')
    return
  }
}, saveAndRedirect('show'));

router.put('/:id', async (req, res, next) => {
  if (req.session.isPopulated) {
    req.application = await Application.findById(req.params.id);
    next()
  } else {
    res.redirect('/login/google')
  }
}, putUpdate('show'));

router.delete('/:id', async (req, res) => {
  if (req.session.isPopulated) {
    await Application.findByIdAndDelete(req.params.id)
    res.redirect('/applications')
  } else {
    res.redirect('/login/google')
  }
})

router.get('/', async (req, res) => {
  const applications = await Application.find().sort({ NPU: 'asc' });
  await res.render('applications/applications', { applications: applications, req: req });
});

// console.dir(router, { depth: 5 });

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
      // console.dir(req);
      // console.dir(application);
      application = await application.save()
      res.redirect(`/show/${application.slug}`)
    } catch (err) {
      console.log(err)
      res.render(`/${path}`, { application: application })
    }
  }
};

function putUpdate(path) {
  return async (req, res) => {
    let application = req.application
    //  assign fields to application and save
    for (keys in req.body) {
      application[keys] = req.body[keys];
    }

    try {
      // console.dir(req);
      // console.dir(application);
      application = await application.save()
      res.redirect(`/show/${application.slug}`)
    } catch (err) {
      console.log(err)
      res.render(`/${path}`, { application: application })
    }
  }
};

module.exports = router;