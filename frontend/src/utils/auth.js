export const BASE_URL = 'https://api.mestollogy.nomoredomainsicu.ru';

function getResponseData(res) {
  if(res.ok) {
    return res.json();
  } else {
    return Promise.reject(`Ошибка: ${res.status}`);
  }
}

export function register(email, password) {
  return fetch(`${BASE_URL}/signup`, {
    method: "POST",
    credentials: 'include',
    headers: {
      'Accept': 'application/json',
      "Content-Type": "application/json" 
    },
    body: JSON.stringify({password, email})
  })
  .then((res) => getResponseData(res))
}

export function authorize(email, password) {
  return fetch(`${BASE_URL}/signin`, {
    method: "POST",
    credentials: 'include',
    headers: {
      'Accept': 'application/json',
      "Content-Type": "application/json" 
    },
    body: JSON.stringify({password, email})
  })
  .then((res) => getResponseData(res))
  .then((data) => {
    return data;
  })
}
export function checkToken() {
  return fetch(`${BASE_URL}/users/me`, {
    method: 'GET',
    credentials: 'include',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  })
  .then((res) => getResponseData(res))
  .then((data) => {
    return data;
  })
}
export function logout() {
  return fetch(`${BASE_URL}/signout`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  })
  .then((res) => getResponseData(res))
}