import React, { useEffect, useRef, useState } from 'react';

import CanvasDraw from 'react-canvas-draw';

export const Canvas = (props) => {
  const thisCanvas = useRef(null);

  useEffect(() => {
    console.log("useeffect Canvas");
    thisCanvas.current.loadSaveData(props.data);
  },[])

  const handleMouseEnter = (event) => {
    thisCanvas.current.clear();
    thisCanvas.current.loadSaveData(props.data)
  }

  const randomInteger = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  console.log("rendering")
  return(
    <div className="canvas" onClick={(event) => handleMouseEnter()}>
      <CanvasDraw ref={thisCanvas} {...props} loadTimeOffset={randomInteger(10,50)}/>
    </div>

  )
}