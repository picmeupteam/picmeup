import React, { Component } from 'react';

class Recorder extends Component {
    constructor() {
        super();
        this.state = {
            recorded: false,
            videoToken: ''
        };
    }


    componentDidMount() {
        // When the component is mounted, grab a reference and add a DOM listener;
        console.log("outside handler")
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
                        ZiggeoApi.Videos.get(this.state.videoToken);
                    </div>
                }
            </div>
        );
    }
}

export default Recorder;