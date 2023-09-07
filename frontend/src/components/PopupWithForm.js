function PopupWithForm({name, title, buttonText, isOpen, onClose, onSubmit, children}) {
  return(
    <div className={`popup popup_type_${name} ${isOpen ? 'popup_opened' : ''}`}>
        <div className="popup__container popup__wrapper">
          <button className="button button_type_close" type="button" onClick={onClose}></button>
          <h2 className="popup__title">{title}</h2>
          <form className="form" name={`${name}-form`} onSubmit={onSubmit} >
            {children}
            <button className="button button_type_submit" type="submit">{buttonText}</button>
          </form>
        </div>
      </div>  
  );
}

export default PopupWithForm;