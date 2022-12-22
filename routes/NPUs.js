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
  req.NPU = await NPU.findById(req.params.id);
  next()
  console.log('update NPU-' + req.NPU.NPU)
}, putUpdate('NPUs'));

// post new NPU
router.post('/', async (req, res, next) => {
  req.NPU = new NPU()
  next()
  console.log('post new NPU-' + req.NPU.NPU)
}, saveAndRedirect('NPUs'));

// delete NPU
router.delete('/:id', async (req, res) => {
  await NPU.findByIdAndDelete(req.params.id)
  res.redirect('/NPUs')
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
    NPU.ZoomDial = req.body.ZoomDial
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