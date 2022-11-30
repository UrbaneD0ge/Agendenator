const { application } = require('express');
const express = require('express');
const router = express.Router();
const NPU = require('../models/NPUs');

// add new NPU
router.get('/NPUs/new', (req, res) => {
  res.render('NPUs/new', { NPUs: new NPU() });
});

// post new NPU
router.post('/', async (req, res, next) => {
  req.NPU = new NPU()
  next()
}, saveAndRedirect('show'));

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
    NPU.ZoomDial = req.body.ZoomDial
    try {
      NPU = await NPU.save()
      res.redirect(`/NPUs/${NPU.NPU}`)
    } catch (e) {
      console.log(e)
      res.render(`NPUs/${path}`, { NPU: NPU })
    }
  }
}

module.exports = router;