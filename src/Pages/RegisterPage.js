import React from 'react';
import { Link } from 'react-router-dom';
import { SignUp } from '../components/AuthComponents/SignUp';
import '../styles/RegisterPage.scss';

export const RegisterPage = () => {

  return(
    <div>
      <h1>Register</h1>
      <SignUp/>
      <p>
        Already have an account?
        <Link to="/login"> Sign in</Link>
      </p>
    </div>
  );
};