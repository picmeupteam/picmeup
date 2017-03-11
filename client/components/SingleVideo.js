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

    return (video) ? (
      <div>
        <h3>{video.title}</h3>
        <div className='video'>
          *****this should be the actual video*****
        </div>
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
            <div>
              Change Video Title:
              <form onSubmit={this.handleTitle}>
                <input id='titleName'/>
                <button>Change Title</button>
              </form>
              Add to Existing Playlist:
              <form onSubmit={this.handleAddToPlaylist}>
                <select id='playlistName'>
                  {playlists && playlists.map(playlist => <option key={playlist.id} value={playlist.id}>{playlist.name}</option>)}
                </select>
                <button>Add</button>
              </form>
              Add to New Playlist:
              <form onSubmit={this.handleAddToNewPlaylist}>
                <input id='newPlaylistName'/>
                <button>Add</button>
              </form>
              Remove from Playlist:
              <form onSubmit={this.handleRemoveFromPlaylist}>
                <select id='removePlaylistName'>
                  {video && video.playlists.map(playlist => <option key={playlist.id} value={playlist.id}>{playlist.name}</option>)}
                </select>
                <button>Remove</button>
              </form>
              Add Tag:
              <form onSubmit={this.handleAddTag}>
                <input id='newTagName'/>
                <button>Add</button>
              </form>
              Remove Tag:
              <form onSubmit={this.handleRemoveTag}>
                <select id='removeTagName'>
                  {video && video.tags.map(tag => <option key={tag.id} value={tag.id}>{tag.name}</option>)}
                </select>
                <button>Remove</button>
              </form>
              Delete Video:
              <form onSubmit={this.handleDelete}>
                <button>Delete</button>
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
