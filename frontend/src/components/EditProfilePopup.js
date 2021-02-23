import React from 'react';
import PopupWithForm from './PopupWithForm';
import CurrentUserContext from './../contexts/CurrentUserContext';

function EditProfilePopup(props) {
  const [name, setName] = React.useState('');
  const [description, setDescription] = React.useState('');
  const currentUser = React.useContext(CurrentUserContext);

  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser]); 

  function handleChangeName(e) {
    setName(e.target.value);
  }

  function handleChangeDescription(e) {
    setDescription(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
  
    props.onUpdateUser({
      name,
      about: description,
    });
  } 

  return (
    <PopupWithForm name="edit-profile" title="Редактировать профиль" buttonText="Сохранить" isOpen={props.isOpen} onClose={props.onClose} onSubmit={handleSubmit}>
      <input type="text" id="profile-name" name="name" value={name} onChange={handleChangeName} className="popup__field popup__field_item_name" placeholder="Имя" minLength="2" maxLength="40" required/>
      <span id="profile-name-error" className="popup__field-error"></span>
      <input type="text" id="profile-about" name="about" value={description} onChange={handleChangeDescription} className="popup__field popup__field_item_about" placeholder="Описание" minLength="2" maxLength="200" required/>
      <span id="profile-about-error" className="popup__field-error"></span>
    </PopupWithForm>
  );
}

export default EditProfilePopup;