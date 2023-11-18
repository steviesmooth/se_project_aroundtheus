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
import PopupWithConfirmation from "../components/PopupWithConfirmation.js";
import { data } from "autoprefixer";
const addCardBtn = document.querySelector(".profile__add-button");
const profileEditBtn = document.querySelector(".profile__edit-button");
const { cardPreviewImage, addCardModal, cardDeletePopup } = cardSettings;
const profileImageBtn = document.querySelector(".profile__image-edit");
const cardImagePreview = new PopupWithImage(cardPreviewImage);
const profileTitleInput = document.querySelector("#profile-name");
const profileDescriptionInput = document.querySelector("#profile-description");
const profileImageForm = document.querySelector("#profile-image-form");
const {
  profileTitle,
  profileDescription,
  profileEditModal,
  profileImage,
  profileImageEdit,
} = userInfoSettings;
const cardForm = document.querySelector("#modal-form");
const profileForm = document.querySelector("#profile-edit-form");

let cardSection;
// ! ||--------------------------------------------------------------------------------||
// ! ||                                    Classes                                    ||
// ! ||--------------------------------------------------------------------------------||

const api = new Api({
  url: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "64b25ef0-8d5a-4bc7-8b75-a941c2f020af",
    "Content-Type": "application/json",
  },
});

const editFormValidator = new FormValidator(formSettings, profileForm);
const avatarFormValidator = new FormValidator(formSettings, profileImageForm);
const addFormValidator = new FormValidator(formSettings, cardForm);

editFormValidator.enableValidation();
addFormValidator.enableValidation();
avatarFormValidator.enableValidation();

const userInfo = new UserInfo({
  nameSelector: profileTitle,
  jobSelector: profileDescription,
  avatarSelector: profileImage,
});

function createCard(data) {
  const cardElement = new Card(
    {
      data,
      handleImageClick: (imgData) => {
        cardImagePreview.open(imgData);
      },
      handleDelete: () => {
        confirmPreviewPopup.openPopup(() => {
          confirmPreviewPopup.renderLoading(true);
          api
            .deleteCard(data._id)
            .then(() => {
              cardElement.handleDeleteButton();
              confirmPreviewPopup.close();
            })
            .catch((err) => console.log(`An error occured: ${err}`))
            .finally(() => confirmPreviewPopup.renderLoading(false));
        });
      },
      handleLike: () => {
        if (cardElement.isLiked()) {
          api
            .disLikeCard(cardElement._cardId)
            .then((res) => {
              cardElement.setlikes(res.likes);
            })
            .catch((err) => {
              console.log(`An error occured: ${err}`);
            });
        } else {
          api
            .likeCard(cardElement._cardId)
            .then((res) => {
              cardElement.setlikes(res.likes);
            })
            .catch((err) => {
              console.log(`An error occured: ${err}`);
            });
        }
      },
      userId: userInfo.getId(),
    },
    cardSettings.cardTemplate
  );
  return cardElement.getView();
}

const renderCard = (data) => {
  const cardEl = createCard(data);
  cardSection.addItem(cardEl);
};

Promise.all([api.getInitialCards(), api.getProfileApi()])
  .then(([cards, userData]) => {
    userInfo.setUserInfo(userData);
    cardSection = new Section(
      {
        items: cards,
        renderer: renderCard,
      },
      cardSettings.cardList
    );
    cardSection.renderItems();
  })
  .catch((err) => {
    console.log(err);
  });

const userInfoPopup = new PopupWithForm({
  popupSelector: profileEditModal,
  handleFormSubmit: (userData) => {
    userInfoPopup.renderLoading(true);
    api
      .editProfileApi(userData)
      .then((userData) => {
        userInfo.setUserInfo(userData);
        userInfoPopup.close();
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => userInfoPopup.renderLoading(false));
  },
});

const newCardPopup = new PopupWithForm({
  popupSelector: addCardModal,
  handleFormSubmit: (data) => {
    newCardPopup.renderLoading(true);
    api
      .createCardApi(data)
      .then((data) => {
        renderCard(data);
        newCardPopup.close();
        addFormValidator.disableButton();
      })
      .catch((err) => console.log(`An error occured ${err}`))
      .finally(() => newCardPopup.renderLoading(false));
  },
});

const profileImagePopup = new PopupWithForm({
  popupSelector: profileImageEdit,
  handleFormSubmit: (data) => {
    profileImagePopup.renderLoading(true);
    api
      .updateAvatar(data)
      .then((data) => {
        userInfo.setUserInfo(data);
        profileImagePopup.close();
      })
      .catch((err) => console.error(err))
      .finally(() => profileImagePopup.renderLoading(false));
  },
});

const confirmPreviewPopup = new PopupWithConfirmation(cardDeletePopup);

cardImagePreview.setEventListeners();
userInfoPopup.setEventListeners();
newCardPopup.setEventListeners();
confirmPreviewPopup.setEventListeners();
profileImagePopup.setEventListeners();

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

profileImageBtn.addEventListener("click", () => {
  avatarFormValidator.disableButton();
  profileImagePopup.open();
});
