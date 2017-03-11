const db = require('../db');
const Playlist = db.model('playlists');
const router = require('express').Router();

router.get('/', (req, res, next) => {
  Playlist.findAll()
  .then(playlists => res.json(playlists))
  .catch(next);
});

// assumes correct payload in req.body
router.post('/', (req, res, next) => {
  Playlist.create(req.body)
  .then(playlist => res.json(playlist))
  .catch(next);
});

router.get('/:id', (req, res, next) => {
  Playlist.findById(req.params.id)
  .then(playlist => playlist.getVideos())
  .then(videos => res.json(videos))
  .catch(next);
});

router.delete('/:id', (req, res, next) => {
  Playlist.findById(req.params.id)
  .then(playlist => playlist.destroy())
  .then(() => res.sendStatus(204))
  .catch(next);
});

module.exports = router;
