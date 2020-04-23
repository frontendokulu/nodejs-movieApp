const express = require('express');
const router = express.Router();

/* GET movies listing. */
router.get('/', (req, res, next) => {
  res.send('response abc');
});

module.exports = router;
