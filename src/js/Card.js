export default class Card {
  constructor(content, coords) {
    this.content = content;
    this.coords = coords;
  }

  init() {
    this.bindToDOM();
  }

  static template(created, content, coords) {
    return `
      <div class="article-box">
        <div class="article__header">${created}</div>
        <div class="article__content">
          <span class="article__post">${content}</span>
        </div>
        <div class="article__footer">
          <span class="geo__coords">[${coords}]</span>
          <span class="geo__icon">&#128681;</span>
        </div>
      </div>`;
  }

  bindToDOM() {
    const panel = document.querySelector(".board");
    const cardHTML = this.addCard();

    if (cardHTML) {
      panel.insertAdjacentHTML("afterbegin", cardHTML);
    }
  }

  addCard() {
    const created = new Date().toLocaleString();
    const inputField = document.querySelector(".text__field");
    const rawContent = inputField.value;
    const content = rawContent.trim();

    if (!content) {
      return false;
    }

    const result = this.constructor.template(created, content, this.coords);

    inputField.value = "";

    return result;
  }
}
