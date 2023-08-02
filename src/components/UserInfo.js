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

  setUserInfo(userData) {
    this._nameSelector.textContent = userData.value;
    this._jobSelector.textContent = userData.value;

    return userData;
  }
}

// profileTitle.textContent = profileTitleInput.value;
// profileDescription.textContent = profileDescriptionInput.value;
