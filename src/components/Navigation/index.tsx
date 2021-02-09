import React, { useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';

import { ROUTES } from '../../constants/';
import { FirebaseContext } from '../Firebase';
import { LinkContainer } from './LinkContainer';

const Navigation = () => {
  const firebase = useContext(FirebaseContext);
  const history = useHistory();

  return(
    <div className="header">
        <Link className="header-link" to={ROUTES.HOME}>://itjonne</Link>
        <LinkContainer />
    </div>
  )
};

export default Navigation;