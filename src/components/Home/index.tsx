import React, { useContext, useEffect} from 'react';
import { useHistory } from 'react-router-dom';
import { FirebaseContext } from '../Firebase';
import { DrawingComponent } from './DrawingComponent';

import { Gallery } from './Gallery.js';
import { ROUTES } from '../../constants';

const Home = () => {
  const firebase = useContext(FirebaseContext);
  const history = useHistory();

  useEffect(() => {
    if (!firebase?.getLoggedUser()) {
      history.push(ROUTES.SIGN_IN); 
    }
  },[firebase, history]);

  return(
    <div className="home">
      <h1 className="center">Tervetuloa, piirrä tähän jotain!</h1>
      <DrawingComponent lazyRadius={0} hideGrid={true} brushRadius={5} />
      <h1 className="center">Galleria:</h1>
      <Gallery />
      <p className="center">Klikkaamalla näkee animaation.</p>
    </div>
  )
};

export default Home;