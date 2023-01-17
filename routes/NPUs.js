const cookieSession = require('cookie-session');
const { application } = require('express');
const express = require('express');
const router = express.Router();
const NPU = require('../models/NPUs');

// add new NPU
router.get('/new', (req, res) => {
  res.render('NPUs/new', { NPUs: new NPU() });
});

// edit NPU
router.get('/edit/:id', async (req, res) => {
  const npu = await NPU.findById(req.params.id);
  res.render('NPUs/edit', { NPU: npu });
});

// update NPU
router.put('/:id', async (req, res, next) => {
  if (req.session) {
    req.NPU = await NPU.findById(req.params.id);
    next()
  } else {
    res.redirect('/login/google')
  }
}, putUpdate('NPUs'));

// post new NPU
router.post('/', async (req, res, next) => {
  if (req.session) {
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
  await res.render('NPUs/NPUs', { NPUs: NPUs });
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
    for (keys in req.body) {
      NPU[keys] = req.body[keys];
    }

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