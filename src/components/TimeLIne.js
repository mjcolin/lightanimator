import Frame from './Frame'

function TimeLine(props){
    const theFrames = props.timeline.map((aFrame, index)=>
    <Frame pixels = {aFrame.pixels} frame={index} onClick={props.onClick} key={index} />
    );
  





    return (
        <div className="timeline">
         {theFrames}
        </div>

    );
}

export default TimeLine;