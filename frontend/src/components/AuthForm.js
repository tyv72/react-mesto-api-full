import React from 'react';
import { withRouter } from 'react-router-dom';

const AuthForm = (props) => {
  return(
    <form onSubmit={props.onSubmit} className="auth-form">
      <p className="auth-form__title">{props.title}</p>

      <input type="text" id="email" name="email" value={props.email} onChange={props.onChange} className="auth-form__field" placeholder="Email" />
      <input type="text" id="password" name="password" value={props.password} onChange={props.onChange} className="auth-form__field" placeholder="Password" />
      
      <button type="submit" className="auth-form__button darkling-button">{props.buttonText}</button>
      {props.children}
    </form>
  )
}

export default withRouter(AuthForm);
