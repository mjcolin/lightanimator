import classes from './Frame.module.css'

function Frame(props){
    const pixelWidth = 20;
    const numberOfPixes = props.pixels.length;
    const pixelGap = 4;
    const buttonWidth = 30;
    const frameNumberWidth = 20;

    const calculatedFramwWidth = frameNumberWidth+(pixelWidth+pixelGap)*numberOfPixes+buttonWidth;

    let thePixels = null;
    let deleteButton = null;

    if(props.onClick != null){
         thePixels = props.pixels.map((pixel, index)=>
        <div className={classes.pixel} 
        style={{backgroundColor: pixel.hue, opacity: pixel.opacity+'%', width: pixelWidth, height: pixelWidth, gridTemplateColumns: 'repeat(auto-fit, pixelWidth)'}} 
        key={pixel.hue+index}
        onClick={()=>props.onClick(props.frame,index, (pixel.hue === 'yellow') ? 'black' : 'yellow', 100)}
        ></div>
         );

          deleteButton = <button onClick={()=>props.deleteFrame(props.frame)}>-</button>
    }
    else{
        //no click handler
        thePixels = props.pixels.map((pixel, index)=>
        <div className={classes.pixel} 
        style={{backgroundColor: pixel.hue, opacity: pixel.opacity+'%',width: pixelWidth, height: pixelWidth}} 
        key={pixel.hue+index}></div>
         );
    }

    return(
            <div className={classes.frame} style={{width: calculatedFramwWidth, columnGap:pixelGap}}>
                {props.frame}
                {thePixels}
                {deleteButton}
            </div>
    )
}

export default Frame;