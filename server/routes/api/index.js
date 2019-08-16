const router = require('express').Router();

router.use('/articles', require('./articles'));
router.use('/letters', require('./letters'))

module.exports = router;