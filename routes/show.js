const express = require('express');
const router = express.Router();
const Application = require('../models/applications');

// show single application
router.get('/show/:slug', async (req, res) => {
  const application = await Application.find({ slug: req.params.slug });
  if (application == null) res.redirect('/')
  res.render('/show', { application: application });
});

module.exports = router;