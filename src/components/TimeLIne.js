import Frame from './Frame'
import classes from './TimeLine.module.css'

function TimeLine(props){
    const theFrames = props.timeline.map((aFrame, index)=>
    <Frame pixels = {aFrame.pixels} frame={index} onClick={props.onClick} key={index} />
    );
  





    return (
        <div className={classes.timeline}>
         {theFrames}
        </div>

    );
}

export default TimeLine;