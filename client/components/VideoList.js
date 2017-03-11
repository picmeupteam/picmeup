import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { Link } from 'react-router'

// Video list component that takes each video it gets and make a video component for it

class VideoList extends Component {

  constructor() {
    super();

    this.state = {
      videos: []
    }
  }

  componentWillMount() {
    const self = this;

    axios.get('/api/video')
    .then(returnedinfo => returnedinfo.data)
    .then(function (allvideos) {
      self.setState({ videos: allvideos })
    })
  }

  render() {
    return (
      <div className='video-list'>
        <center>
          <h2>your affirmations</h2>
          {this.state.videos && this.state.videos.map(function(video){
            return <Video key={video.token} singleVid={video} />
          })}
          <br />
          <Link to='/record'>
            <button className='btn btn-primary'>create new</button>
          </Link>
          <br /><br />
        </center>
      </div>
    );
  }
}

const Video = ({ singleVid }) => {

  ZiggeoApi.Embed.embed(
    `#video-${singleVid.token}`, {
      width: 640,
      height: 480,
      responsive: false,
      video: `${singleVid.token}`
    }
  )

  const tags = singleVid.tags.map(tag => tag.name).join(', ');

  return (
    <div>
      <h3>{singleVid.title}</h3>
      <div id={`video-${singleVid.token}`} />
      <p>{tags}</p>
      <Link to={`/videos/${singleVid.id}`}>Edit</Link>
      <br />
    </div>
  )
}

export default VideoList;
