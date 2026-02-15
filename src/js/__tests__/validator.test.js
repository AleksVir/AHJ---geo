import "@testing-library/jest-dom"; // Добавляем эту строку
import Validator from "../Validator";

describe("Validator", () => {
  let inputEl;
  let validator;

  beforeEach(() => {
    inputEl = document.createElement("input");
    validator = new Validator(inputEl);

    const tooltip = document.createElement("span");
    tooltip.classList.add("tooltip-active", "hidden");
    document.body.appendChild(tooltip);
  });

  afterEach(() => {
    document.body
      .querySelectorAll(".tooltip-active")
      .forEach((el) => el.remove());
  });

  test("getAllowableValue() отклоняет широту > 90 и долготу > 180", () => {
    // Тест 1: широта > 90
    inputEl.value = "95, 50";
    const result1 = validator.getAllowableValue(validator.getValuesArr());
    expect(result1).toBeUndefined();

    const tooltip = document.querySelector(".tooltip-active");
    expect(tooltip).not.toHaveClass("hidden");
    expect(tooltip.textContent).toBe("Допустимые значения широты от -90 до 90");

    // Тест 2: долгота > 180
    inputEl.value = "40, 190";
    const result2 = validator.getAllowableValue(validator.getValuesArr());
    expect(result2).toBeUndefined();

    expect(tooltip.textContent).toBe("Допустимые значения долготы -180 до 180");

    // Тест 3: корректные значения
    inputEl.value = "40, 170";
    const result3 = validator.getAllowableValue(validator.getValuesArr());
    expect(result3).toEqual(["40", "170"]);
    expect(tooltip).toHaveClass("hidden");
  });
});
