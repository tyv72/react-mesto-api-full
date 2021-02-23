import React from 'react';
import PopupWithForm from './PopupWithForm';

function EditAvatarPopup(props) {
  const avatarRef = React.useRef();

  function handleSubmit(e) {
    e.preventDefault();

    props.onUpdateAvatar({
      avatar: avatarRef.current.value,
    });
    avatarRef.current.value = '';
  } 

  return (
    <PopupWithForm name="add-avatar" title="Обновить аватар" buttonText="Сохранить" isOpen={props.isOpen} onClose={props.onClose} onSubmit={handleSubmit}>
      <input type="url" id="avatar-link" name="avatar" ref={avatarRef} className="popup__field popup__field_item_link" placeholder="Ссылка на аватар" required/>               
      <span id="avatar-link-error"className="popup__field-error"></span>        
    </PopupWithForm>
  );
}

export default EditAvatarPopup;