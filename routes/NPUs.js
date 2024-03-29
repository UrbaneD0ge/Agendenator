const cookieSession = require('cookie-session');
const { application } = require('express');
const express = require('express');
const router = express.Router();
const NPU = require('../models/NPUs');

// add new NPU
router.get('/new', (req, res) => {
  if (req.session.isPopulated) {
    res.render('NPUs/new', { NPUs: new NPU(), req: req });
  } else {
    res.redirect('/login/google')
  }
});

// npungl3r
router.get('/npungl3r', (req, res) => {
  if (req.session.isPopulated) {
    res.render('NPUs/npungl3r', { req: req });
  } else {
    res.redirect('/login/google')
  }
});

// edit NPU
router.get('/edit/:id', async (req, res) => {
  if (req.session.isPopulated) {
    const npu = await NPU.findById(req.params.id);
    res.render('NPUs/edit', { NPU: npu, req: req });
  } else {
    res.redirect('/login/google')
  }
});

// update NPU
router.put('/:id', async (req, res, next) => {
  if (req.session.isPopulated) {
    req.NPU = await NPU.findById(req.params.id);
    next()
  } else {
    res.redirect('/login/google')
  }
}, putUpdate('NPUs'));

// post new NPU
router.post('/', async (req, res, next) => {
  if (req.session.isPopulated) {
    req.NPU = new NPU()
    next()
  } else {
    res.redirect('/login/google')
  }
}, saveAndRedirect('NPUs'));

// delete NPU
router.delete('/:id', async (req, res) => {
  if (req.session.isPopulated) {
    await NPU.findByIdAndDelete(req.params.id)
    res.redirect('/NPUs')
  } else {
    res.redirect('/login/google')
  }
});

// show all NPUs
router.get('/', async (req, res) => {
  const NPUs = await NPU.find().sort({ NPU: 'asc' });
  await res.render('NPUs/NPUs', { NPUs: NPUs, req: req });
});

function saveAndRedirect(path) {
  return async (req, res) => {
    let NPU = req.NPU
    NPU.NPU = req.body.NPU
    NPU.chair = req.body.chair
    NPU.chairE = req.body.chairE
    NPU.planner = req.body.planner
    NPU.plannerE = req.body.plannerE
    NPU.meeting = req.body.meeting
    NPU.ZoomID = req.body.ZoomID
    NPU.ZoomPW = req.body.ZoomPW
    NPU.ZoomURL = req.body.ZoomURL
    NPU.bylawsURL = req.body.bylawsURL
    NPU.location = req.body.location
    NPU.nhoods = req.body.nhoods
    NPU.isHybrid = req.body.isHybrid
    try {
      NPU = await NPU.save()
      res.redirect(`NPUs`)
    } catch (e) {
      console.log(e)
      res.render('/')
    }
  }
}

function putUpdate(path) {
  return async (req, res) => {
    let NPU = req.NPU
    //  assign fields to application and save
    NPU.NPU = req.body.NPU
    NPU.chair = req.body.chair
    NPU.chairE = req.body.chairE
    NPU.planner = req.body.planner
    NPU.plannerE = req.body.plannerE
    NPU.meeting = req.body.meeting
    NPU.ZoomID = req.body.ZoomID
    NPU.ZoomPW = req.body.ZoomPW
    NPU.ZoomURL = req.body.ZoomURL
    NPU.bylawsURL = req.body.bylawsURL
    NPU.location = req.body.location
    NPU.nhoods = req.body.nhoods
    NPU.isHybrid = req.body.isHybrid == 'on' ? true : false
    console.log(NPU.isHybrid)
    try {
      // console.dir(req);
      // console.dir(application);
      NPU = await NPU.save()
      res.redirect(`/NPUs`)
    } catch (err) {
      console.log(err)
      res.render(`/${path}`)
    }
  }
};

module.exports = router;