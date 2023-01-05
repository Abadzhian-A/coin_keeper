import React from 'react';
import { useHistory } from 'react-router-dom';
import { FormAuth } from './FormAuth';
import { useDispatch } from 'react-redux';
import { setUser } from '../../Store/Slices/userSlice';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';

const SignUp = () => {
  const dispatch = useDispatch();
  const { push } = useHistory();

  const handleRegister = (email, password) => {
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, email, password)
      .then(({ user }) => {
        dispatch(setUser({
          email: user.email,
          id: user.uid,
          token: user.accessToken,
        }));
        push('/');
      })
      .catch(console.error);
  };

  return (
    <div>
      <FormAuth
        title="register"
        handleClick={handleRegister}
      />
    </div>
  );
};

export { SignUp };