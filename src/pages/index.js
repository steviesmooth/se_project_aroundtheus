// ! ||--------------------------------------------------------------------------------||
// ! ||                                    Imports;                                    ||
// ! ||--------------------------------------------------------------------------------||

import FormValidator from "../components/FormValidatior.js";
import Card from "../components/Card.js";
import Popup from "../components/Popup.js";
import {
  cardSettings,
  formSettings,
  initialCards,
  profileSettings,
  userInfoSettings,
} from "../utils/constants.js";

import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import Section from "../components/Section.js";
import "../pages/index.css";

import UserInfo from "../components/UserInfo.js";
const addCardBtn = document.querySelector(".profile__add-button");
const profileEditBtn = document.querySelector(".profile__edit-button");
const { cardPreviewImage, addCardModal } = cardSettings;

const CardImagePreview = new PopupWithImage(cardPreviewImage);
const { name, link } = initialCards;
const { profileTitle, profileDescription, profileEditModal } = userInfoSettings;
const cardForm = document.querySelector("#modal-form");
const profileForm = document.querySelector("#profile-edit-form");
const cardTitleInput = document.querySelector("#card-title");
const cardUrlInput = document.querySelector("#card-url");
// ! ||--------------------------------------------------------------------------------||
// ! ||                                    Classes                                    ||
// ! ||--------------------------------------------------------------------------------||

const userInfo = new UserInfo({
  nameSelector: profileTitle,
  jobSelector: profileDescription,
});

const CardLayout = new Section(
  {
    items: initialCards,
    renderer: (data) => {
      const cardEl = new Card(
        {
          data,
          handleImageClick: () => {
            CardImagePreview.open(data);
          },
        },
        cardSettings.cardTemplate
      );
      CardLayout.addItem(cardEl.getView());
    },
  },
  cardSettings.cardList
);
CardLayout.renderItems();

const userInfoPopup = new PopupWithForm({
  popupSelector: profileEditModal,
  handleFormSubmit: (userData) => {
    userInfo.getUserInfo(userData);
  },
});

const NewCard = new PopupWithForm({
  popupSelector: addCardModal,
  handleFormSubmit: (data) => {
    const card = new Card(
      {
        data,
        handleImageClick: () => {
          CardImagePreview.open(data);
        },
      },
      cardSettings.cardTemplate
    );
    card.getView();
  },
});

const editFormValidator = new FormValidator(formSettings, profileForm);

const addFormValidator = new FormValidator(formSettings, cardForm);

CardImagePreview.setEventListeners();
userInfoPopup.setEventListeners();
NewCard.setEventListeners();

editFormValidator.enableValidation();
addFormValidator.enableValidation();

function handleProfileEditSubmit(userData) {
  userInfo.setUserInfo(userData);
  userInfoPopup.close();
}

function handleAddCardSubmit(data) {
  data.name = cardTitleInput.value;
  data.link = cardUrlInput.value;

  CardLayout.addItem(NewCard);
  NewCard.close();
  addFormValidator.toggleButtonState();
}

addCardBtn.addEventListener("click", () => {
  NewCard.open();
});

profileEditBtn.addEventListener("click", () => {
  userInfoPopup.open();
});

profileForm.addEventListener("submit", handleProfileEditSubmit);
cardForm.addEventListener("submit", handleAddCardSubmit);
