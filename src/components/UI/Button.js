import classes from "./Button.module.css";


function Button(props){
    const theClass = classes.smallRoundButton;


   return( <button onClick={props.onClick} className={theClass} style={{backgroundColor: props.backColor}}>
        {props.children}
    </button>);

}

export default Button;