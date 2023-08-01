export default class UserInfo {
  constructor({ nameSelector, jobSelector }) {
    this._nameSelector = document.querySelector(nameSelector);
    this._jobSelector = document.querySelector(jobSelector);
  }

  getUserInfo() {
    const userData = {};
    userData[this._nameSelector.textContent] = this._nameSelector.value;
    userData[this._jobSelector.textContent] = this._jobSelector.value;

    return userData;
  }

  setUserInfo() {
    const userData = {};
    userData[this._nameSelector.value] = this._nameSelector.textContent;
    userData[this._jobSelector.value] = this._jobSelector.textContent;

    return userData;
  }
}
