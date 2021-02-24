class Api {
  constructor(config) {
    this._url = config.url;
  }

  _getResponseData(res) {
    if (res.ok) {
      return res.json();
    }

    return Promise.reject(new Error(`Ошибка: ${res.status}`));
  }

  getAllCards(token) {
      return fetch(`${this._url}cards`, {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      })
      .then((res) => this._getResponseData(res));
  }

  deleteCard(id, token) {
      return fetch(`${this._url}cards/${id}`, {
          method: "DELETE",
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
      })
      .then((res) => this._getResponseData(res));
  }

  addCard(data, token) {
      return fetch(`${this._url}cards`, {
          method: "POST",
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
          body: JSON.stringify({
            name: data.name,
            link: data.link
          }),
      })
      .then((res) => this._getResponseData(res));
  }

  getUserInfo(token) {
    return fetch(`${this._url}users/me`, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    })
    .then((res) => this._getResponseData(res));
  }

  updateUserInfo(data, token) {
    return fetch(`${this._url}users/me`, {
      method: 'PATCH',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({
        name: data.name,
        about: data.about
      })
    })
    .then((res) => this._getResponseData(res));
  }

  updateUserAvatar(data, token) {
    return fetch(`${this._url}users/me/avatar`, {
      method: 'PATCH',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({
        avatar: data.avatar
      })
    })
    .then((res) => this._getResponseData(res));
  }

  changeLikeCardStatus(id, isLiked, token) {
    return fetch(`${this._url}cards/likes/${id}`, {
        method: isLiked ? "PUT" : "DELETE",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
    })
    .then((res) => this._getResponseData(res));
  }  
}

const api = new Api({
  url: "https://api.tyv.students.nomoreparties.space"
});

export default api;
