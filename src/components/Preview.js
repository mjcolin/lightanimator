import Frame from './Frame.js'
import Container from './UI/Container.js'
import {useState} from 'react'
import classes from './Preview.module.css';
import Button from './UI/Button.js'

function Preview(props){
    const [currentFrame, setCurrentFrame] =useState(props.frames[0].pixels);
    const [previewID, setPreviewID] =useState(0);
    
    const frameRate = props.frameRate;

    function setFrameRate(aValue){
        props.updateFrameRate(aValue);
    }
    
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
        const framesPerSecond = e.target.value;

        //convert to milliseconds delay
        setFrameRate(1000/framesPerSecond);
        stopPreviewAnimation();
    }


    return(
        <Container>
         <h2>Preview</h2>
         <Frame pixels={currentFrame} />
         <Frame pixels={currentFrame} />
         <Frame pixels={currentFrame} />
         <Frame pixels={currentFrame} />
         <Frame pixels={currentFrame} />
         <Frame pixels={currentFrame} />
         <Frame pixels={currentFrame} />
         <Frame pixels={currentFrame} />
         <Frame pixels={currentFrame} />
         <Frame pixels={currentFrame} />
         <Frame pixels={currentFrame} />
         <div className={classes.controls}>
            <Button onClick={startPreviewAnimation}>Play</Button>
            <Button onClick={stopPreviewAnimation} backColor="red">Stop</Button>
            <div className={classes.controlItem}>
                <label>Frames Per a Second</label>
                <input type="number" id="frameRate" value={1000/frameRate} onChange={updateFrameRate}></input>
            </div>
         </div>
        </Container>
    );
}

export default Preview;