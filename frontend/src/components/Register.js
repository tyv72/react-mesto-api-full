import React, { useState } from 'react';
import { Link, withRouter } from 'react-router-dom';
import AuthForm from './AuthForm';

const Register = ({onRegister}) => {
  const [data, setData] = useState({
    password: '',
    email: '',    
  });

  const handleChange = (e) => {
    const {name, value} = e.target;
    setData({
      ...data,
      [name]: value
    }); 
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    onRegister(data);    
  }

  return (
    <div className="register">
      <AuthForm onSubmit={handleSubmit} onChange={handleChange} email={data.email} password={data.password} title='Регистрация' buttonText='Зарегистрироваться'>
        <div className="register__signin">
          <p className="register__question">Уже зарегистрированы?</p>
          <Link to="login" className="register__login-link">Войти</Link>
        </div>
      </AuthForm>       
    </div>
  );  
}

export default withRouter(Register);
