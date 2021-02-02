import React, {useContext, useEffect, useRef, useState} from 'react';
import CanvasDraw from 'react-canvas-draw';
import { FirebaseContext } from '../Firebase';

import { Canvas } from './Canvas';

export const Gallery = () => {
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [refs, setRefs] = useState([]);

  const firebase = useContext(FirebaseContext);

  useEffect(() => {
    console.log("Getting images")
    const imagesRef = firebase.getImages();
    imagesRef.on("value", (snapshot) => {
      const data = snapshot.val();
      const keys = Object.keys(data);
      const found = [];
      for (let key of keys) {
        found.push(data[key]);
      }
      setImages(found);
      setIsLoading(false);
    })
  }, []);

  const thisCanvas = useRef(null);
  // Loaditems, setListener.

  console.log(images);

  return(
    <div className="gallery">
      {isLoading && <div className="loading"><p>Gallery loading...</p></div>
        }
      {images && images.map((image, i) => {
        return <Canvas key={i} data={image} canvasHeight={200} canvasWidth={200} disabled={true} />
      })}
    </div>
  )
}