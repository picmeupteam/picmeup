import React, { Component } from 'react';
import {connect} from 'react-redux';
import axios from 'axios';

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
          <button className='btn new-btn'>
            create new
          </button>
          <h2>your affirmations</h2>
          {this.state.videos && this.state.videos.map(function(video){
            return <Video key={video.token} singleVid={video} />
          })}
        </center>
      </div>
    );
  }
}

const styles = {
  display: "inline-block"
}

// var embedding = ZiggeoApi.Embed.embed(
//         "#replace_me", {
//             width:640,
//             height:480,
//             video: "VIDEO_TOKEN"
//     });

const temp = [];

const Video = ({ singleVid }) => {

  ZiggeoApi.Embed.embed(
      `#video-${singleVid.token}`, {
        width: 640,
        height: 480,
        responsive: false,
        video: `${singleVid.token}`
      })

  return (
    <div>
      <h3>{singleVid.title}</h3>
      <div id={`video-${singleVid.token}`}></div>
      <br />
    </div>
  )
}

// <ziggeo
//   ziggeo-video={singleVid.token}
// />

export default VideoList;