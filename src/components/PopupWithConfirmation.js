import Popup from "./Popup";

export default class PopupWithConfirmation extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._submitButton = this._popupElement.querySelector(".modal__button");
    this._submitButtonText = this._submitButton.textContent;
  }

  renderLoading(isLoading, loadingText = "Saving...") {
    if (isLoading) {
      this._submitButton.textContent = loadingText;
    } else {
      this._submitButton.textContent = this._submitButtonText;
    }
  }

  handleConfirm = () => {
    this._handleConfirm(this);
  };

  openPopup(handleConfirm) {
    super.open();
    this._handleConfirm = handleConfirm;
  }

  setEventsListeners() {
    super.setEventsListeners();
    this._submitButton.addEventListener("click", this.handleConfirm);
  }
}
