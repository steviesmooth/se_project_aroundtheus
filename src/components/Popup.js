export default class Popup {
  constructor(popupSelector) {
    this._popupElement = document.querySelector(popupSelector);
  }

  open() {
    this._popupElement.classList.add("modal_opened");
    document.addEventListener("click", () => this._closeByEscape());
  }

  close() {
    this._popupElement.classList.remove("modal_opened");
    document.removeEventListener("keyup", () => this._closeByEscape());
  }

  _closeByEscape(evt) {
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
