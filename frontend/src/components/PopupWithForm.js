import React from 'react';
import closeIcon from './../images/Close-icon.svg';

function PopupWithForm(props) {
  return (
    <div className={`popup popup_type_${props.name} popup_color_light ${props.isOpen && 'popup_opened'}`}>
      <form name={props.name} className="popup__container popup__form popup__form_validated" onSubmit={props.onSubmit}> 
        <button type="button" className="popup__close-button darkling-button" onClick={props.onClose}>
          <img src={closeIcon} alt="Закрыть" className="popup__close-logo"/>
        </button> 
        <p className="popup__title">{props.title}</p>        
        {props.children}               
        <button type="submit" className="popup__save-button darkling-button">{props.buttonText}</button>
      </form>                                    
    </div>
  );
}

export default PopupWithForm;