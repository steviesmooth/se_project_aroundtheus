function closePopup(modal) {
  modal.classList.remove("modal_opened");
  document.removeEventListener("keydown", closeByEscape);
  modal.removeEventListener("mousedown", closeByClick);
}
function openPopup(modal) {
  modal.classList.add("modal_opened");
  document.addEventListener("keydown", closeByEscape);
  modal.addEventListener("mousedown", closeByClick);
}
function closeByEscape(evt) {
  if (evt.key === "Escape") {
    const openedPopup = document.querySelector(".modal_opened");
    closePopup(openedPopup);
  }
}

function closeByClick(evt, modal) {
  if (
    evt.target.classList.contains("modal__close") ||
    evt.target.classList.contains("modal_opened")
  ) {
    closePopup(evt.currentTarget);
  }
}

profileEditButton.addEventListener("click", () => {
  profileTitleInput.value = profileTitle.textContent;
  profileDescriptionInput.value = profileDescription.textContent;
  openPopup(profileEditModal);
});
addNewCardButton.addEventListener("click", () => openPopup(addCardModal));
