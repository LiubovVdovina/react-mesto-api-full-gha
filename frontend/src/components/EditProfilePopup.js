import React from 'react';
import PopupWithForm from './PopupWithForm';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function EditProfilePopup( {isOpen, onClose, onUpdateUser}) {

  const currentUser = React.useContext(CurrentUserContext);
  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
    }, [currentUser, isOpen]);

  const [name, setName] = React.useState('');
  const [description, setDescription] = React.useState('');

  function handleNameChange(e) {
    setName(e.target.value);
  }

  function handleDescriptionChange(e) {
    setDescription(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    // Передаём значения управляемых компонентов во внешний обработчик
    onUpdateUser({
      name,
      about: description,
    });
  }

  return(
    <PopupWithForm title='Редактировать профиль' 
                   name='edit' 
                   buttonText="Сохранить" 
                   isOpen={isOpen} 
                   onClose={onClose} 
                   onSubmit={handleSubmit}>
      <input type="text" 
             placeholder="Введите ваше имя" 
             className="form__input form__input_type_name" 
             name="name" 
             value={name || ''} 
             onChange={handleNameChange} 
             id="name-input" 
             required 
             minLength="2" 
             maxLength="40" 
      />
      <span className="form__input-error name-input-error"></span>
      <input type="text" 
             placeholder="Введите вашу профессию" 
             className="form__input form__input_type_job" 
             name="job" 
             value={description || ''} 
             onChange={handleDescriptionChange} 
             id="job-input" 
             required 
             minLength="2" 
             maxLength="200" 
      />
      <span className="form__input-error job-input-error"></span>
    </PopupWithForm> 
  );
}

export default EditProfilePopup;