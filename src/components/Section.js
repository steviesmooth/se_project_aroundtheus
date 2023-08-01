export default class Section {
  constructor({ items, renderer }, containerSelector) {
    this._renderedItems = items;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  renderItems() {
    this._renderedItems.forEach((item) => {
      this._renderer(item);
    });
  }

  addItem(element) {
    this._container.append(element);
  }
}

//generatecard() is getview()
//setitem() is additem()

// const defaultCardList = new Section({
//   data: items,
//   renderer: (item) => {
//     const card = new DefaultCard(item, ".default-card");
//     const cardElement = card.generateCard();
//     defaultCardList.setItem(cardElement);
//   }
// }, cardListSelector);

// //  constructor({ data, renderer }, containerSelector) {
//   this._renderedItems = data;
//   this._renderer = renderer;
//   this._container = document.querySelector(containerSelector);
// }

// setItem(element) {
//   this._container.append(element);
// }

// clear() {
//   this._container.innerHTML = "";
// }

// renderItems() {
//   this.clear();

//   this._renderedItems.forEach(item => {
//     this._renderer(item);
//   });
// }
// }
