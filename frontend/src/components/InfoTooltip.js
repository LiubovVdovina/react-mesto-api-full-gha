import successIcon from '../images/tooltip-success.png'
import errorIcon from '../images/tooltip-error.png'

function InfoTooltip({isSuccess, isOpen, onClose, text}) {
  return(
    <div className={`popup ${isOpen ? 'popup_opened' : ''}`}>
        <div className="popup__container popup__wrapper">
          <button className="button button_type_close" type="button" onClick={onClose}></button>
          <img
            className="tooltip__image"
            src={isSuccess ? successIcon : errorIcon}
            alt={isSuccess ? 'знак успешно' : 'знак ошибки'}
          />
          <p className="tooltip__text">{text}</p>
        </div>
      </div>  
  );
}

export default InfoTooltip;