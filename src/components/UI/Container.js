import classes from './Container.module.css'

function Container(props){
    let style ="";
    if (props.backgroundColor!=null){
        style = {backgroundColor: props.backgroundColor}
    }


    return (
        <div className={classes.container} style={{style}}>
            {props.children}
        </div>
    );
}

export default Container;