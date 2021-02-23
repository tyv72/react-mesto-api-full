import React, { useState } from 'react';
import { withRouter, useHistory } from 'react-router-dom';
import AuthForm from './AuthForm';

const Login = ({handleLogin}) => {
  const [data, setData] = useState({
    email: '',
    password: ''
  });

  const history = useHistory();
  
  const handleChange = (e) => {
    const {name, value} = e.target;
    setData({
      ...data,
      [name]: value
    });
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    handleLogin(data)
      .then(() => history.push('/'));
  }

  return(
    <div className="login">
      <AuthForm onSubmit={handleSubmit} onChange={handleChange} email={data.email} password={data.password} title='Вход' buttonText='Войти'/>
    </div>
  )
}

export default withRouter(Login);
