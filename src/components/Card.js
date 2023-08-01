import { openPopup } from "../utils/utils.js";

const imagePreviewModal = document.querySelector("#image-preview-modal");
const modalImageEl = document.querySelector(".modal__card-image-preview");
const modalTitleEl = document.querySelector(".modal__image-title");
const cardImageEl = document.querySelector(".modal__card-image-preview");

export default class Card {
  constructor({ data, handleImageClick }, cardSelector) {
    this._name = data.name;
    this._link = data.link;

    this._cardSelector = cardSelector;
    this._handleImageClick = handleImageClick;
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
      .addEventListener("click", () =>
        this._handleImageClick({ link: this._link, name: this._name })
      );
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

  // _handlePreviewImage() {
  //   openPopup(imagePreviewModal);
  //   modalImageEl.src = this._link;
  //   modalImageEl.alt = this._name;
  //   modalTitleEl.textContent = this._name;
  // }

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
