export default class Card {
  constructor({ data, handleImageClick }, cardSelector) {
    this._title = data.title;
    this._url = data.url;

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
        this._handleImageClick({ url: this._url, title: this._title })
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

    imageElement.src = this._url;
    imageElement.alt = this._title;
    this._element.querySelector(".card__title").textContent = this._title;

    return this._element;
  }
}
