export default class UserInfo {
  constructor({ nameSelector, jobSelector, avatarSelector }) {
    this._nameEl = document.querySelector(nameSelector);
    this._jobEl = document.querySelector(jobSelector);
    this._avatarEl = document.querySelector(avatarSelector);
  }

  getUserInfo() {
    return {
      userName: this._nameEl.textContent,
      userJob: this._jobEl.textContent,
    };
  }

  setUserInfo({ name, about }) {
    this._nameEl.textContent = name;
    this._jobEl.textContent = about;
  }

  setAvatar(avatar) {
    this._avatarEl.src = avatar;
  }

  getId() {
    return this._userId;
  }
}
