import classes from './Frame.module.css'
import Button from './UI/Button.js'

function Frame(props){
    const pixelWidth = 20;
    const numberOfPixes = props.pixels.length;
    const pixelGap = 4;
    const buttonWidth = 30;
    const frameNumberWidth = 20;

    const calculatedFramwWidth = frameNumberWidth+(pixelWidth+pixelGap)*numberOfPixes+buttonWidth;

    let thePixels = null;
    let deleteButton = null;
    let frameNumber = null;
    let theStyle = {};

    if(props.onClick != null){
         thePixels = props.pixels.map((pixel, index)=>
        <div className={classes.pixel} 
        style={{backgroundColor: pixel.hue, opacity: pixel.opacity+'%', width: pixelWidth, height: pixelWidth, gridTemplateColumns: 'repeat(auto-fit, pixelWidth)'}} 
        key={pixel.hue+index}
        onClick={()=>props.onClick(props.frame,index, (pixel.hue === 'yellow') ? 'black' : 'yellow', 100)}
        ></div>
         );

          deleteButton = <Button onClick={()=>props.deleteFrame(props.frame)} backColor="#B22222">-</Button>
          frameNumber = props.frame +1;
          theStyle = {width: calculatedFramwWidth, columnGap:pixelGap, cursor:'pointer'};
    }
    else{
        //no click handler
        thePixels = props.pixels.map((pixel, index)=>
        <div className={classes.pixel} 
        style={{backgroundColor: pixel.hue, opacity: pixel.opacity+'%',width: pixelWidth, height: pixelWidth}} 
        key={pixel.hue+index}></div>
         );
         theStyle = {width: (pixelWidth+pixelGap)*numberOfPixes, columnGap:pixelGap};
    }

    return(
            <div className={classes.frame} style={theStyle}>
                {frameNumber}
                {thePixels}
                {deleteButton}
            </div>
    )
}

export default Frame;