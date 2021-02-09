import React, {useContext, useEffect, useState} from 'react';
import { FirebaseContext } from '../Firebase';

import { Canvas } from './Canvas';

export const Gallery = () => {
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const firebase = useContext(FirebaseContext);

  useEffect(() => {
    const imagesRef = firebase.getImages();
    if (firebase.getLoggedUser()) {
      const unsubscribe = imagesRef.on("value", (snapshot) => {
        const data = snapshot.val();
        if (data) {
          const keys = Object.keys(data);
          const found = [];
          for (let key of keys) {
            found.push({id: key, ...data[key]});
          }
          setImages(found);
          setIsLoading(false);
        } else {
          setImages([]);
          setIsLoading(false);
        }
      })
      return () => unsubscribe;
    }
  }, [firebase]);

  return(
    <div className="gallery">
      {isLoading && <div className="loading"><p>Ootappa hetki, galleria latautuu...</p></div>}
      {
      images 
      ? images.map((image, i) => {
        return <Canvas key={i} data={image} canvasHeight={200} canvasWidth={200} disabled={true} />
        })
      : <h1 className="center">Piirräpä kuva ni päästään alkuun!</h1>
      }
    </div>
  )
}