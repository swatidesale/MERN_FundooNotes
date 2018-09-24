import React, { Component } from 'react';
import PinNotes from './actions/PinedNotes';
import OtherNotes from './actions/OtherNotes';
 
class DisplayNotes extends Component {
    render() {
        // var otherCount = localStorage.getItem("otherNotesCount");
        // var pinnedCount = localStorage.getItem("pinnedNotesCount");
        return(
            <div>
                <div>
                    <div style={{width:240,marginLeft: 400,marginTop: 35,opacity:0.5,fontWeight:'bold',fontSize:15}}>
                        Pinned 
                        {/* {pinnedCount} */}
                    </div>
                    <PinNotes />
                </div>

                <div>
                    <div style={{width:240,marginLeft: 400,marginTop:160,opacity:0.5,fontWeight:'bold',fontSize:15}}>
                        Others 
                        {/* {otherCount} */}
                    </div>
                    <OtherNotes />
                </div>
            </div>
        );
    }
}

export default DisplayNotes;