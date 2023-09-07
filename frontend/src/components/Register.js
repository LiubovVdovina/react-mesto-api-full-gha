import React from 'react'
import { Link, useNavigate } from "react-router-dom";

function Register({loggedIn, onRegister}) {
  const [formValue, setFormValue] = React.useState({
    email: '',
    password: ''
  })

  const navigate = useNavigate();

  function handleChange(e) {
    const {name, value} = e.target;

    setFormValue({
      ...formValue,
      [name]: value
    })
  }

  function handleSubmit(e) {
    e.preventDefault();
    if(!formValue.email || !formValue.password) {
      return;
    }
    onRegister(formValue.email, formValue.password);
  }

  React.useEffect(() => {
    if(loggedIn) {
    navigate('/', {replace: true})}
  }, [loggedIn])

  return(
    <form className="auth-form" onSubmit={handleSubmit}>
      <h2 className="auth-form__title">Регистрация</h2>
      <input 
        className="auth-form__input"
        id="email"
        name="email"
        type="email"
        placeholder="Email"
        required
        value={formValue.email}
        onChange={handleChange}
      />
      <input 
        className="auth-form__input"
        id="password"
        name="password"
        type="password"
        placeholder="Пароль"
        required
        value={formValue.password}
        onChange={handleChange}
      />
      <button className="auth-form__button">Зарегистрироваться</button>
      <p className="auth-form__registered">
        <Link className="auth-form__link" to="/sign-in">Уже зарегистрированы? Войти</Link>
      </p>
    </form>
  );
}

export default Register;