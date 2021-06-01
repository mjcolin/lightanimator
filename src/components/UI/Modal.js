import classes from './Modal.module.css'
import Button from './Button.js'
function Modal(props){


    return(
        <div>
            <div className={classes.overlay} onClick={props.onClick}></div>
            <div className={classes.modal}>
                {props.children}
                <Button onClick={props.onClick}>Close</Button>
            </div>
            
        </div>
    )

}

export default Modal;