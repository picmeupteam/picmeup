import React, { Component } from 'react';

class Recorder extends Component {
    constructor() {
        super();

        this.state = {
            recorded: true,
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
        console.log('submit was submitted! hahaha', this.state);
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
            <div>
                {!this.state.recorded &&
                    <div>
                         <ziggeo></ziggeo>
                    </div>
                }
                {this.state.recorded &&
                    <div>
                        <form onSubmit={this.handleSubmit}>
                            <label>
                                Affirmation Video Title:
                                    <input
                                        type="text"
                                        onChange={this.handleChange('videoTitle')}
                                    />
                                Affirmation Video Tags:
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