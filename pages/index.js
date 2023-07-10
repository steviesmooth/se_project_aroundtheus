import FormValidator from "../components/FormValidatior.js";
import Card from "../components/Card.js";

const initialCards = [
  {
    name: "Yosemite Valley",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg",
  },
  {
    name: "Lake Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lake-louise.jpg",
  },
  {
    name: "Bald Mountains",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/latemar.jpg",
  },
  {
    name: "Vanoise National Park",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lago.jpg",
  },
];

/***************************************
 *                                      *
 *               Elements               *
 *                                      *
 ***************************************/

const profileEditButton = document.querySelector("#profile-edit-button");
const profileEditModal = document.querySelector("#profile-edit-modal");
const profileEditCloseButton = profileEditModal.querySelector(".modal__close");
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const profileTitleInput = document.querySelector("#profile-name");
const profileDescriptionInput = document.querySelector("#profile-description");
const profileEditForm = profileEditModal.querySelector(".modal__form");
const cardsWrap = document.querySelector(".cards__list");
const cardTemplate =
  document.querySelector("#card-template").content.firstElementChild;

const validationSettings = {
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__button",
  inactiveButtonClass: "modal__button_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible",
};

// Card modal elements
const addNewCardButton = document.querySelector(".profile__add-button");
const addCardModal = document.querySelector("#add-place-modal");
const addCardFormEl = addCardModal.querySelector(".modal__form");
const addCardCloseButton = addCardModal.querySelector(".modal__close");
const cardTitleInput = document.querySelector("#card-title");
const cardUrlInput = document.querySelector("#card-url");

const addCardSubmitBtn = addCardModal.querySelector(
  validationSettings.submitButtonSelector
);

const cardSelector = "#card-template";

//image preview elements
const imagePreviewModal = document.querySelector("#image-preview-modal");

const closeImageBtn = imagePreviewModal.querySelector(".modal__close");

const editFormValidator = new FormValidator(
  validationSettings,
  profileEditForm
);
editFormValidator.enableValidation();

const addFormValidator = new FormValidator(validationSettings, addCardFormEl);

addFormValidator.enableValidation();

function closePopup(modal) {
  modal.classList.remove("modal_opened");
  document.removeEventListener("keydown", closeByEscape);
  modal.removeEventListener("mousedown", closeByClick);
}
function openPopup(modal) {
  modal.classList.add("modal_opened");
  document.addEventListener("keydown", closeByEscape);
  modal.addEventListener("mousedown", closeByClick);
}

function renderCard(cardData, wrapper) {
  const card = new Card(cardData, cardSelector).getView();
  wrapper.prepend(card);
}

/***************************************
 *                                      *
 *            Events Handlers           *
 *                                      *
 ***************************************/

function handleProfileEditSubmit(e) {
  e.preventDefault();
  profileTitle.textContent = profileTitleInput.value;
  profileDescription.textContent = profileDescriptionInput.value;
  closePopup(profileEditModal);
}

function handleAddCardSubmit(e) {
  e.preventDefault();
  const name = cardTitleInput.value;
  const link = cardUrlInput.value;
  renderCard({ name, link }, cardsWrap);
  closePopup(addCardModal);
  addCardFormEl.reset();
  toggleButtonState([cardTitleInput, cardUrlInput], addCardSubmitBtn, config);
}

// ! ||--------------------------------------------------------------------------------||
// ! ||                                  Close Overlay                                ||
// ! ||--------------------------------------------------------------------------------||
function closeByEscape(evt) {
  if (evt.key === "Escape") {
    const openedPopup = document.querySelector(".modal_opened");
    closePopup(openedPopup);
  }
}

function closeByClick(evt, modal) {
  if (
    evt.target.classList.contains("modal__close") ||
    evt.target.classList.contains("modal_opened")
  ) {
    closePopup(evt.currentTarget);
  }
}

/***************************************
 *                                      *
 *            Event Listeners           *
 *                                      *
 ***************************************/

profileEditButton.addEventListener("click", () => {
  profileTitleInput.value = profileTitle.textContent;
  profileDescriptionInput.value = profileDescription.textContent;
  openPopup(profileEditModal);
});

profileEditForm.addEventListener("submit", handleProfileEditSubmit);
addCardFormEl.addEventListener("submit", handleAddCardSubmit);

// New card
addNewCardButton.addEventListener("click", () => openPopup(addCardModal));

initialCards.forEach((cardData) => renderCard(cardData, cardsWrap));
