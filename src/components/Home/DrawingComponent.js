import React, {useContext, useRef, useState} from 'react';
import CanvasDraw from 'react-canvas-draw';
import { SketchPicker } from 'react-color';
import { FirebaseContext } from '../Firebase';

const percentToHex = (p) => {
  const percent = Math.max(0, Math.min(100, p)); // bound percent from 0 to 100
  const intValue = Math.round(p / 100 * 255); // map percent to nearest integer (0 - 255)
  const hexValue = intValue.toString(16); // get hexadecimal representation
  return hexValue.padStart(2, '0').toUpperCase(); // format with leading 0 and upper case characters
}

export const DrawingComponent = (props) => {
  const [color, setColor] = useState("#000000");
  const [drawColor, setDrawColor] = useState("#000000");

  const refCanvas = useRef(null);
  const firebase = useContext(FirebaseContext);
  
  const handleChangeComplete = (color) => {
    const alpha = parseFloat(color.rgb.a) * 100;
    const alphaInHex = percentToHex(alpha);
    setColor(color.rgb);
    setDrawColor(color.hex + alphaInHex);
  };

  const handleSaveData = () => {
    // Runtataan tätä kautta, meneee varmasti oikeeks stringiks nyt nopeesti.
    localStorage.setItem(
      "savedDrawing",
      refCanvas.current.getSaveData()
    );
    
    firebase.addImage(localStorage.getItem("savedDrawing"));
    refCanvas.current.clear();
  }

  return(
    <div className="drawingComponent">
      <div className="drawableCanvas">
        <CanvasDraw ref={refCanvas} brushColor={drawColor} catenaryColor={drawColor} {...props}/>
      </div>
      <div className="toolbar">
        <div className="tool">
          <button onClick={() => refCanvas.current.undo()}>Kumoa</button>
        </div>
        <div className="tool center">
          <SketchPicker
            color={color}
            onChange={handleChangeComplete}        
            />
        </div>
        <div className="tool">
          <button onClick={() => handleSaveData()}>Tallenna kuva!</button>
        </div>
      </div>
      
    </div>
  )
}