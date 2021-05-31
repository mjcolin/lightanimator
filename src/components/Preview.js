import Frame from './Frame.js'
import Container from './UI/Container.js'
import {useState} from 'react'

function Preview(props){
    const [currentFrame, setCurrentFrame] =useState(props.frames[0].pixels);
    const [previewID, setPreviewID] =useState(0);
    const [frameRate, setFrameRate] =useState(100);
    
    function startPreviewAnimation(){
        
        var frameNumber = 0;

        clearInterval(previewID)
        let aPreviewID = setInterval(tick, frameRate);
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
                if(props.frames[frameNumber] != null){
                    setCurrentFrame(props.frames[frameNumber].pixels);
                    frameNumber++;
                }
            }
        }

    }

    function stopPreviewAnimation(){
        console.log('animation should stop of id: '+previewID)
        clearInterval(previewID);
    }

    function updateFrameRate(e){
        console.log(e.target.value);
        setFrameRate(e.target.value);
        stopPreviewAnimation();
    }


    return(
        <Container>
         <h2>Preview</h2>
         <Frame pixels={currentFrame} />

         <button onClick={startPreviewAnimation}>Play</button>
         <button onClick={stopPreviewAnimation}>Stop</button>
         <input type="text" id="frameRate" value={frameRate} onChange={updateFrameRate}></input>
        </Container>
    );
}

export default Preview;