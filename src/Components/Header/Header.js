import React from 'react';
import Logo from '../../Assets/Images/Logo/logo3.png';
// import Logo from '../../Assets/Images/Logo/logo6.png';

const container = {
  height: '150px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  // background: 'black',
  // color: 'white',
};

const wrapper = {
  height: '80px',
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '0px 80px',
};

const SideWrap = {
  height: '80px',
  display: 'flex',
  alignItems: 'center',
};

const logoImg = {
  // height: '40px',
  height: '50px',
};

const logoTitle = {
  height: '80px',
  margin: '0px 10px',
  fontSize: '24px',

  display: 'flex',
  alignItems: 'center',
};

const Header = () => {
  return (
    <div style={container}>
      <div style={wrapper}>
        <div style={SideWrap}>
          <img style={logoImg} src={Logo} alt='logo' />
          <h1 style={logoTitle}>MINI-MATE</h1>
        </div>
        <div style={SideWrap}>
          <h1 style={logoTitle}>Search</h1>
        </div>
        <div style={SideWrap}>
          <h1 style={logoTitle}>Right side</h1>
        </div>
      </div>
    </div>
  );
};

export default Header;
