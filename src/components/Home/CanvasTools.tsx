import React, { useState } from 'react';

import { AiOutlineArrowUp, AiOutlineArrowDown } from "react-icons/ai";
import { MdReport } from "react-icons/md";

interface CanvasToolProps {
  points: number,
  handlePlus: () => void,
  handleMinus: () => void,
  handleReport: () => void,
}

export const CanvasTools = ({points, handlePlus, handleMinus, handleReport}: CanvasToolProps) => {
  const [thispoints, setPoints] = useState(points);

  const _handlePlus = () => {
    setPoints(thispoints + 1);
    handlePlus();
  }

  const _handleMinus = () => {
    setPoints(thispoints - 1);
    handleMinus();
  }
  return(
    <div className="tools">
      <div>
        {points >= 0 ? <p className="green">+{points}</p> : <p className="red">{points}</p>}
      </div>
      <div className="tool-container">
        <div className="gallerytool green" onClick={_handlePlus}>
          <AiOutlineArrowUp />
        </div>
        <div className="gallerytool red" onClick={_handleMinus}>
          <AiOutlineArrowDown />
        </div>
        <div className="gallerytool" onClick={handleReport}>
          <MdReport />
        </div>  
      </div>
    </div>  
  )
}