import React from 'react';
import PopupWithForm from './PopupWithForm';

function ConfirmationPopup(props) {
    
  function handleSubmit(e) {
    e.preventDefault();

    props.onConfirm(props.card);
  } 

  return (
    <PopupWithForm name="delete-card" buttonText="Да" title="Вы уверены?" isOpen={props.isOpen} onClose={props.onClose} onSubmit={handleSubmit}>
      <input type="hidden" id="card-id" name="_id" className="popup__field popup__field_item_id" />
    </PopupWithForm>
  );
}

export default ConfirmationPopup;