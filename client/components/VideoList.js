import React from 'react';
import {connect} from 'react-redux'

// dumb video list component that takes each video it gets and make a video component for it

const VideoList = (props) => {
  console.log(props)
  return (
    <div className='video-list'>
      <button className='btn new-btn'>
        create new
      </button>
      <h2>your affirmations</h2>
      {props.videos && props.videos.map(function(video){
        return <Video singleVid={video} />
      })}

      {/* some filler data */
        props.dummydata && props.dummydata.map(function(fakevid){
          console.log('there was dummy data')
          return <Video singleVid={fakevid} />
        })}
    </div>
  )
}

const Video = ({ singleVid }) => {
  console.log('make some vid components')

  return (
    <div className='video-list-item col-lg-4 col-sm-10'>
      <h3>{singleVid.title}</h3>
      <p> this is the token. {singleVid.token} </p>


      <div className='video'>
        this should be the actual video
      </div>
    </div>
  )
}

const dummydata = [
  {
    title: 'first vid',
    token: '435asdf',
  },{
    title: 'throw everyone in volcanoes',
    token: 'fsdfg0983',
  },{
    title: 'youre the most magic person',
    token: '39rufajo',
  },
]

const mapState = (state) => {
  return {dummydata}
}

export default connect(mapState)(VideoList);
