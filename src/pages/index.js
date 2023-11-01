// ! ||--------------------------------------------------------------------------------||
// ! ||                                    Imports;                                    ||
// ! ||--------------------------------------------------------------------------------||
import Api from "../components/Api.js";
import FormValidator from "../components/FormValidatior.js";
import Card from "../components/Card.js";

import {
  cardSettings,
  formSettings,
  initialCards,
  userInfoSettings,
} from "../utils/constants.js";
import Popup from "../components/Popup.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import Section from "../components/Section.js";
import "../pages/index.css";

import UserInfo from "../components/UserInfo.js";
const addCardBtn = document.querySelector(".profile__add-button");
const profileEditBtn = document.querySelector(".profile__edit-button");
const { cardPreviewImage, addCardModal, cardDeletePopup } = cardSettings;

const cardImagePreview = new PopupWithImage(cardPreviewImage);
const profileTitleInput = document.querySelector("#profile-name");
const profileDescriptionInput = document.querySelector("#profile-description");
const { profileTitle, profileDescription, profileEditModal } = userInfoSettings;
const cardForm = document.querySelector("#modal-form");
const profileForm = document.querySelector("#profile-edit-form");
const cardDeletePreview = new Popup(cardDeletePopup);
// ! ||--------------------------------------------------------------------------------||
// ! ||                                    Classes                                    ||
// ! ||--------------------------------------------------------------------------------||

const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "13f30cc7-68a3-43c7-b9c5-b1c8732ad7e2",
    "Content-Type": "application/json",
  },
});

const editFormValidator = new FormValidator(formSettings, profileForm);

const addFormValidator = new FormValidator(formSettings, cardForm);

editFormValidator.enableValidation();
addFormValidator.enableValidation();

const userInfo = new UserInfo({
  nameSelector: profileTitle,
  jobSelector: profileDescription,
});

function createCard(item) {
  const cardElement = new Card(
    {
      data: item,
      handleImageClick: () => {
        cardImagePreview.open(item);
      },
      handleDelete: () => {},
    },
    cardSettings.cardTemplate
  );
  return cardElement.getView();
}

const cardLayout = new Section(
  {
    items: initialCards,
    renderer: (data) => {
      const cardEl = createCard(data);

      cardLayout.addItem(cardEl);
    },
  },
  cardSettings.cardList
);
cardLayout.renderItems();

const userInfoPopup = new PopupWithForm({
  popupSelector: profileEditModal,
  handleFormSubmit: (userData) => {
    api
      .editProfileApi(userData)
      .then((userData) => {
        userInfo.setUserInfo(userData);
        userInfoPopup.close();
      })
      .catch((err) => {
        console.error(err);
      });
  },
});

const newCardPopup = new PopupWithForm({
  popupSelector: addCardModal,
  handleFormSubmit: (data) => {
    api
      .createCardApi(data)
      .then((data) => {
        const card = createCard(data);
        cardLayout.addItem(card);
        newCardPopup.close();
      })
      .catch((err) => {
        console.error(err);
      });
  },
});

cardImagePreview.setEventListeners();
userInfoPopup.setEventListeners();
newCardPopup.setEventListeners();

addCardBtn.addEventListener("click", () => {
  addFormValidator.toggleButtonState();
  newCardPopup.open();
});

profileEditBtn.addEventListener("click", () => {
  editFormValidator.toggleButtonState();
  const userData = userInfo.getUserInfo();
  profileTitleInput.value = userData.userName;
  profileDescriptionInput.value = userData.userJob;
  userInfoPopup.open();
});
