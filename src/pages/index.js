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
const { cardPreviewImage, addCardModal } = cardSettings;

const CardImagePreview = new PopupWithImage(cardPreviewImage);

const { profileTitle, profileDescription } = userInfoSettings;
const cardForm = document.querySelector("#modal-form");
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
  popupSelector: addCardModal,
  handleFormSubmit: (data) => {
    userInfo.setUserInfo(data);
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
  },
});

// const editFormValidator = new FormValidator(formSettings, profileEditForm);

const addFormValidator = new FormValidator(formSettings, cardForm);

CardImagePreview.setEventListeners();
userInfoPopup.setEventListeners();
NewCard.setEventListeners();

addFormValidator.enableValidation();

addCardBtn.addEventListener("click", () => {
  NewCard.open();
});
