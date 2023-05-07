const { application } = require('express');
const express = require('express');
const router = express.Router();
const Application = require('../models/applications');
const NPU = require('../models/NPUs');
const fs = require('fs');
const HTMLtoDOCX = require('html-to-docx');

// show applications matching request parameters
router.get('/', async (req, res) => {
  var fileName = `NPU-${req.query.NPU}_${req.query.month}_agenda.docx`;
  // find where NPU or adjacent matches request parameters and month
  const applications = await Application.find({
    $or: [
      { NPU: req.query.NPU },
      { adjacent: req.query.NPU }
    ],
    month: req.query.month
  });
  const NPUs = await NPU.findOne({ NPU: req.query.NPU, req: req });
  // render an agenda page with the applications and NPU info
  res.render('agendas/agenda', { applications: applications, NPUs: NPUs, req: req }, function (err, html) {
    try {
      writeDocx(html, fileName);
    } catch (err) {
      console.log(err);
    } finally {
      res.download(`./${fileName}`, fileName);
    }
  });
});

async function writeDocx(html, fileName) {
  // remove whitespace from html
  const fileBuffer = await HTMLtoDOCX(html, null, { margins: "1in" })
  fs.writeFile('./' + fileName, fileBuffer, (err) => {
    if (err) {
      console.log('Docx file creation failed: ' + err);
      return;
    } else {
      console.log(fileName + ' created');
    }
  });
};

router.get('/roster', async (req, res) => {
  // find where NPU or adjacent matches request parameters and month
  const applications = await Application.find({
    $or: [
      { NPU: req.query.NPU },
      { adjacent: req.query.NPU }
    ],
    month: req.query.month
  }).sort({ NPU: 'asc', type: 'asc' });
  const NPUs = await NPU.findOne({ NPU: req.query.NPU });
  // render an agenda page with the applications and NPU info
  res.render('agendas/roster', { applications: applications, NPUs: NPUs, req: req });
});

router.get('/report', async (req, res) => {
  // authenticate user
  if (req.session.isPopulated) {
    // find where NPU or adjacent matches request parameters and month
    const applications = await Application.find({
      $or: [
        { NPU: req.query.NPU },
        { adjacent: req.query.NPU }
      ],
      month: req.query.month
    }).sort({ NPU: 'asc', type: 'asc' });
    const NPUs = await NPU.findOne({ NPU: req.query.NPU });
    // render an voting report page with the applications
    res.render('agendas/report', { applications: applications, NPUs: NPUs, req: req });
  } else {
    res.redirect('/login/google')
  }
});

router.get('/dashboard', async (req, res) => {
  // find where NPU or adjacent matches request parameters and month
  const applications = await Application.find({
    $or: [
      { NPU: req.query.NPU },
      { adjacent: req.query.NPU }
    ],
    month: req.query.month
  }).sort({ NPU: 'asc', type: 'asc' });
  const NPUs = await NPU.findOne({ NPU: req.query.NPU });
  // // fetch from GIS website
  // await fetch(`https://gis.atlantaga.gov/dpcd/rest/services/LandUsePlanning/LandUsePlanning/MapServer/10/query?where=DOCKET_NO%3D'Z-22-001'&outFields=ORDHYPERLINK,%20STATUSTYPE&returnGeometry=false&returnTrueCurves=false&returnIdsOnly=false&returnCountOnly=false&returnZ=false&returnM=false&returnDistinctValues=false&returnExtentOnly=false&f=pjson`)
  //   .then((response) => {
  //     // console.log(response);
  //     return response.json();
  //   }).then((data) => {
  //     application.status = data.features[0].attributes.STATUSTYPE;
  //     application.ordLink = data.features[0].attributes.ORDHYPERLINK;
  //     // console.log(application.status);
  //   }).catch((err) => {
  //     console.log(err);
  //   });
  // render an agenda page with the applications and NPU info
  res.render('agendas/dashboard', { applications: applications, NPUs: NPUs, req: req });
});
module.exports = router;