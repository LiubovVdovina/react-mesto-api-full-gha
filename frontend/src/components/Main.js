import React from 'react';
import Card from './Card'
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Main({onEditProfile, onAddPlace, onEditAvatar, onCardClick, onCardLike, onCardDelete, cards}) {
  const currentUser = React.useContext(CurrentUserContext);

  return(
    <main className="content">
      <section className="profile">
        <div className="profile__avatar-container"><img className="profile__avatar" src={currentUser.avatar} alt="аватар пользователя" onClick={onEditAvatar}/></div>
        <div className="profile__info">
          <div className="profile__top-row">
            <h1 className="profile__name">{currentUser.name}</h1> 
            <button className="button button_type_edit" type="button" onClick={onEditProfile}></button>
          </div>
          <p className="profile__job">{currentUser.about}</p>
        </div>
        <button className="button button_type_add" type="button" onClick={onAddPlace}></button>
      </section>
      <section className="gallery">
        <ul className="gallery__list">
          {cards.map((card) => {
            return(
              <li key={card._id}><Card card={card} onCardClick={onCardClick} onCardLike={onCardLike} onCardDelete={onCardDelete}></Card></li>
            )})
          }
        </ul>
      </section>
    </main>
  );
}

export default Main;