import classes from "./CodeCreator.module.css";
import Container from "./UI/Container.js"
import Button from "./UI/Button.js"
import Modal from './UI/Modal.js'

import {useRef, useState} from 'react'

function CodeCreator(props){
    const [arduinoCode, setArduinoCode] = useState("This is Where the Code Will Go");
    const [textAreaRows, setTextAreaRows] = useState(20);
    const [showExpandedCode, setExpandedCode] = useState(false);
    const textAreaRef = useRef(null);


    function generateCode(){
        //pre: takes led animation
        //pre: outputs arduino code using FASTLED Library 
        const boolConstants = "#define ON true\n#define OFF false\n"
        const frameArrayCode = generateArray(false);
        const currentFrameCode = "\nint currentFrameNumber = 0;"
        const loopCode = generateLoopCode();

        const fullCode = boolConstants+frameArrayCode+currentFrameCode+loopCode;
        setArduinoCode(fullCode);
        setTextAreaRows(fullCode.match(/[^\n]*\n[^\n]*/gi).length);//need to check number of lines

    }
    
    function generateLoopCode(){
        let newCode = "\n\nvoid newPattern(){\n"; //open function
        const numberOfColumns = props.frames[0].pixels.length;
        newCode = newCode.concat("//This function needs to run in main loop and displays one frame at a time\n\n")
        newCode = newCode.concat(`\tfor(int i=0;i<${numberOfColumns};i++){\n`); //open for loop
        const ledCode = 
        `\t\tif(frames[currentFrameNumber][${numberOfColumns-1}-i] == true){
        \t\tleds[i]=CRGB::White;//set Led to  white on
        \t}
        \telse if(frames[currentFrameNumber][${numberOfColumns-1}-i] == false){
            \t\tleds[i]=CRGB::Black; //set Led to black off
            \t}\n`
        
        newCode = newCode.concat(ledCode);

        newCode = newCode.concat('\t}\n');//close for loop
        //add threadded item to change currentFrameNumber by framerate

        newCode = newCode.concat(`\tEVERY_N_MILLISECONDS(${props.frameRate}){
                currentFrameNumber=(currentFrameNumber+1)%${props.frames.length};
        }`)
       // newCode = newCode.concat(`\tdelay(${props.frameRate});`);
        //newCode = newCode.concat(`\n\tcurrentFrameNumber=(currentFrameNumber+1)%${props.frames.length};\n`);


        newCode=newCode.concat("\n}");//closing function bracket

        return newCode;
    }

    function generateArray(withOpacity){
        const newCode = "";
        let tempArduinoCode = newCode;
        const frames = props.frames;
        //Create frames as arduino code array
        let arrayOfFramesArduinoCode = 
        `//frames for the led animation in an array\nbool frames[${props.frames.length}][${props.frames[0].pixels.length}]={`;
        for(let i=0;i<frames.length;i++){
            const currentFrame = frames[i];
            //console.log('the current frame pixels is '+currentFrame.pixels);

            let currentFrameArduinoCode ="{"
            for(let p=0;p<currentFrame.pixels.length;p++){
                const endingString = p=== currentFrame.pixels.length-1 ? "" : ",";
                const pixelHue = currentFrame.pixels[p].hue === "yellow" ? "ON" : "OFF"; //for now just on and off
                const pixelOpacity = withOpacity === false ? "" : ","+currentFrame.pixels[p].opacity;

                currentFrameArduinoCode= currentFrameArduinoCode+""+pixelHue+pixelOpacity+endingString;
            }
            if(i===frames.length-1){
                currentFrameArduinoCode = currentFrameArduinoCode.concat("}");//last item no comma
            }
            else{
                currentFrameArduinoCode = currentFrameArduinoCode.concat("},");
            }
            arrayOfFramesArduinoCode=arrayOfFramesArduinoCode.concat("\n"+currentFrameArduinoCode);
        }
        tempArduinoCode=tempArduinoCode.concat("\n"+ arrayOfFramesArduinoCode+"\n};");

        return tempArduinoCode;
       
    }

    function copyCode(){
        //copy's the code to clipboard
        textAreaRef.current.select();
        document.execCommand('copy');
    }

    function expandCode(){
        //creates modal of code
        setExpandedCode(true);
    }

    function closeExpandedView(){
        setExpandedCode(false);
    }


    return (
        <Container backgoundColor="cyan">
        <div className={classes.CodeCreator}>
            <div className={classes.controls}>
                <Button onClick={generateCode}>Generate Arduino Code</Button>
                <Button onClick={copyCode}>Copy Code</Button>
                <button onClick={expandCode}>Expand Code</button>
            </div>
            <div className={classes.code}>
            <p>Below is the code you will copy into the arduino platform</p>
                <textarea readOnly value={arduinoCode} rows={textAreaRows} style={{width:'100%', height: '100%'}} ref={textAreaRef}>
                    {arduinoCode}
                </textarea>
            </div>
        </div>

        {showExpandedCode && 
            <Modal close={closeExpandedView} title="Code Generator" hasClass={true}>
             <div className={classes.modalBody}>
                <div style={{width: '200px'}}>
                    <Button onClick={copyCode}>Copy Code</Button>
                </div>
                <textarea readOnly value={arduinoCode}></textarea>
            </div>
            </Modal>}
        </Container>
    );

}

export default CodeCreator;