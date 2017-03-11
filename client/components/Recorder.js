import React, { Component } from 'react';
import axios from 'axios';
import {browserHistory} from 'react-router';


class Recorder extends Component {
    constructor() {
        super();

        this.state = {
            recorded: false,
            videoToken: '',
            videoTitle: '',
            videoTags: ''
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
            browserHistory.push('/videos');
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
                                    />
                                COMMA SEPARATED TAGS:
                                    <input
                                        type="text"
                                        onChange={this.handleChange('videoTags')}
                                    />
                            </label>
                            <input type="submit" value="Submit" />
                        </form>
                    </div>
                }
            </div>
        );
    }
}

export default Recorder;
