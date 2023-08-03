// ! ||--------------------------------------------------------------------------------||
// ! ||                                    Imports;                                    ||
// ! ||--------------------------------------------------------------------------------||

import FormValidator from "../components/FormValidatior.js";
import Card from "../components/Card.js";

import {
  cardSettings,
  formSettings,
  initialCards,
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

const { profileTitle, profileDescription, profileEditModal } = userInfoSettings;
const cardForm = document.querySelector("#modal-form");
const profileForm = document.querySelector("#profile-edit-form");

// ! ||--------------------------------------------------------------------------------||
// ! ||                                    Classes                                    ||
// ! ||--------------------------------------------------------------------------------||

const editFormValidator = new FormValidator(formSettings, profileForm);

const addFormValidator = new FormValidator(formSettings, cardForm);

editFormValidator.enableValidation();
addFormValidator.enableValidation();

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
    userInfo.setUserInfo(userData);
    userInfoPopup.close();
    editFormValidator.toggleButtonState();
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
    CardLayout.addItem(card.getView());
    NewCard.close();
    addFormValidator.toggleButtonState();
  },
});

CardImagePreview.setEventListeners();
userInfoPopup.setEventListeners();
NewCard.setEventListeners();

addCardBtn.addEventListener("click", () => {
  NewCard.open();
});

profileEditBtn.addEventListener("click", () => {
  userInfoPopup.open();
});
