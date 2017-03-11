const db = require('../db');
const Playlist = db.model('playlists');
const Video = db.model('videos');
const Tag = db.model('tags');
const router = require('express').Router();

// gets all playlists with their videos
router.get('/', (req, res, next) => {
  Playlist.findAll({include: Video})
  .then(playlists => res.json(playlists))
  .catch(next);
});

// creates a new playlist
// assumes correct payload in req.body
// payload can have {name: "string"}
router.post('/', (req, res, next) => {
  Playlist.findOrCreate({where: req.body})
  .then(playlist => res.json(playlist[0]))
  .catch(next);
});

// gets one playlist with its videos
router.get('/:id', (req, res, next) => {
  Playlist.findOne({where: {id: req.params.id}, include: [Video]})
  .then(playlist => res.json(playlist))
  .catch(next);
});

// updates a playlist
// assumes correct payload in req.body
// payload can have {name: "string", videoAdd: id, videoRemove: id}
// if adding/deleting a video, assume youre given the id

router.put('/:id', (req, res, next) => {
  Playlist.findOne({where: {id: req.params.id}, include: [Video]})
  .then(playlist => playlist.update(req.body))
  .then(playlist => {
    if (req.body.videoAdd) {
      return playlist.addVideo(req.body.videoAdd)
      .then(() => Playlist.findOne({where: {id: req.params.id}, include: [Video]}))
      .then(updatedPlaylist => updatedPlaylist);
    }
    else return playlist;
  })
  .then(playlist => {
    if (req.body.videoRemove) {
      let videos = [...playlist.videos];
      const index = videos.findIndex(video => video.id == req.body.videoRemove);
      videos.splice(index, 1);
      return playlist.setVideos(videos)
      .then(() => Playlist.findOne({where: {id: req.params.id}, include: [Video]}))
      .then(updatedPlaylist => updatedPlaylist);
    }
    else return playlist;
  })
  .then(playlist => res.json(playlist))
  .catch(next);
});

// deletes a playlist
router.delete('/:id', (req, res, next) => {
  Playlist.findById(req.params.id)
  .then(playlist => playlist.destroy())
  .then(() => res.sendStatus(204))
  .catch(next);
});

module.exports = router;
