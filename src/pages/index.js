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
const addCardBtn = document.querySelector(".profile__add-button");
const { cardPreviewImage, addCardModal } = cardSettings;

const CardImagePreview = new PopupWithImage(cardPreviewImage);
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

const AddCardEditor = new PopupWithForm({
  popupSelector: addCardModal,
  handleFormSubmit: () => {},
});

AddCardEditor.setEventListeners();

addCardBtn.addEventListener("click", () => {
  AddCardEditor.open();
});
