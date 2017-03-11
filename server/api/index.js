const router = require('express').Router();
module.exports = router;


router.use('/tag', require('./tag'));
router.use('/video', require('./video'));
router.use('/playlist', require('./playlist'));


router.use((req, res, next) => {
  res.status(404).send('Not found');
});
