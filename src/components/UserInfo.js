export default class UserInfo {
  constructor({ nameSelector, jobSelector }) {
    this._nameSelector = document.querySelector(nameSelector);
    this._jobSelector = document.querySelector(jobSelector);
  }

  getUserInfo() {
    const userData = {
      userName: (this._nameSelector.value = this._nameSelector.textContent),
      userJob: (this._jobSelector.value = this._jobSelector.textContent),
    };

    return userData;
  }

  setUserInfo() {
    debugger;
    this._nameSelector.textContent = this._nameSelector.value;
    this._jobSelector.textContent = this._jobSelector.value;
  }
}

// profileTitle.textContent = profileTitleInput.value;
// profileDescription.textContent = profileDescriptionInput.value;
