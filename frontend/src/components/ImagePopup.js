import React from 'react';
import closeIcon from './../images/Close-icon.svg';

function ImagePopup(props) {
  return (
    <div className={`popup popup_type_view-card popup_color_dark ${props.card && 'popup_opened'}`}>
      <div className="popup__container popup__card-container">
        <button type="button" className="popup__close-button darkling-button" onClick={props.onClose}>
          <img src={closeIcon} alt="Закрыть" className="popup__close-logo" />
        </button> 
        <div className="popup__image-container">
          <img className="popup__card-image" src={props.card ? props.card.link : ''} alt={props.card ? props.card.name : ''}/>
        </div>                  
        <p className="popup__card-caption">{props.card && props.card.name}</p>  
      </div>                                       
    </div>
  );
}

export default ImagePopup;