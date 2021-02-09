import React, {useContext, useRef, useState, useEffect} from 'react';
import CanvasDraw from 'react-canvas-draw';
import { SketchPicker } from 'react-color';
import { FirebaseContext } from '../Firebase';

const percentToHex = (p) => {
  const intValue = Math.round(p / 100 * 255); // map percent to nearest integer (0 - 255)
  const hexValue = intValue.toString(16); // get hexadecimal representation
  return hexValue.padStart(2, '0').toUpperCase(); // format with leading 0 and upper case characters
}

export const DrawingComponent = (props) => {
  const [color, setColor] = useState("#000000");
  const [drawColor, setDrawColor] = useState("#000000");
  const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());

  const refCanvas = useRef(null);
  const firebase = useContext(FirebaseContext);

  function getWindowDimensions() {
    let { innerWidth: width, innerHeight: height } = window;
    console.log(width);
    const correctedWidth = width >= 533 ? width = 400 : width = width * 0.75;
    console.log(correctedWidth);
    return {
      width: correctedWidth,
      height
    };
  }

  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  const handleChangeComplete = (color) => {
    const alpha = parseFloat(color.rgb.a) * 100;
    const alphaInHex = percentToHex(alpha);
    setColor(color.rgb);
    setDrawColor(color.hex + alphaInHex);
  };

  const handleSaveData = () => {
    // Runtataan tätä kautta, meneee varmasti oikeeks stringiks nyt nopeesti.
    // Katotaan onko tallennettu mitään.
    if (JSON.parse(refCanvas.current.getSaveData()).lines.length > 0) {
      localStorage.setItem(
        "savedDrawing",
        refCanvas.current.getSaveData()
      );
      // : TYPES.ImageObject string, number, boolean
  
      const image = {
        image: localStorage.getItem("savedDrawing"),
        points: 0,
        reported: false,
      }
      
      //firebase.addImage(localStorage.getItem("savedDrawing"));
      firebase.addImageObject(image);
      refCanvas.current.clear();
    } else {
      console.log("ei piirrustusta");
    }

  }
  
  return(
    <div className="drawingComponent">
      <div className="drawableCanvas">
        <CanvasDraw ref={refCanvas} canvasWidth={windowDimensions.width} canvasHeight={windowDimensions.width} brushColor={drawColor} catenaryColor={drawColor} {...props}/>
      </div>
      <div className="toolbar">
        <div className="tool">
          <button onClick={() => refCanvas.current.undo()}>Kumoa</button>
        </div>
        <div className="tool center">
          <SketchPicker
            width={windowDimensions.width * 0.5}
            color={color}
            onChange={handleChangeComplete}        
            />
        </div>
        <div className="tool">
          <button onClick={() => handleSaveData()}>Tallenna</button>
        </div>
      </div>
      
    </div>
  )
}