import React, { useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';

import { ROUTES } from '../../constants/';
import { FirebaseContext } from '../Firebase';

const Navigation = () => {
  const firebase = useContext(FirebaseContext);
  const history = useHistory();

  const handleSignOut = (event: React.MouseEvent<HTMLButtonElement>) => {
      firebase?.signOut();
      history.push(ROUTES.SIGN_IN);
  } 

  return(
    <div className="header">
        <Link className="header-link" to={ROUTES.HOME}>://itjonne</Link>
        <button onClick={handleSignOut}>Kirjaudu ulos</button>
    </div>
  )
};

export default Navigation;