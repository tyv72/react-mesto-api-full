import React from 'react';
import closeIcon from './../images/Close-icon.svg';
import okImg from './../images/OK_img.svg';
import errImg from './../images/ERR_img.svg';

function InfoToolTip(props) {
  return (
    <div className={`popup popup_color_light ${props.isOpen && 'popup_opened'}`}>
      <div className="popup__container popup__tooltip popup__tooltip-container">
        <button type="button" className="popup__close-button darkling-button" onClick={props.onClose}>
          <img src={closeIcon} alt="Закрыть" className="popup__close-logo" />
        </button> 
        <div className="popup__image-container">
          <img className="popup__card-image" src={props.isError ? errImg : okImg} alt={props.card ? props.card.name : ''}/>
        </div>                  
        <p className="popup__tooltip-caption">{props.isError ? 'Что-то пошло не так\nПопробуйте еще раз' : 'Вы успешно зарегистрированы'}</p>  
      </div>                                       
    </div>
  );
}

export default InfoToolTip;