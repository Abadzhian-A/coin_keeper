import { Divider, PageHeader } from 'antd';
import React from 'react';
import { cookies } from '../utils/comeon';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { removeUser } from '../Store/Slices/userSlice';
import { getAuth, signOut } from 'firebase/auth';
import '../styles/Header.scss';

const Header = () => {
  const dispatch = useDispatch();

  const userId = useSelector(state => state.user.id);
  console.log('userId', userId);

  const logOut = async() => {
    const auth = getAuth();
    await signOut(auth);
    dispatch(removeUser());
    cookies.remove('token');
    console.log('token: ', cookies.get('token'));
  };

   return (
     <div className='site-page-header-ghost-wrapper'>
      <PageHeader
        className='ph'
        ghost={false}
        title='Coin keeper'
        subTitle='your budget'
        extra={[
          <Link key='5' to='/about' className='link'>Інформація</Link>,
          ...(userId ? [
            <Link key='4' to='/' className='link'>Головна</Link>,
            <Link key='3' to='/incomes' className='link'>Надхождення</Link>,
            <Link key='2' to='/costs' className='link'>Витрати</Link>,
            <Link key='1' onClick={logOut} className='link exit'>
              Вихід
            </Link>,
          ] : [<Link key='6' to='/login' className='link'>Увійти</Link>]),
        ]}
      />
    <Divider />
  </div>);
};
export default Header;