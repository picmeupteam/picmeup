const db = require('../db');
const Video = db.model('videos');
const router = require('express').Router();

router.get('/', (req, res, next) => {
  Video.findAll()
  .then(videos => res.json(videos))
  .catch(next);
});

// assumes correct payload in req.body
router.post('/', (req, res, next) => {
  Video.create(req.body)
  .then(video => res.json(video))
  .catch(next);
});

router.get('/:id', (req, res, next) => {
  Video.findById(req.params.id)
  .then(video => res.json(video))
  .catch(next);
});

// assumes correct payload in req.body
router.put('/:id', (req, res, next) => {
  Video.findById(req.params.id)
  .then(video => video.update(req.body))
  .then(video => res.json(video))
  .catch(next);
});

router.delete('/:id', (req, res, next) => {
  Video.findById(req.params.id)
  .then(video => video.destroy())
  .then(() => res.sendStatus(204))
  .catch(next);
});

module.exports = router;
