import classes from "./CodeCreator.module.css";
import Container from "./UI/Container"
import {useState} from 'react'

function CodeCreator(props){
    const [arduinoCode, setArduinoCode] = useState("This is Where the Code Will Go");
    const [textAreaRows, setTextAreaRows] = useState(20);
    
    function generateCode(){
        //pre: takes led animation
        //pre: outputs arduino code using FASTLED Library 
        const frameArrayCode = generateArray(false);
        const currentFrameCode = "\nint currentFrameNumber = 0;"
        const loopCode = generateLoopCode();

        const fullCode = frameArrayCode+currentFrameCode+loopCode;
        setArduinoCode(fullCode);
        setTextAreaRows(fullCode.match(/[^\n]*\n[^\n]*/gi).length);//need to check number of lines

    }
    
    function generateLoopCode(){
        let newCode = "\n\nvoid newPattern(){\n"; //open function

        newCode = newCode.concat("//This function runs in the loop and displays one frame\n\n")
        newCode = newCode.concat(`\tfor(int i=0;i<${props.frames[0].pixels.length};i++){\n`); //open for loop
        const ledCode = 
        `\t\tif(frames[currentFrameNumber][i] == "on"){
        \t\tleds[i]=CRGB::White;//set Led to  white on
        \t}
        \telse if(frames[currentFrameNumber][i] == "off"){
            \t\tleds[i]=CRGB::Black; //set Led to black off
            \t}\n`
        
        newCode = newCode.concat(ledCode);

        newCode = newCode.concat('\t}\n');//close for loop
        //add delay
        newCode = newCode.concat(`\tdelay(100);//This is the default delay and not from preview`);
        newCode = newCode.concat('\tcurrentFrameNumber++;\n');


        newCode=newCode.concat("\n}");//closing function bracket

        return newCode;
    }

    function generateArray(withOpacity){
        const newCode = "";
        let tempArduinoCode = newCode;
        const frames = props.frames;
        //Create frames as arduino code array
        let arrayOfFramesArduinoCode = 
        `//The following variable frames stores all the frames for the led animation in an array \n \nString frames[${props.frames.length}][${props.frames[0].pixels.length}]={`;
        for(let i=0;i<frames.length;i++){
            const currentFrame = frames[i];
            //console.log('the current frame pixels is '+currentFrame.pixels);

            let currentFrameArduinoCode ="{"
            for(let p=0;p<currentFrame.pixels.length;p++){
                const endingString = p=== currentFrame.pixels.length-1 ? "\"" : "\",";
                const pixelHue = currentFrame.pixels[p].hue === "yellow" ? "on" : "off"; //for now just on and off
                const pixelOpacity = withOpacity === false ? "" : currentFrame.pixels[p].opacity;

                currentFrameArduinoCode= currentFrameArduinoCode+"\""+pixelHue+","+pixelOpacity+endingString;
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


    return (
        <Container backgoundColor="cyan">
        <div className={classes.CodeCreator}>
            <div className={classes.controls}>
                <button onClick={generateCode}>Generate Code</button>
                <p>Below is the code you will copy into the arduino platform</p>
            </div>
            <div className={classes.code}>
                <textarea readOnly value={arduinoCode} rows={textAreaRows} style={{width:'100%', height: '100%'}}>
                    {arduinoCode}
                </textarea>
            </div>
        </div>
        </Container>
    );

}

export default CodeCreator;