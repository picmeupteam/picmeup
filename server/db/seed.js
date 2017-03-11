const db = require('./')

const seedUsers = () => db.Promise.map([
  {name: 'so many', email: 'god@example.com', password: '1234'},
  {name: 'Barack Obama', email: 'barack@example.gov', password: '1234'},
], user => db.model('users').create(user))

const seedTags = () => db.Promise.map([
  {name: 'happy'},
  {name: 'inspirational'},
], tag => db.model('tags').create(tag))

const seedVideos = () => db.Promise.map([
  {token: '29847dsf', title: 'interviewing'},
  {token: 'dsfa83fa', title: 'cheer up!'},
], video => db.model('videos').create(video))

const seedVideoTags = () => db.Promise.map([
  {tagId: 1, videoId: 1},
  {tagId: 2, videoId: 2},
  {tagId: 1, videoId: 2},
], video => db.model('videoTags').create(video))


db.sync({force: true})
  .then(seedUsers)
  .then(users => console.log(`Seeded ${users.length} users OK`))
  .then(seedTags)
  .then(tags => console.log(`Seeded ${tags.length} tags OK`))
  .then(seedVideos)
  .then(videos => console.log(`Seeded ${videos.length} videos OK`))
  .then(seedVideoTags)
  .then(videos => console.log(`Seeded ${videos.length} videotags OK`))


  .catch(error => console.error(error))
  .finally(() => db.close())
