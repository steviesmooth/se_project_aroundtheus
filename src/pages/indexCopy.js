import FormValidator from "../components/FormValidatior.js";
import Card from "../components/Card.js";
import { closePopup, openPopup } from "../utils/utils.js";
import { formSettings, initialCards } from "../utils/constants.js";
import Popup from "../components/Popup.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import Section from "../components/Section.js";
import "../pages/index.css";
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

// Card modal elements
const addNewCardButton = document.querySelector(".profile__add-button");
const addCardModal = document.querySelector("#add-place-modal");
const addCardFormEl = addCardModal.querySelector(".modal__form");
const addCardCloseButton = addCardModal.querySelector(".modal__close");
const cardTitleInput = document.querySelector("#card-title");
const cardUrlInput = document.querySelector("#card-url");

const addCardSubmitBtn = addCardModal.querySelector(
  formSettings.submitButtonSelector
);

const cardSelector = "#card-template";

//image preview elements
const imagePreviewModal = document.querySelector("#image-preview-modal");

const closeImageBtn = imagePreviewModal.querySelector(".modal__close");

const editFormValidator = new FormValidator(formSettings, profileEditForm);
editFormValidator.enableValidation();

const addFormValidator = new FormValidator(formSettings, addCardFormEl);

addFormValidator.enableValidation();

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
  addFormValidator.toggleButtonState();
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

// initialCards.forEach((cardData) => renderCard(cardData, cardsWrap));
