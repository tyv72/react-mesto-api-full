import { settings } from './constants.js';

class Api {
  constructor(config) {
    this._url = config.url;
    this._headers = config.headers;
  }

  _getResponseData(res) {
    if (res.ok) {
      return res.json();
    }

    return Promise.reject(new Error(`Ошибка: ${res.status}`));
  }

  getAllCards() {
      return fetch(`${this._url}cards`, {
          headers: this._headers,
      })
      .then((res) => this._getResponseData(res));
  }

  deleteCard(id) {
      return fetch(`${this._url}cards/${id}`, {
          method: "DELETE",
          headers: this._headers,
      })
      .then((res) => this._getResponseData(res));
  }

  addCard(data) {
      return fetch(`${this._url}cards`, {
          method: "POST",
          headers: this._headers,
          body: JSON.stringify({
            name: data.name,
            link: data.link
          }),
      })
      .then((res) => this._getResponseData(res));
  }

  getUserInfo() {
    return fetch(`${this._url}users/me`, {
        headers: this._headers,
    })
    .then((res) => this._getResponseData(res));
  }

  updateUserInfo(data) {
    return fetch(`${this._url}users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        about: data.about
      })
    })
    .then((res) => this._getResponseData(res));
  }

  updateUserAvatar(data) {
    return fetch(`${this._url}users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar: data.avatar
      })
    })
    .then((res) => this._getResponseData(res));
  }

  changeLikeCardStatus(id, isLiked) {
    return fetch(`${this._url}cards/likes/${id}`, {
        method: isLiked ? "PUT" : "DELETE",
        headers: this._headers,
    })
    .then((res) => this._getResponseData(res));
  }  
}

const api = new Api({
  url: "https://api.tyv.students.nomoreparties.space",
  headers: {
    authorization: localStorage.getItem('jwt'),
    "content-type": "application/json",
  }
});

export default api;
