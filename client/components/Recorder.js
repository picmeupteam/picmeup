import React, { Component } from 'react';

class Recorder extends Component {
    constructor() {
        super();
        this.state = {
            videoToken: '',
            recorded: false
        };
        this.recorded = this.saveRecording.bind(this);
    }
    saveRecording() {
        ZiggeoApi.Events.on("submitted", function(data) {
            this.videoToken = data.video.token,
            this.setState({recorded: true});
        })
    }
    render() {
        return (
            {!recorded &&
                <div>
                    <ziggeo></ziggeo>
                </div>
            }
            {recorded &&
                <div>
                    { ZiggeoApi.Videos.get(this.videoToken) }
                </div>
            }
        );
    }
}
export default Recorder;