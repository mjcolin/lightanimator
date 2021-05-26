export function createBlankFrame(cols){
  let theInitialArray = new Array(cols);

  for(let i=0; i< cols ;i++){
    theInitialArray[i]= {hue: 'black', opacity: 100};
  }

  return theInitialArray;
}


const initValues = 
    [
        {
          pixels: createBlankFrame(23)
        },
        {
          pixels: createBlankFrame(23)
        }
    ]
  

  export default initValues;