// ! ||--------------------------------------------------------------------------------||
// ! ||                                  Error Message                                 ||
// ! ||--------------------------------------------------------------------------------||

function showError(formEl, inputEl, { inputErrorClass, errorClass }) {
  const errorMessageEl = formEl.querySelector(`#${inputEl.id}-error`);
  inputEl.classList.add(inputErrorClass);
  errorMessageEl.textContent = inputEl.validationMessage;
  errorMessageEl.classList.add(errorClass);
}
function hideError(formEl, inputEl, { inputErrorClass, errorClass }) {
  const errorMessageEl = formEl.querySelector(`#${inputEl.id}-error`);
  inputEl.classList.remove(inputErrorClass);
  errorMessageEl.textContent = "";
  errorMessageEl.classList.remove(errorClass);
}

// ! ||--------------------------------------------------------------------------------||
// ! ||                           Validity Check and Input                           ||
// ! ||--------------------------------------------------------------------------------||

function checkInputValidity(formEl, inputEl, content) {
  if (!inputEl.validity.valid) {
    showError(formEl, inputEl, content);
  } else {
    hideError(formEl, inputEl, content);
  }
}

function hasInvalidInput(inputList) {
  return !inputList.every((inputEl) => inputEl.validity.valid);
}

// ! ||--------------------------------------------------------------------------------||
// ! ||                                  Button State                                  ||
// ! ||--------------------------------------------------------------------------------||
const disableButton = (submitButton, { inactiveButtonClass }) => {
  submitButton.classList.add(inactiveButtonClass);
  submitButton.disabled = true;
};

const enableButton = (submitButton, { inactiveButtonClass }) => {
  submitButton.classList.remove(inactiveButtonClass);
  submitButton.disabled = false;
};

const toggleButtonState = (inputEl, submitButton, { inactiveButtonClass }) => {
  if (hasInvalidInput(inputEl)) {
    disableButton(submitButton, { inactiveButtonClass });
    return;
  }

  enableButton(submitButton, { inactiveButtonClass });
};

// ! ||--------------------------------------------------------------------------------||
// ! ||                             Listener and Validation                            ||
// ! ||--------------------------------------------------------------------------------||

function setEventListeners(formEl, content) {
  const { inputSelector } = content;
  const inputEls = [...formEl.querySelectorAll(inputSelector)];
  const submitButton = formEl.querySelector(".modal__button");

  inputEls.forEach((inputEl) => {
    inputEl.addEventListener("input", (e) => {
      checkInputValidity(formEl, inputEl, content);
      toggleButtonState(inputEls, submitButton, content);
    });
  });
}

function enableValidation(content) {
  const formEls = [...document.querySelectorAll(content.formSelector)];
  formEls.forEach((formEl) => {
    formEl.addEventListener("submit", (e) => {
      e.preventDefault();
    });
    setEventListeners(formEl, content);
  });
}

const config = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__button",
  inactiveButtonClass: "modal__button_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible",
};

enableValidation(config);
