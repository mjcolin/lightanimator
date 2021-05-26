
import './App.css';
import React, { useState } from 'react';
import initialValues from './initialValues'

import Frame from './components/Frame'
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

const theFrames = timeline.map((aFrame, index)=>
  <Frame pixels = {aFrame.pixels} frame={index} onClick={setPixelForFrame} key={index} />
);


  return (
    <div className="App">
      Frame should be here
      <div className="timeline">
      {theFrames}
      </div>
    </div>
  );
}

export default App;
