import React from 'react';
import { withRouter } from 'react-router-dom';
import headerLogo from '../images/Header-logo.svg';

function Header(props) {
  return (
    <header className="header main-size">
      <img src={headerLogo} alt="Место" className="header__logo"/> 
      {props.children}           
    </header>
  );
}

export default withRouter(Header);