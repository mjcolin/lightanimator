import classes from './Frame.module.css'

function Frame(props){

    let thePixels = props.pixels.map((pixel, index)=>
        <div className={classes.pixel} 
        style={{backgroundColor: pixel.hue, opacity: pixel.opacity+'%'}} 
        key={pixel.hue+index}
        onClick={()=>props.onClick(0,index, 'black', 100)}
        
        ></div>
    );


    return(
        <div className={classes.frame}>
            {thePixels}
        </div>
    );
}

export default Frame;