export default class Popup {
  constructor(popupSelector) {
    this._popupElement = document.querySelector(popupSelector);
    this._closeByEscape = this._closeByEscape.bind(this);
  }

  open() {
    this._popupElement.classList.add("modal_opened");
    document.addEventListener("keydown", this._closeByEscape);
  }

  close() {
    this._popupElement.classList.remove("modal_opened");
    document.removeEventListener("keydown", this._closeByEscape);
  }

  _closeByEscape(evt) {
    evt.preventdefault();

    if (evt.key === "Escape") {
      this.close();
    }
  }

  setEventListeners() {
    this._popupElement.addEventListener("mousedown", (evt) => {
      if (
        evt.target.classList.contains("modal__close") ||
        evt.target.classList.contains("modal_opened")
      ) {
        this.close();
      }
    });
  }
}
