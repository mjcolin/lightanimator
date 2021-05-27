
import './App.css';
import React, { useState } from 'react';
import initialValues from './initialValues';
import {createBlankFrame} from './initialValues';

import TimeLine from './components/TimeLine'
import Preview from './components/Preview'

function App() {

  const [timeline, setTimeline] = useState(initialValues);

function setPixelForFrame(frameNumber, pixelNumber, hue, opacity){
    const newTimeline = timeline.slice();

    if(frameNumber >= 0 && frameNumber < newTimeline.length){
      newTimeline[frameNumber].pixels[pixelNumber].hue = hue;
      newTimeline[frameNumber].pixels[pixelNumber].opacity = opacity;
    }

  
    setTimeline(newTimeline);
}

function addFrame(){
  console.log('add frame pushed');
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



  return (
    <div className="App">
      <div>
        <h2>Preview</h2>
        <Preview frames = {timeline} />
      </div>
      <h2>Timeline</h2>
     <TimeLine timeline={timeline} onClick={setPixelForFrame} addButtonClick={addFrame} deleteFrame={deleteFrame}/>
    </div>
  );
}

export default App;
