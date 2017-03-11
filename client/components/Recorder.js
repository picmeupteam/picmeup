import React, { Component } from 'react';

class Recorder extends Component {
    constructor() {
        super();
        this.state = {
            videoToken: '',
            recorded: false
        };
    }


    componentDidMount() {
        // When the component is mounted, grab a reference and add a DOM listener;
        console.log("outside handler")
        const self = this;
        ZiggeoApi.Events.on("submitted", function(data) {
            console.log("inside");
            self.videoToken = data.video.token,
            self.setState({recorded: true});
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
                        
                    </div>
                }
            </div>
        );
    }
}

export default Recorder;