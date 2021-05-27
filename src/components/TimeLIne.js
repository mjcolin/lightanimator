import Frame from './Frame'
import classes from './TimeLine.module.css'

function TimeLine(props){
    const theFrames = props.timeline.map((aFrame, index)=>
    <Frame pixels = {aFrame.pixels} frame={index} onClick={props.onClick} deleteFrame={props.deleteFrame} key={index} />
    );
  

    return (
        <div>
        <div className={classes.timeline}>
         {theFrames}
        </div>
        <div className={classes.addButton}>
            <button onClick={props.addButtonClick}>+</button>
        </div>
       </div>

    );
}

export default TimeLine;