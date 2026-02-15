import Board from "./Board";
import Geo from "./Geo";
import Modal from "./Modal";
import Card from "./Card";
import Validator from "./Validator";

export default class Controller {
  constructor(board) {
    this.board = board;
    this.store = []; // склад карточек
    this.geo = new Geo();
  }

  init() {
    this.container = document.querySelector(".container");
    this.board.createBoard();
    const cardsPanel = document.querySelector(".input-wrapper");
    this.addSubscribe(this.container);
    this.modal = new Modal(this.container);

    this.fieldMessage = document.querySelector(".text__field");
  }

  addSubscribe(element) {
    element.addEventListener("keyup", this.keyUp.bind(this));
    element.addEventListener("click", this.completionField.bind(this));
    element.addEventListener("input", this.completionField.bind(this));
    element.addEventListener("click", this.getManualCoords.bind(this));
  }

  completionField(e) {
    // заполнеие полей и удаление подсказок пр этом

    if (
      !e.target.classList.contains("text__field") ||
      !document.querySelector(".tooltip-active")
    ) {
      return;
    }

    Array.from(document.querySelectorAll(".tooltip-active")).forEach((elem) =>
      elem.remove()
    );

    document.querySelector(".text__field").style.outline = "none";
  }

  validityFields(field) {
    // проверка соответствия шаблону, добавление подсказки
    const templateTooltip = document.createElement("span");
    templateTooltip.classList.add("tooltip-active");

    if (
      field.parentElement.lastElementChild.classList.contains("tooltip-active")
    ) {
      return;
    }

    if (field.value === "") {
      this.parentEl.insertAdjacentElement("beforeend", templateTooltip);
      templateTooltip.textContent = "*Заполните поле";
      document.querySelector(".text__field").style.outline = "2px solid red";

      return false;
    }
    return true;
  }

  keyUp(e) {
    e.preventDefault();

    if (document.querySelector(".tooltip-active") || e.code !== "Enter") {
      return;
    }

    this.parentEl = e.target.parentElement;

    const isValid = this.validityFields(document.querySelector(".text__field"));
    if (!isValid) {
      return;
    }
    this.getAutoCoords();
  }

  getAutoCoords() {
    this.position = this.geo.getPosition();
    this.position.then((data) => {
      if (data.success) {
        this.content = this.fieldMessage.value;
        this.coords = [data.latitude, data.longitude];
        this.createPost(this.content, this.coords);
      } else {
        this.modal.redrawModal();
        this.modal.showDescription(data.title, data.message);
      }
    });
  }

  getManualCoords(e) {
    // добавить валидатор
    if (!e.target.classList.contains("modal__add-btn")) {
      return;
    }
    if (document.querySelector(".input__coords").value === "") {
      document.querySelector(".tooltip-active").classList.remove("hidden");
      return;
    }
    this.content = this.fieldMessage.value;
    this.coordsValue = document.querySelector(".input__coords");
    const validator = new Validator(this.coordsValue);

    this.coords = validator.verify();
    if (!this.coords) {
      return;
    }

    this.createPost(this.content, this.coords);
    this.modal.closeModalForm();
  }

  createPost(content, coords) {
    const post = new Card(content, coords);
    post.init();

    console.log(post, "post");
  }
}
