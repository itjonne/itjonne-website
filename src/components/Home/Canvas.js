import React, { useContext, useEffect, useRef } from 'react';
import CanvasDraw from 'react-canvas-draw';
import { FirebaseContext } from '../Firebase';

import { CanvasTools } from './CanvasTools';

export const Canvas = (props) => {
  const data = props.data;
  const thisCanvas = useRef(null);
  const firebase = useContext(FirebaseContext);

  useEffect(() => {
    thisCanvas.current.loadSaveData(data.image);
  },[data.image])

  const randomInteger = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  // ============== HANDLERS ==================

  const handleMouseEnter = (event) => {
    thisCanvas.current.clear();
    thisCanvas.current.loadSaveData(data.image)
  }

  const handlePlus = () => {
    firebase.updateImagePoints(data.id, data.points += 1);
  }

  const handleMinus = () => {
    firebase.updateImagePoints(data.id, data.points -= 1);
  }

  const handleReport = () => {
    firebase.deleteImage(data.id);
  }


  return(
    <div>
    <div className="canvas" onClick={(event) => handleMouseEnter()}>
      <CanvasDraw ref={thisCanvas} {...props} loadTimeOffset={randomInteger(10,50)}/>
    </div>
      <CanvasTools points={data.points} handlePlus={handlePlus} handleMinus={handleMinus} handleReport={handleReport} />
    </div>
  )
}