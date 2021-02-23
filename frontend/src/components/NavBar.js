import React from 'react';
import { NavLink, withRouter, useHistory } from 'react-router-dom';

function NavBar(props) {
  const { location } = useHistory();  
  const registerPath = location.pathname === '/register';
  const linkPath =  registerPath ? '/login' : '/register';
  const linkName =  registerPath ? 'Войти' : 'Регистрация';

  function signOut(){
    props.handleLogout();    
  }

  return (
    <nav className="menu">
      {!props.loggedIn && <NavLink className="menu__item" to={linkPath}>{linkName}</NavLink>}
      {props.loggedIn && <p className="menu__item menu__item_active">{props.email}</p>}
      {props.loggedIn && <button onClick={signOut} className="menu__item menu__button">Выйти</button>}
    </nav>
  );
}

export default withRouter(NavBar);