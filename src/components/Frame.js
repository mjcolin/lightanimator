import classes from './Frame.module.css'

function Frame(props){

    const pixels = props.pixels.map((pixel)=>
        <div class={classes.pixel} style={{backgroundColor: pixel.hue, opacity: pixel.opacity}}>

        </div>
    );

    return(
        <div class={classes.frame}>

        </div>
    );
}