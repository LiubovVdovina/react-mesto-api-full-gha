import React from 'react'
import PopupWithForm from './PopupWithForm';

function AddPlacePopup({isOpen, onClose, onAddPlace}) {
  const placeNameRef = React.useRef();
  const placeLinkRef = React.useRef();

  function handleSubmit(e) {
    e.preventDefault();

    onAddPlace({
      name: placeNameRef.current.value,
      link: placeLinkRef.current.value
    });
  }

  React.useEffect(() => {
    placeNameRef.current.value = "";
    placeLinkRef.current.value = "";

  }, [isOpen])

  return(
    <PopupWithForm title='Новое место' 
                   name='place' 
                   buttonText="Создать" 
                   isOpen={isOpen} 
                   onClose={onClose} 
                   onSubmit={handleSubmit}>
        <input ref={placeNameRef} 
               type="text" 
               placeholder="Название" 
               className="form__input form__input_type_place" 
               name="place" id="place-input" 
               required 
               minLength="2" 
               maxLength="30" 
        />
        <span className="form__input-error place-input-error"></span>
        <input ref={placeLinkRef} 
               type="url" 
               placeholder="Ссылка на картинку" 
               className="form__input form__input_type_src" 
               name="src" 
               id="src-input" 
               required 
        />
        <span className="form__input-error src-input-error"></span>
      </PopupWithForm> 
  );
}

export default AddPlacePopup;