const express = require('express');
const router = express.Router();

// define agenda route
router.get('/', (req, res) => {
  res.render('applications', { title: 'Applications' });
});

module.exports = router;