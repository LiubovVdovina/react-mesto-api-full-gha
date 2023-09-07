import React from 'react';
import { Route, Routes, Navigate, useNavigate } from "react-router-dom";

import {api} from '../utils/Api'
import Header from './Header'
import Login from './Login'
import Register from './Register'
import Main from './Main'
import Footer from './Footer'
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup'
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup'
import AddPlacePopup from './AddPlacePopup';
import { CurrentUserContext } from '../contexts/CurrentUserContext'
import InfoTooltip from './InfoTooltip';
import ProtectedRoute from './ProtectedRoute';

import * as auth from '../utils/auth'

function App() {
  const [cards, setCards] = React.useState([]);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [isTooltipPopupOpen, setIsTooltipPopupOpen] = React.useState(false);
  const [isSuccess, setIsSuccess] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({});
  const [currentUser, setCurrentUser] = React.useState({}); // переменная состояния, хранящая данные текущего пользователя
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [userEmail, setUserEmail] = React.useState('');

  const navigate = useNavigate();

  React.useEffect(() => {
    if(loggedIn) {
    Promise.all([api.getUserInfo(), api.getInitialCards()])
      .then(([userData, initialCards]) => {
        setCurrentUser(userData);
        setCards(initialCards)
      })
      .catch((err) => console.log(err))}
  }, [loggedIn]);

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  };

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  };

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  };

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsTooltipPopupOpen(false);
    setSelectedCard({});
  }

  function handleCardLike(card) {

    const isLiked = card.likes.some(i => i._id === currentUser._id);

    api.changeLikeCardStatus(card._id, isLiked)
      .then((newCard) => {
        setCards((state) => 
          state.map((c) => 
            c._id === card._id ? newCard : c)
        );
      })
      .catch((err) => console.log(err))
  }

  function handleCardDelete(card) {

    api.removeCard(card._id)
    .then(() => setCards((state) => state.filter((c)=> c._id !== card._id)))
    .catch((err) => console.log(err))
  }

  function handleUpdateUser(newUserInfo) {
    api.sendUserInfo(newUserInfo)
      .then((userData) => {
        setCurrentUser(userData);
        closeAllPopups();
      })
      .catch((err) => console.log(err))
  }
  
  function handleUpdateAvatar(newAvatar) {
    api.sendAvatarInfo(newAvatar)
      .then((userData) => {
        setCurrentUser(userData);
        closeAllPopups();
      })
      .catch((err) => console.log(err))
  }
  
  function handleAddPlace(newPlace) {
    api.sendCardInfo(newPlace)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => console.log(err))
  }

  function handleLogin(email, password) {
    auth.authorize(email, password)
      .then((data) => {
        if(data.token) {
          setLoggedIn(true);
          navigate('/', {replace: true});
        }
      })
      .catch((err) => console.log(err))
  }

  function handleRegister(email, password) {
    auth.register(email, password)
      .then((data) => {
        setIsSuccess(true);
        navigate("/sign-in", {replace: true});
      })
      .catch((err) => {
        setIsSuccess(false);
        console.log(err)
      })
      .finally(() => {
        setIsTooltipPopupOpen(true);
      })
  }

  React.useEffect(() => {
    auth.checkToken()
    .then((data) => {
      if(data) {
        setLoggedIn(true);
          // сохранить e-mail для хэдэра
        setUserEmail(data.data.email);
        console.log(data);
        navigate('/', {replace: true});
      }
    })
      .catch((err) => console.log(err))
  }, [navigate])

  function handleSignOut() {
    setLoggedIn(false);
    setUserEmail("");
    navigate('/sign-in');
  }

  return(
    <CurrentUserContext.Provider value={currentUser}>
      <Header userEmail={userEmail} handleSignOut={handleSignOut}/>
      <Routes>
        
      <Route path="/" element=
        {<ProtectedRoute 
          element ={Main}
          loggedIn = {loggedIn}
          onEditProfile={handleEditProfileClick} 
          onAddPlace={handleAddPlaceClick} 
          onEditAvatar={handleEditAvatarClick} 
          onCardClick={handleCardClick} 
          onCardLike={handleCardLike} 
          onCardDelete={handleCardDelete} 
          cards={cards} />} />
        <Route path="/sign-up" element={<Register loggedIn={loggedIn} onRegister={handleRegister}/>}/>
        <Route path="/sign-in" element={<Login loggedIn={loggedIn} onLogin={handleLogin}/>}/>
        <Route path="/*" element={<Navigate to="/sign-in" />} />
      </Routes>
      <Footer />

      <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser} />
      <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddPlace={handleAddPlace}/>
      <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar}/>
      <PopupWithForm title='Вы уверены' name='remove' buttonText='Да'>  </PopupWithForm>
      <ImagePopup card={selectedCard} onClose={closeAllPopups}/>
      <InfoTooltip isSuccess={isSuccess} isOpen={isTooltipPopupOpen} text={isSuccess ? 'Вы успешно зарегистрировались!' : 'Что-то пошло не так! Попробуйте ещё раз.'} onClose={closeAllPopups} />
  </CurrentUserContext.Provider>
  );
}

export default App;
