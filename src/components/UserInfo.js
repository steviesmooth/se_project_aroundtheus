export default class UserInfo {
  constructor({ nameSelector, jobSelector }) {
    this._nameEl = document.querySelector(nameSelector);
    this._jobEl = document.querySelector(jobSelector);
  }

  getUserInfo() {
    return {
      userName: this._nameEl,
      userJob: this._jobEl,
    };
  }

  setUserInfo(userData) {
    this._nameEl.textContent = userData.title;
    this._jobEl.textContent = userData.description;
  }
}
