
import './App.css';
import React, { useState } from 'react';
import initialValues from './initialValues'

import TimeLine from './components/TimeLine'
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



  return (
    <div className="App">
      Frame should be here
     <TimeLine timeline={timeline} onClick={setPixelForFrame} />
    </div>
  );
}

export default App;
