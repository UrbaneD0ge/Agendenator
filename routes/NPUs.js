const { application } = require('express');
const express = require('express');
const router = express.Router();
const NPU = require('../models/NPUs');

// post new NPU
router.post('/NPUs/new', async (req, res) => {
  req.NPU = new NPU()
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
    res.redirect(`/`)
  } catch (e) {
    res.render('/')
  }
});

// show all NPUs
router.get('/NPUs', async (req, res) => {
  const NPUs = await NPU.find().sort({ NPU: 'asc' });
  res.render('NPUs/NPUs', { NPUs: NPUs });
});

// add new NPU
router.get('/NPUs/new', (req, res) => {
  res.render('NPUs/new', { NPUs: new NPU() });
});

module.exports = router;