export default class Card {
  constructor(
    { data, handleImageClick, handleDelete, handleLike, userId },
    cardSelector
  ) {
    this._title = data.name;
    this._url = data.link;
    this.likes = data.likes;
    this._cardId = data._id;

    this._cardSelector = cardSelector;
    this._handleImageClick = handleImageClick;
    this._handleDelete = handleDelete;
    this._handleLike = handleLike;
    this._userId = userId;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector(".card")
      .cloneNode(true);

    return cardElement;
  }

  handleLikeButton() {
    this.likes = [];

    this._totalLikes.textContent = this.likes.length;

    if (this.isLiked()) {
      this._likeButton.classList.add("card__like-button_active");
    } else {
      this._likeButton.classList.remove("card__like-button_active");
    }
  }

  _setEventListeners() {
    this._element
      .querySelector(".card__like-button")
      .addEventListener("click", this._handleLike);

    this._element
      .querySelector(".card__delete-button")
      .addEventListener("click", () => this._handleDelete());

    this._element
      .querySelector(".card__image")
      .addEventListener("click", () =>
        this._handleImageClick({ url: this._url, title: this._title })
      );
  }

  handleDeleteButton() {
    this._element.remove();
    this._element = null;
  }

  setlikes(likes) {
    this.likes = likes;
    this._handleLikeButton();
  }

  isLiked() {
    return this.likes.some((item) => item._id === this._userId);
  }

  getView() {
    this._element = this._getTemplate();

    this._likeButton = this._element.querySelector(".card__like-button");
    this._totalLikes = this._element.querySelector(".card__like-count");
    const imageElement = this._element.querySelector(".card__image");

    imageElement.src = this._url;
    imageElement.alt = this._title;
    this._element.querySelector(".card__title").textContent = this._title;

    this.handleLikeButton();

    this._setEventListeners();
    return this._element;
  }
}
