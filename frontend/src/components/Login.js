import React from 'react'
import {useNavigate} from 'react-router-dom';

function Login({loggedIn, onLogin}) {
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
    onLogin(formValue.email, formValue.password)
    if (loggedIn) {
      setFormValue({email: '', password: ''});
    }
  }

  React.useEffect(() => {
    if(loggedIn) {
    navigate('/', {replace: true})}
  }, [loggedIn])

  return(
    <form className="auth-form" onSubmit={handleSubmit}>
      <h2 className="auth-form__title">Вход</h2>
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
      <button className="auth-form__button">Войти</button>
    </form>
  );
}

export default Login;