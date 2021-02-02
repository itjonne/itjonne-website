import React from 'react';
import { DrawingComponent } from './DrawingComponent';

import { Gallery } from './Gallery.js';

const Home = () => {
  return(
    <div className="home">
      <h1 className="center">Tervetuloa!</h1>
      <Gallery />
      <DrawingComponent lazyRadius={0} hideGrid={true} brushRadius={5} />
    </div>
  )
};

export default Home;