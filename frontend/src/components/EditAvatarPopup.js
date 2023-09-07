import React from 'react'
import PopupWithForm from './PopupWithForm';

function EditAvatarPopup({isOpen, onClose, onUpdateAvatar}) {
  const avatarInputRef = React.useRef();

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateAvatar({ avatar: avatarInputRef.current.value });
  }

  return(
    <PopupWithForm title='Обновить аватар' 
                   name='avatar' 
                   buttonText="Сохранить" 
                   isOpen={isOpen} 
                   onClose={onClose} 
                   onSubmit={handleSubmit}>
        <input ref={avatarInputRef} 
               type="url" 
               placeholder="Ссылка на аватар" 
               className="form__input form__input_type_src" 
               name="src" 
               id="avatar-input" 
               required 
        />
        <span className="form__input-error avatar-input-error"></span>
    </PopupWithForm> 
  );
}

export default EditAvatarPopup;