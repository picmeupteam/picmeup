import React, { Component } from 'react';
import axios from 'axios';
import {browserHistory} from 'react-router';


class ShareVideo extends Component {
    constructor() {
        super();

        this.state = {
            recorded: false,
            videoToken: '',
            videoTitle: '',
            receivingUser: ''
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(field) {
        return event => {
            const value = event.target.value;

            this.setState({
                [`${field}`]: value
            });
        }
    }

    handleSubmit(event) {
        event.preventDefault();

        // console.log('submit was submitted! hahaha', this.state);

        const vid = this.state;

        axios.post('/api/video', {
            token: vid.videoToken,
            title: vid.videoTitle,
            tags: vid.videoTags
        })
        .then(function (response) {
            browserHistory.push('/home');
        })
        .catch(function (error) {
            console.log(error);
        });

    }


    componentDidMount() {
        // Listens for video recording to finish
        const self = this;
        ZiggeoApi.Events.on("submitted", function(data) {
            self.setState({
                recorded: true,
                videoToken: data.video.token
            })
        })
    }

    render() {
        return (
            <div className='container'>
                <h3>What do you want to tell them?</h3>
                {!this.state.recorded &&
                    <div>
                         <ziggeo></ziggeo>
                    </div>
                }
                {this.state.recorded &&
                    <div>
                        <form onSubmit={this.handleSubmit}>
                            <label>
                                VIDEO TITLE:
                                    <input
                                        type="text"
                                        onChange={this.handleChange('videoTitle')}
                                    /><br/>
                                COMMA SEPARATED TAGS:
                                    <input
                                        type="text"
                                        onChange={this.handleChange('videoTags')}
                                    /><br/>
                                Username of Recipient:
                                    <input
                                        type="text"
                                        onChange={this.handleChange('receivingUser')}
                                    />
                            </label>
                            <input className="btn btn-default"type="submit" value="Submit" />
                        </form>
                    </div>
                }

            </div>
        );
    }
}

export default ShareVideo;
