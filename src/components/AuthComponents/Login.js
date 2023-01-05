import React from 'react';
import { FormAuth } from './FormAuth';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { setUser } from '../../Store/Slices/userSlice';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase';
import { cookies } from '../../utils/comeon';


const Login = () => {
  const  dispatch = useDispatch();
  const { push } = useHistory();

  const handleLogin = (email, password) => {
    signInWithEmailAndPassword(auth, email, password)
      .then(({ user }) => {
        console.log(user);
        cookies.set('token', user.accessToken);
        dispatch(setUser({
          email: user.email,
          id: user.uid,
          token: user.accessToken,
        }));

        console.log('token: ', cookies.get('token'));

        push('/');
      })
          .catch(console.error);
      };

    return (
      <div>
        <FormAuth
          title="sign in"
          handleClick={handleLogin}
        />
      </div>
    );
};

export { Login };