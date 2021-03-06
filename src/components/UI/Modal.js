import classes from './Modal.module.css'
import Button from './Button.js'
function Modal(props){

    let body = props.children;
    
    if(props.hasClass === false){
        body = <div style={{color: 'white', padding: '10px'}}>
                {props.children}
            </div>
    }

    return(
        <div>
            <div className={classes.overlay} onClick={props.close}></div>
            <div className={classes.modal}>
                <div className={classes.header}>
                    <h2>{props.title}</h2>
                    <div className={classes.closebutton}>
                        <Button onClick={props.close} backColor="red">x</Button>
                    </div>
                </div>
               {body}
                
            </div>  
        </div>
    )

}

export default Modal;