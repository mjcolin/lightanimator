import Frame from './Frame.js'
import Container from './UI/Container.js'
import {useState} from 'react'
import classes from './Preview.module.css';
import Button from './UI/Button.js'
import useInterval from './CustomHooks/useInterval.js'

function Preview(props){
    const [currentFrame, setCurrentFrame] =useState(props.frames[0].pixels);
    const [playing, setPlaying] = useState(false);
    const [currentFrameNumber, setCurrentFrameNumber] = useState(0);
    
    const frameRate = props.frameRate;

    useInterval(tick, frameRate);//creates a tick for the frame rate

    function setFrameRate(aValue){
        props.updateFrameRate(aValue);
    }
    
    function startPreviewAnimation(){
        setPlaying(true);
        setCurrentFrameNumber(0);
    }

    function tick(){
        //This method animates preivew and is called at the framerate
        if(playing){
            const frames = props.frames;
            const frameNumber = currentFrameNumber;
            if (frameNumber >= frames.length){
                setCurrentFrameNumber(0);
            }
            else{
                if(frames[frameNumber] != null){
                    setCurrentFrame(frames[frameNumber].pixels);
                    setCurrentFrameNumber(frameNumber+1);
                }
            }
        }
    }


    function stopPreviewAnimation(){
        setPlaying(false);
    }

    function updateFrameRate(e){
        const framesPerSecond = e.target.value;
        //convert to milliseconds delay
        setFrameRate(1000/framesPerSecond);
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
            <Button onClick={startPreviewAnimation} 
                backColor={playing === true ? 'grey':''}>Play</Button>
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