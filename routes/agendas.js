const { application } = require('express');
const express = require('express');
const router = express.Router();
const Application = require('../models/applications');
const NPU = require('../models/NPUs');

// show applications matching request parameters
router.get('/', async (req, res) => {
  // find where NPU or adjacent matches request parameters and month
  const applications = await Application.find({
    $or: [
      { NPU: req.query.NPU },
      { adjacent: req.query.NPU }
    ],
    month: req.query.month
  });
  const NPUs = await NPU.findOne({ NPU: req.query.NPU });
  // render an agenda page with the applications and NPU info
  res.render('agendas/agenda', { applications: applications, NPUs: NPUs });
});

module.exports = router;