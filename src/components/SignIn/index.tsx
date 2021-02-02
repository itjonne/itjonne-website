import React, {useContext, useState} from 'react';
import { useHistory } from 'react-router-dom';

import { FirebaseContext } from '../Firebase';
import { ROUTES } from '../../constants';

interface User {
  email: string,
  password: string,
  error: string,
}

const INITIAL_STATE: User = {
  email: "",
  password: "",
  error: "",
}

const SignIn = () => {
  const [user, setUser] = useState<User>(INITIAL_STATE);
  const firebase = useContext(FirebaseContext);
  const history = useHistory();

  const {
    email,
    password,
    error,
  } = user;

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    firebase && firebase.signInWithEmailAndPassword(email, password)
      .then((user) => {
        firebase.setLoggedUser(user); // Tää menee suoraan contextiin, pitäis renderöidä kaikki?!
        setUser({ ...INITIAL_STATE });
        history.push(ROUTES.HOME);
      })
      .catch(error => {
        console.log(error);
        setUser({...user, error: error.message});
      });
  }

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUser({...user, [event.target.name]: event.target.value});
  }



  return(
    <div className="signin">
      <h1>Kirjaudu Sisään:</h1>
      <form onSubmit={onSubmit}>
        <p>admin@admin.com / password</p>
        <input onChange={onChange} name="email" value={email} type="email" placeholder="Sähköposti (admin@admin.com)" />
        <input onChange={onChange} name="password" value={password} type="password" placeholder="Salasana (password)" />
        {error && <p className="error">{error}</p>}
        <button type="submit">Kirjaudu Sisään</button>
      </form>
    </div>
  )
}

export default SignIn;