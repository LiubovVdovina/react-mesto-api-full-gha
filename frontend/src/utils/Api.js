class Api {
  constructor({ baseUrl, credentials, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
    this._credentials = credentials;
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
      
    } else {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
  }

  _request(url, { method, headers, body }) {
    return fetch(`${this._baseUrl}${url}`, {
      method,
      headers,
      body
    })
    .then(this._checkResponse)
  }

  getUserInfo() {
    return this._request('/users/me', { method: 'GET', credentials: this._credentials, headers: this._headers });
  }

  sendUserInfo({ name, about }) {
    return this._request('/users/me', { method: 'PATCH', credentials: this._credentials, headers: this._headers, body: JSON.stringify({ name, about })});
  }

  getInitialCards() {
    return this._request('/cards', {method: 'GET', credentials: this._credentials, headers: this._headers});
  }

  sendCardInfo({ name, link }) {
    return this._request('/cards', { method: 'POST', credentials: this._credentials, headers: this._headers, body: JSON.stringify({ name, link })});
  }

  removeCard(cardId) {
    return this._request(`/cards/${cardId}`, {method: 'DELETE', credentials: this._credentials, headers: this._headers});
  }

  putLike(cardId) {
    return this._request(`/cards/${cardId}/likes`, {method: 'PUT', credentials: this._credentials, headers: this._headers});
  }

  removeLike(cardId) {
    return this._request(`/cards/${cardId}/likes`, {method: 'DELETE', credentials: this._credentials, headers: this._headers});
  }

  changeLikeCardStatus(cardId, isLiked) {
    return isLiked ? this.removeLike(cardId) : this.putLike(cardId)
  }

  sendAvatarInfo(avatar) {
    return this._request('/users/me/avatar', { method: 'PATCH', credentials: this._credentials, headers: this._headers, body: JSON.stringify(avatar)});
  }
}

const api = new Api({
  baseUrl: 'https://api.mestollogy.nomoredomainsicu.ru',
  credentials: 'include',
  headers: {
    'Content-Type': 'application/json'
  }
})

export {api, Api}