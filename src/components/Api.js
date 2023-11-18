export default class Api {
  constructor(options) {
    this._url = options.url;
    this._headers = options.headers;
  }

  _getRes(res) {
    return res.ok ? res.json() : Promise.reject(`Error: ${res.status}`);
  }

  getProfileApi() {
    return fetch(this._url + "/users/me", {
      headers: this._headers,
    }).then(this._getRes);
  }
  getInitialCards() {
    return fetch(this._url + "/cards", {
      headers: this._headers,
    }).then(this._getRes);
  }

  editProfileApi(data) {
    return fetch(this._url + "/users/me", {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name: data.title,
        about: data.description,
      }),
    }).then(this._getRes);
  }

  createCardApi(data) {
    return fetch(this._url + "/cards", {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name: data.title,
        link: data.url,
      }),
    }).then(this._getRes);
  }

  deleteCard(cardId) {
    return fetch(this._url + `/cards/${cardId}`, {
      method: "DELETE",
      headers: this._headers,
    }).then(this._getRes);
  }

  updateAvatar(data) {
    return fetch(this._url + "/users/me/avatar", {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        avatar: data.url,
      }),
    }).then(this._getRes);
  }

  getLikes(cardId) {
    return fetch(`${this._url}/cards/likes/${cardId}`, {
      headers: this._headers,
    }).then(this._getRes);
  }

  likeCard(cardId) {
    return fetch(this._url + `/cards/${cardId}/likes`, {
      headers: this._headers,
      method: "PUT",
    }).then(this._getRes);
  }

  disLikeCard(cardId) {
    return fetch(this._url + `/cards/${cardId}/likes`, {
      headers: this._headers,
      method: "DELETE",
    }).then(this._getRes);
  }
}
