const express = require('express');
const router = express.Router();

/* GET movies listing. */
router.get('/', (req, res, next) => {
  res.json({
    status : 1,
    title : 'Nodemon u kurmadan olmaz'
  });
});

module.exports = router;
