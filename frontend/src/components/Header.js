import React from 'react'
import logoPath from '../images/logo.svg';
import { Link, Route, Routes} from 'react-router-dom'

function Header({userEmail, handleSignOut}) {
  return(
    <header className="header">
      <img className="logo" src={logoPath} alt="логотип Место" /> 
      <Routes>
        <Route exact path="/" element={
          <div className='header__right-block'>
            <p className='header__email'>{userEmail}</p>
            <Link to="sign-in" onClick={handleSignOut}className="header__link">Выйти</Link  >
          </div>}
        />
        <Route path="/sign-in" element={
         <Link to="/sign-up" className="header__link">Регистрация</Link>
        }
        />
        <Route path="/sign-up" element={
          <Link to="/sign-in" className='header__link'>Войти</Link>
        }
        />
      </Routes>
    </header>
  );
}

export default Header;