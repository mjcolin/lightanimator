
import './App.css';
import React, { useState } from 'react';
import initialValues from './initialValues.js';
import {createBlankFrame} from './initialValues.js';

import TimeLine from './components/TimeLine.js'
import Preview from './components/Preview.js'
import CodeCreator from './components/CodeCreator.js'
import Button from './components/UI/Button.js'
import Modal from './components/UI/Modal.js'

function App() {

  const [timeline, setTimeline] = useState(initialValues);
  const [frameRate, setFrameRate] =useState(100);
  const [showHelp, setShowHelp] =useState(false);


function setPixelForFrame(frameNumber, pixelNumber, hue, opacity){
    const newTimeline = timeline.slice();

    if(frameNumber >= 0 && frameNumber < newTimeline.length){
      newTimeline[frameNumber].pixels[pixelNumber].hue = hue;
      newTimeline[frameNumber].pixels[pixelNumber].opacity = opacity;
    }

  
    setTimeline(newTimeline);
}

function addFrame(){
  const newTimeline = timeline.slice();
  const blankPixels = createBlankFrame(23);

  newTimeline.push({pixels: blankPixels});

  setTimeline(newTimeline);

}

function deleteFrame(frameNumber){
  const newTimeline = timeline.slice();
  newTimeline.splice(frameNumber,1);

  setTimeline(newTimeline);
}

function updateFrameRate(aFrameRate){
  setFrameRate(aFrameRate);
}

function showHelpModal(){
  setShowHelp(true);
}
function hideHelpModal(){
  setShowHelp(false);
}


  return (
    <div className="App">
      <div className="helpButton"><Button onClick={showHelpModal} backColor="grey">?</Button></div>

      <div className="bottomSection">
        <Preview frames = {timeline} frameRate={frameRate} updateFrameRate={updateFrameRate}/>
        
      </div>
      <div className="topSection">
      <TimeLine timeline={timeline} onClick={setPixelForFrame} addButtonClick={addFrame} deleteFrame={deleteFrame}/>
      <CodeCreator frames = {timeline} frameRate={frameRate} />
      </div>

      {showHelp && 
            <Modal close={hideHelpModal} title="Help" hasClass={false}>
             <div>
                This app allows you to create custom animations for the dream wall. Add frames and and turn colums of lights on and off to create custom animations.
            </div>
            </Modal>}
    </div>
  );
}

export default App;
