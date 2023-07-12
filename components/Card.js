import { openPopup } from "../utils/utils.js";

const imagePreviewModal = document.querySelector("#image-preview-modal");
const modalImageEl = document.querySelector(".modal__card-image-preview");
const modalTitleEl = document.querySelector(".modal__image-title");

export default class Card {
  constructor(cardData, cardSelector) {
    this._name = cardData.name;
    this._link = cardData.link;

    this._cardSelector = cardSelector;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector(".card")
      .cloneNode(true);

    return cardElement;
  }

  _setEventListeners() {
    this._element
      .querySelector(".card__like-button")
      .addEventListener("click", this._handleLikeButton.bind(this));

    this._element
      .querySelector(".card__delete-button")
      .addEventListener("click", () => this._handleDeleteButton());

    this._element
      .querySelector(".card__image")
      .addEventListener("click", () => this._handlePreviewImage());
  }

  _handleLikeButton() {
    this._element
      .querySelector(".card__like-button")
      .classList.toggle("card__like-button_active");
  }

  _handleDeleteButton() {
    this._element.remove();
    this._element = null;
  }

  _handlePreviewImage() {
    openPopup(imagePreviewModal);
    modalImageEl.setAttribute("src", cardImageEl.src);
    modalImageEl.alt = this._name;
    modalTitleEl.textContent = this._name;
  }

  getView() {
    this._element = this._getTemplate();
    this._setEventListeners();

    const imageElement = this._element.querySelector(".card__image");
    imageElement.src = this._link;
    imageElement.alt = this._name;
    this._element.querySelector(".card__title").textContent = this._name;

    return this._element;
  }
}
