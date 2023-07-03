export default class FormValidator {
  constructor(settings, FormElement) {
    this._inputSelector = settings.inputSelector;
    this._submitButtonSelector = settings.submitButtonSelector;
    this._inactiveButtonClass = settings.inactiveButtonClass;
    this._inputErrorClass = settings.inputErrorClass;
    this._errorClass = settings.errorClass;

    this._form = FormElement;
  }

  _enableButton(submitButton) {
    submitButton.classList.remove(this._inactiveButtonClass);
    submitButton.disabled = false;
  }

  _disableButton(submitButton) {
    submitButton.classList.add(this._inactiveButtonClass);
    submitButton.disabled = true;
  }

  _toggleButtonState(inputEl, submitButton) {
    if (hasInvalidInput(inputEl)) {
      disableButton(submitButton);
      return;
    }

    enableButton(submitButton);
  }

  checkInputValidity(inputEl) {
    if (!inputEl.validity.valid) {
      showError(formEl, inputEl, content);
    } else {
      hideError(formEl, inputEl, content);
    }



  _hasInvalidInput(inputEls) {
    return !inputEls.every((inputEl) => inputEl.validity.valid);
  }

  _setEventListeners() {
    //const { inputSelector, submitButtonSelector } = content;
    const inputEls = [...this._form.querySelectorAll(this._inputSelector)];
    const submitButton = this._form.querySelector(this._submitButtonSelector);

    inputEls.forEach((inputEl) => {
      inputEl.addEventListener("input", (e) => {
        checkInputValidity(formEl, inputEl, content);
        toggleButtonState(inputEls, submitButton, content);
      });
    });
  }

  enableValidation() {
    this._form.addEventListener("submit", (e) => {
      e.preventDefault();
    });
    setEventListeners(formEl, content);
  }

  }
