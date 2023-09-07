import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
function Card({card, onCardClick, onCardLike, onCardDelete}) {

  const currentUser = React.useContext(CurrentUserContext);
  const isOwn = card.owner._id === currentUser._id;
  const isLiked = card.likes.some((i)=> i._id === currentUser._id);

  function handleClick() {
    onCardClick(card);
  }  

  function handleLikeClick() {
    onCardLike(card);
  }

  function handleDeleteClick() {
    onCardDelete(card);
  }

  return(
    <div className="card">
      <img className="card__img" src={card.link} alt={card.name} onClick={handleClick}/>
      {isOwn && <button className="button button_type_remove" type="button" onClick={handleDeleteClick}></button>}  
      <div className="card__label">
        <p className="card__caption">{card.name}</p>
        <div className="card__likes">
          <button className={`button button_type_like ${isLiked && 'button_type_like_active'}`} onClick={handleLikeClick} type="button"></button>
          <div className="card__likes-number">{card.likes.length}</div>
        </div>         
      </div>
    </div>
  );
}

export default Card;