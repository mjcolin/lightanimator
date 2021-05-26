import Frame from './Frame'
import {useState} from 'react'

function Preview(props){
    const [currentFrame, setCurrentFrame] =useState(props.frames[0].pixels);
    const [previewID, setPreviewID] =useState(0);

    
    function startPreviewAnimation(){
        
        var frameNumber = 0;

        clearInterval(previewID)
        let aPreviewID = setInterval(tick, 100);
        setPreviewID(aPreviewID);

        function tick(){
           
            //const newFrameNumber = currentFrameNum+1;
            //setCurrentFrameNum(currentFrameNum+1);
            
           // console.log('tick called for frame: '+frameNumber);
            if (frameNumber >= props.frames.length){
                //console.log('interval should be canceld')
                frameNumber = 0;
            }
            else{
               // console.log('updating frame')
                
                setCurrentFrame(props.frames[frameNumber].pixels);
                frameNumber++;
            }
        }

    }

    function stopPreviewAnimation(){
        console.log('animation should stop of id: '+previewID)
        clearInterval(previewID);
    }


    return(
        <div>
         <Frame pixels={currentFrame} />
         <button onClick={startPreviewAnimation}>Play</button>
         <button onClick={stopPreviewAnimation}>Stop</button>
        </div>
    );
}

export default Preview;