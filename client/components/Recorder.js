import React, { Component } from 'react';

class Recorder extends Component {
    // constructor() {
    //     super();
    //     this.state = {
    //         videoToken: '',
    //         recorded: false
    //     };
    // }

    // componentDidMount() {
    //     // When the component is mounted, grab a reference and add a DOM listener;
    //     ZiggeoApi.Events.on("submitted", function(data) {
    //         this.videoToken = data.video.token,
    //         this.setState({recorded: true});
    //     })
    // }

    render() {
        return (
           <div>hi</div>
        );
    }
}

export default Recorder;

 // {!recorded &&
 //                <div>
 //                    <ziggeo></ziggeo>
 //                </div>
 //            }
 //            {recorded &&
 //                <div>
 //                    { ZiggeoApi.Videos.get(this.videoToken) }
 //                </div>
 //            }