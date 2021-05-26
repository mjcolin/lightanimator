import classes from './Frame.module.css'

function Frame(props){
    let thePixels = null;

    if(props.onClick != null){
         thePixels = props.pixels.map((pixel, index)=>
        <div className={classes.pixel} 
        style={{backgroundColor: pixel.hue, opacity: pixel.opacity+'%'}} 
        key={pixel.hue+index}
        onClick={()=>props.onClick(props.frame,index, (pixel.hue === 'yellow') ? 'black' : 'yellow', 100)}
        ></div>
         );
    }
    else{
        //no click handler
        thePixels = props.pixels.map((pixel, index)=>
        <div className={classes.pixel} 
        style={{backgroundColor: pixel.hue, opacity: pixel.opacity+'%'}} 
        key={pixel.hue+index}></div>
         );
    }


    return(
        <div>
            <div className={classes.frame}>
                {thePixels}
                <button onClick={()=>props.deleteFrame(props.frame)}>-</button>
            </div>
           
        </div>
    )
}

export default Frame;