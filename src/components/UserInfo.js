export default class UserInfo {
  constructor({ nameSelector, jobSelector }) {
    this._nameEl = document.querySelector(nameSelector);
    this._jobEl = document.querySelector(jobSelector);
  }

  getUserInfo() {
    return {
      userName: this._nameEl.textContent,
      userJob: this._jobEl.textContent,
    };
  }

  setUserInfo(userData) {
    this._nameEl.textContent = userData.title;
    this._jobEl.textContent = userData.description;
  }
}
