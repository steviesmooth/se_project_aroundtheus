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
} from "../utils/constants.js";

import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import Section from "../components/Section.js";
import "../pages/index.css";

const { addCardBtn } = cardSettings;

const CardImagePreview = new PopupWithImage(cardSettings.cardImage);

// ! ||--------------------------------------------------------------------------------||
// ! ||                                    Classes                                    ||
// ! ||--------------------------------------------------------------------------------||

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
CardImagePreview.setEventListeners();

// const profileEditForm = new PopupWithForm("#profile-edit-modal");

// const addCardForm = new PopupWithForm(
//   "add-place-modal",
//   addFormValidator.enableValidation()
// );

// const editFormValidator = new FormValidator(formSettings, profileEditForm);
// editFormValidator.enableValidation();
// const addFormValidator = new FormValidator(formSettings, addCardForm);
// addFormValidator.enableValidation();

// addCardForm.setEventListeners();

// profileEditForm.setEventListeners();

// addCardBtn.addEventListener("click", open());
// profileEditBtn.addEventListener("click", () => {
//   profileEditForm.open();
// });

// profileEditButton.addEventListener("click", () => {
//   profileTitleInput.value = profileTitle.textContent;
//   profileDescriptionInput.value = profileDescription.textContent;
//   openPopup(profileEditModal);
// });

// // New card
// addNewCardButton.addEventListener("click", () => openPopup(addCardModal));
