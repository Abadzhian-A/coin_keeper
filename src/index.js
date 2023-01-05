import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import { store } from './Store';
import './firebase';
import { getAuth } from 'firebase/auth';
import { setUser } from './Store/Slices/userSlice';
import 'antd/dist/antd.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
getAuth().onAuthStateChanged(user => {
  const { dispatch } = store;
  dispatch(setUser({
    email: user.email,
    id: user.uid,
    token: user.accessToken,
  }));
});

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
