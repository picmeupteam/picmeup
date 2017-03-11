const db = require('../db');
const Video = db.model('videos');
const Playlist = db.model('playlists');
const Tag = db.model('tags');
const router = require('express').Router();

// gets all videos with playlists and tags
router.get('/', (req, res, next) => {
  Video.findAll({include: [Playlist, Tag]})
  .then(videos => res.json(videos))
  .catch(next);
});

// creates a new video
// assumes correct payload in req.body
// payload can have:
// {title: "string", tags: "comma separated string", token: "string"}
router.post('/', (req, res, next) => {
  Video.create(req.body)
  .then(video => {
    if (req.body.tags) {
      let tags = req.body.tags.split(',');
      tags = tags.map(tag => Tag.findOrCreate({where: {name: tag}}).then(tagThing => tagThing[0]));
      return Promise.all(tags)
      .then(allTags => video.setTags(allTags))
      .then(() => Video.findById(video.id).then(updatedVideo => updatedVideo))
    }
    else return video;
  })
  .then(video => res.json(video))
  .catch(next);
});

// gets one video with playlists and tags
router.get('/:id', (req, res, next) => {
  Video.findOne({where: {id: req.params.id}, include: [Playlist, Tag]})
  .then(video => res.json(video))
  .catch(next);
});

// updates a video
// assumes correct payload in req.body
// payload can have:
// {
//    title: "string",
//    tagList: "comma separated string",
//    tagAdd: id,
//    tagRemove: id,
//    playlistAdd: id,
//    playlistRemove: id
// }
// if adding/deleting to a playlist, assume youre given the id
// if adding/deleting a tag, also assume youre given the id

router.put('/:id', (req, res, next) => {
  Video.findOne({where: {id: req.params.id}, include: [Playlist, Tag]})
  .then(video => video.update(req.body))
  .then(video => {
    if (req.body.tagList) {
      let tags = req.body.tagList.split(',');
      tags = tags.map(tag => Tag.findOrCreate({where: {name: tag}}).then(tagThing => tagThing[0]));
      return Promise.all(tags)
      .then(allTags => video.setTags(allTags))
      .then(() => Video.findById(video.id).then(updatedVideo => updatedVideo))
    }
    else return video;
  })
  .then(video => {
    if (req.body.tagAdd) {
      return video.addTag(req.body.tagAdd)
      .then(() => Video.findOne({where: {id: req.params.id}, include: [Playlist, Tag]}))
      .then(updatedVideo => updatedVideo);
    }
    else return video;
  })
  .then(video => {
    if (req.body.tagRemove) {
      let tags = [...video.tags];
      const index = tags.findIndex(tag => tag.id == req.body.tagRemove);
      tags.splice(index, 1);
      return video.setTags(tags)
      .then(() => Video.findOne({where: {id: req.params.id}, include: [Playlist, Tag]}))
      .then(updatedVideo => updatedVideo);
    }
    else return video;
  })
  .then(video => {
    if (req.body.playlistAdd) {
      return video.addPlaylist(req.body.playlistAdd)
      .then(() => Video.findOne({where: {id: req.params.id}, include: [Playlist, Tag]}))
      .then(updatedVideo => updatedVideo);
    }
    else return video;
  })
  .then(video => {
    if (req.body.playlistRemove) {
      let playlists = [...video.playlists];
      const index = playlists.findIndex(playlist => playlist.id == req.body.playlistRemove);
      playlists.splice(index, 1);
      return video.setPlaylists(playlists)
      .then(() => Video.findOne({where: {id: req.params.id}, include: [Playlist, Tag]}))
      .then(updatedVideo => updatedVideo);
    }
    else return video;
  })
  .then(video => res.json(video))
  .catch(next);
});

// deletes a video
router.delete('/:id', (req, res, next) => {
  Video.findById(req.params.id)
  .then(video => video.destroy())
  .then(() => res.sendStatus(204))
  .catch(next);
});

module.exports = router;
