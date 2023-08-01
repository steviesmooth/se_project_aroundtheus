import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._image = this._popupElement.querySelector(
      ".modal__card-image-preview"
    );
    this._title = this._popupElement.querySelector(".modal__image-title");
  }

  open(data) {
    this._title.textContent = data.name;
    this._image.src = data.link;
    this._image.alt = `Image ${data.link}`;
    super.open();
  }
}
