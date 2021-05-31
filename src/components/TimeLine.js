import Frame from './Frame.js'
import classes from './TimeLine.module.css'
import Container from './UI/Container.js'

function TimeLine(props){
    const theFrames = props.timeline.map((aFrame, index)=>
    <Frame pixels = {aFrame.pixels} frame={index} onClick={props.onClick} deleteFrame={props.deleteFrame} key={index} />
    );
  

    return (
        <Container>
            <h2>Timeline</h2>
        <div className={classes.timeline}>
         {theFrames}
        </div>
        <div className={classes.addButton}>
            <button onClick={props.addButtonClick}>+</button>
        </div>
        </Container>

    );
}

export default TimeLine;
