import React, { useContext } from 'react';
import { Link } from 'react-router-dom';

import { ROUTES } from '../../constants/';
import { FirebaseContext } from '../Firebase';

const Navigation = () => {
  const firebase = useContext(FirebaseContext);

  const handleSignOut = (event: React.MouseEvent<HTMLButtonElement>) => {
      firebase?.signOut();
  } 

  console.log("rendering navigation")
  return(
    <div className="header">
        <Link className="header-link" to={ROUTES.HOME}>://itjonne</Link>
        {firebase && firebase.getLoggedUser() && <button onClick={handleSignOut}>Kirjaudu ulos</button> }
    </div>
  )
};

export default Navigation;