function ImagePopup({card, onClose}) {
  return(
    <div className={`popup popup_type_img ${card.link ? 'popup_opened' : ''}`}>
        <div className="popup__wrapper">
          <button className="button button_type_close" type="button" onClick={onClose}></button>
          <figure className="popup__figure">
            <img className="popup__img" src={card ? card.link :""} alt={card ? card.name : ""} />
            <figcaption className="popup__caption">{card ? card.name : ""}</figcaption>
          </figure>
        </div>
      </div>
  );
}

export default ImagePopup;