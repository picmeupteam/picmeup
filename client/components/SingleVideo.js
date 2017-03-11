import React from 'react';
import {connect} from 'react-redux';
import {Link, browserHistory} from 'react-router';
import axios from 'axios';

class SingleVideo extends React.Component{
  constructor(props) {
    super(props);
    this.state = {};
    axios.get(`/api/video/${props.routeParams.id}`)
    .then(res => res.data)
    .then(video => {
      this.setState({video})
    })
    axios.get(`/api/playlist`)
    .then(res => res.data)
    .then(playlists => {
      this.setState({playlists})
    })

    this.handleTitle = this.handleTitle.bind(this);
    this.handleAddToPlaylist = this.handleAddToPlaylist.bind(this);
    this.handleAddToNewPlaylist = this.handleAddToNewPlaylist.bind(this);
    this.handleRemoveFromPlaylist = this.handleRemoveFromPlaylist.bind(this);
    this.handleAddTag = this.handleAddTag.bind(this);
    this.handleRemoveTag = this.handleRemoveTag.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  handleTitle(e) {
    e.preventDefault();
    const newTitle = e.target.titleName.value;
    e.target.titleName.value = '';
    axios.put(`/api/video/${this.props.routeParams.id}`, {title: newTitle})
    .then(res => res.data)
    .then(video => {
      this.setState({video})
    })
  }

  handleAddToPlaylist(e) {
    e.preventDefault();
    const id = e.target.playlistName.value;
    axios.put(`/api/video/${this.props.routeParams.id}`, {playlistAdd: id})
    .then(res => res.data)
    .then(video => {
      this.setState({video})
    })
  }

  handleAddToNewPlaylist(e) {
    e.preventDefault();
    const name = e.target.newPlaylistName.value;
    e.target.newPlaylistName.value = '';
    axios.post(`/api/playlist`, {name: name})
    .then(res => res.data)
    .then(playlist => {
      axios.put(`/api/video/${this.props.routeParams.id}`, {playlistAdd: playlist.id})
      .then(res => res.data)
      .then(video => {
        this.setState({video})
      })
    })
  }

  handleRemoveFromPlaylist(e) {
    e.preventDefault();
    const id = e.target.removePlaylistName.value;
    axios.put(`/api/video/${this.props.routeParams.id}`, {playlistRemove: id})
    .then(res => res.data)
    .then(video => {
      this.setState({video})
    })
  }

  handleAddTag(e) {
    e.preventDefault();
    const name = e.target.newTagName.value;
    e.target.newTagName.value = '';
    axios.post(`/api/tag`, {name: name})
    .then(res => res.data)
    .then(tag => {
      axios.put(`/api/video/${this.props.routeParams.id}`, {tagAdd: tag.id})
      .then(res => res.data)
      .then(video => {
        this.setState({video})
      })
    })
  }

  handleRemoveTag(e) {
    e.preventDefault();
    const id = e.target.removeTagName.value;
    axios.put(`/api/video/${this.props.routeParams.id}`, {tagRemove: id})
    .then(res => res.data)
    .then(video => {
      this.setState({video})
    })
  }

  handleDelete(e) {
    e.preventDefault();
    axios.delete(`/api/video/${this.props.routeParams.id}`)
    .then(() => browserHistory.push('/videos'))
  }

  render() {
    const video = this.state.video;
    const playlists = this.state.playlists;
    if (video) ZiggeoApi.Embed.embed(`#video-${video.token}`,
      {
        width: 640,
        height: 480,
        responsive: false,
        video: `${video.token}`
      }
    )

    return (video) ? (
      <div className="container">
        <h2>{video.title}</h2>
        <div className='video'>
          {(video) ? <div id={`video-${video.token}`} /> : null}
        </div>
        <br/>
        <div className='video-tags'>
          <div>
            <div style={{display: 'inline-block', marginRight: '3px'}}>
              {(video.tags.length) ? 'Tags:' : 'Tags: none'}
            </div>
            {video.tags.map((tag, i) =>
              <div key={tag.id} style={{display: 'inline-block'}}>
                <Link to={`/tagged/${tag.name}`}>{tag.name}</Link>
                {(i !== (video.tags.length - 1)) ? <div style={{display: 'inline-block', marginRight: '3px'}}>,</div> : null}
              </div>
              )
            }
          </div>
        </div>
        <div className='video-playlists'>
          <div>
            <div style={{display: 'inline-block', marginRight: '3px'}}>
              {(video.playlists.length) ? 'In Playlists:' : 'In Playlists: none'}
            </div>
            {video.playlists.map((playlist, i) =>
              <div key={playlist.id} style={{display: 'inline-block'}}>
                <Link to={`/playlists/${playlist.name}`}>{playlist.name}</Link>
                {(i !== (video.playlists.length - 1)) ? <div style={{display: 'inline-block', marginRight: '3px'}}>,</div> : null}
              </div>
              )
            }
          </div>
          <div>
            <div className="col-lg-4 col-md-6 col-sm-8">
              <h5>Change Video Title:</h5>
              <form onSubmit={this.handleTitle} className="input-group input-group-sm">
                <input id='titleName' type="text" className="form-control"/>
                <div className="input-group-btn">
                  <button type="button" className="btn btn-primary">Change Title</button>
                </div>
              </form>
              <h5>Add to Existing Playlist:</h5>
              <form onSubmit={this.handleAddToPlaylist} className="input-group input-group-sm">
                <select id='playlistName' className="custom-select">
                  {playlists && playlists.map(playlist => <option key={playlist.id} value={playlist.id}>{playlist.name}</option>)}
                </select>
                <div className="input-group-btn">
                  <button type="button" className="btn btn-primary">Add</button>
                </div>
              </form>
              <h5>Add to New Playlist:</h5>
              <form onSubmit={this.handleAddToNewPlaylist} className="input-group input-group-sm">
                <input id='newPlaylistName' type="text" className="form-control"/>
                <div className="input-group-btn">
                  <button type="button" className="btn btn-primary">Add</button>
                </div>
              </form>
              <h5>Remove from Playlist:</h5>
              <form onSubmit={this.handleRemoveFromPlaylist} className="input-group input-group-sm">
                <select id='removePlaylistName' className="custom-select">
                  {video && video.playlists.map(playlist => <option key={playlist.id} value={playlist.id}>{playlist.name}</option>)}
                </select>
                <div className="input-group-btn">
                  <button type="button" className="btn btn-warning">Remove</button>
                </div>
              </form>
              <h5>Add Tag:</h5>
              <form onSubmit={this.handleAddTag} className="input-group input-group-sm">
                <input id='newTagName' type="text" className="form-control"/>
                <div className="input-group-btn">
                  <button type="button" className="btn btn-primary">Add</button>
                </div>
              </form>
              <h5>Remove Tag:</h5>
              <form onSubmit={this.handleRemoveTag} className="input-group input-group-sm">
                <select id='removeTagName' className="custom-select">
                  {video && video.tags.map(tag => <option key={tag.id} value={tag.id}>{tag.name}</option>)}
                </select>
                <div className="input-group-btn">
                  <button type="button" className="btn btn-warning">Remove</button>
                </div>
              </form>
              <h5>Delete Video:</h5>
              <form onSubmit={this.handleDelete} className="input-group input-group-sm">
                <button type="button" className="btn btn-danger">Delete</button>
              </form>
            </div>
          </div>
        </div>

      </div>
    )
    : <div/>
  }
}


export default connect()(SingleVideo);
