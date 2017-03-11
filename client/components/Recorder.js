import React, { Component } from 'react';

class Recorder extends Component {
    constructor() {
        super();
        this.state = {
            videoToken: '',
            recorded: false
        };
    }

    // componentDidMount() {
    //     // When the component is mounted, grab a reference and add a DOM listener;
    //     ZiggeoApi.Events.on("submitted", function(data) {
    //         this.videoToken = data.video.token,
    //         this.setState({recorded: true});
    //     })
    // }

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
                        { ZiggeoApi.Videos.get(this.videoToken) }
                    </div>
                }
            </div>
        );
    }
}

export default Recorder;