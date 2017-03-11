const db = require('../db');
const Tag = db.model('tags');
const router = require('express').Router();

router.get('/', (req, res, next) => {
  Tag.findAll()
  .then(tags => res.json(tags))
  .catch(next);
});

// assumes correct payload in req.body
router.post('/', (req, res, next) => {
  Tag.create(req.body)
  .then(tag => res.json(tag))
  .catch(next);
});

router.get('/:id', (req, res, next) => {
  Tag.findById(req.params.id)
  .then(tag => tag.getVideos())
  .then(videos => res.json(videos))
  .catch(next);
});

module.exports = router;
