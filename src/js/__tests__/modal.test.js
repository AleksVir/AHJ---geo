import Modal from "../Modal";

const parentEl = document.createElement("div");
document.body.appendChild(parentEl); // Добавляем в DOM, чтобы querySelector работал

const modal = new Modal(parentEl);
modal.redrawModal();

test("modalTitle и modalMessage сеттеры корректно обновляют DOM", () => {
  const titleText = "Тест заголовка";
  const messageText = "Тест сообщения";

  modal.modalTitle = titleText;
  modal.modalMessage = messageText;

  expect(document.querySelector(".modal__title").textContent).toBe(titleText);
  expect(document.querySelector(".modal__message").textContent).toBe(
    messageText
  );

  // Очищаем DOM после теста
  parentEl.remove();
});
