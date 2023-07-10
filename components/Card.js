const imagePreviewModal = document.querySelector("#image-preview-modal");
const cardImageEl = cardElement.querySelector(".card__image");

function openPopup(modal) {
  modal.classList.add("modal_opened");
  document.addEventListener("keydown", closeByEscape);
  modal.addEventListener("mousedown", closeByClick);
}

function closePopup(modal) {
  modal.classList.remove("modal_opened");
  document.removeEventListener("keydown", closeByEscape);
  modal.removeEventListener("mousedown", closeByClick);
}

function closeByEscape(evt) {
  if (evt.key === "Escape") {
    const openedPopup = document.querySelector(".modal_opened");
    closePopup(openedPopup);
  }
}

function closeByClick(evt) {
  if (
    evt.target.classList.contains("modal__close") ||
    evt.target.classList.contains("modal_opened")
  ) {
    closePopup(evt.currentTarget);
  }
}

export default class Card {
  constructor(cardData, cardSelector) {
    this._name = cardData.name;
    this._link = cardData.link;

    this._cardSelector = cardSelector;
  }

  _setEventListeners() {
    this._element
      .querySelector(".card__like-button")
      .addEventListener("click", this._handleLikeButton.bind(this));

    this._element
      .querySelector(".card__delete-button")
      .addEventListener("click", this._handleDeleteButton);

    this._element
      .querySelector(".card__image")
      .addEventListener("click", this._handlePreviewImage);
  }

  _handleLikeButton() {
    this._element
      .querySelector(".card__like-button")
      .classList.toggle("card__like-button_active");
  }

  _handleDeleteButton() {
    this._element
      .querySelector(".card__delete-button")
      .classList.remove(".card");
  }

  _handlePreviewImage() {
    openPopup(imagePreviewModal);
    const modalImageEl = document.querySelector(".modal__card-image-preview");
    const modalTitleEl = document.querySelector(".modal__image-title");
    modalImageEl.setAttribute("src", cardImageEl.src);
    modalImageEl.alt = cardData.name;
    modalTitleEl.textContent = cardData.name;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector(".card")
      .cloneNode(true);

    return cardElement;
  }

  getView() {
    this._element = this._getTemplate();
    this._setEventListeners();
  }
}
