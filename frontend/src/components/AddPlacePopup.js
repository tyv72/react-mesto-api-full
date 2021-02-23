import React from 'react';
import PopupWithForm from './PopupWithForm';

function AddPlacePopup(props) {
  const [name, setName] = React.useState('');
  const [link, setLink] = React.useState('');

  function handleChangeName(e) {
    setName(e.target.value);
  }

  function handleChangeLink(e) {
    setLink(e.target.value);
  }
  
  function handleSubmit(e) {
    e.preventDefault();

    // TODO желательно очищать инпуты после удачного сабмита
    props.onAddPlace({
      name,
      link,
    });
  } 

  return (
    <PopupWithForm name="add-card" title="Новое место" buttonText="Сохранить" isOpen={props.isOpen} onClose={props.onClose} onSubmit={handleSubmit}>
      <input type="text" id="card-place" name="name" value={name} onChange={handleChangeName} className="popup__field popup__field_item_place" placeholder="Название" minLength="1" maxLength="30" required />
      <span id="card-place-error" className="popup__field-error"></span>
      <input type="url" id="card-link" name="link" value={link} onChange={handleChangeLink} className="popup__field popup__field_item_link" placeholder="Ссылка на картинку" required />               
      <span id="card-link-error"className="popup__field-error"></span>
    </PopupWithForm>
  );
}

export default AddPlacePopup;