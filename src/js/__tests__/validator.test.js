import "@testing-library/jest-dom";
import Validator from "../Validator";

describe("Validator", () => {
  let inputEl;
  let validator;
  let tooltip;

  beforeEach(() => {
    inputEl = document.createElement("input");
    validator = new Validator(inputEl);

    tooltip = document.createElement("span");
    tooltip.classList.add("tooltip-active", "hidden");
    document.body.appendChild(tooltip);
  });

  afterEach(() => {
    document.body
      .querySelectorAll(".tooltip-active")
      .forEach((el) => el.remove());
  });

  test("verify() отклоняет широту > 90 и долготу > 180", () => {
    // Тест 1: широта > 90
    inputEl.value = "95, 50";
    const result1 = validator.verify();
    expect(result1).toBe(false);
    expect(tooltip).not.toHaveClass("hidden");
    expect(tooltip.textContent).toBe(
      "Широта должна быть в диапазоне от -90 до 90"
    );

    // Тест 2: долгота > 180
    inputEl.value = "40, 190";
    const result2 = validator.verify();
    expect(result2).toBe(false);
    expect(tooltip.textContent).toBe(
      "Долгота должна быть в диапазоне от -180 до 180"
    );

    // Тест 3: корректные значения
    inputEl.value = "40, 170";
    const result3 = validator.verify();
    expect(result3).toEqual(["40", "170"]);
    expect(tooltip).toHaveClass("hidden");
  });

  test("verify() проверяет формат чисел", () => {
    inputEl.value = "abc, 10";
    const result = validator.verify();
    expect(result).toBe(false);
    expect(tooltip.textContent).toBe(
      "Допустимы только числовые параметры (например, 45.5, -120)"
    );
  });

  test("verify() требует ровно два параметра", () => {
    // Одно значение
    inputEl.value = "40";
    const result = validator.verify();
    expect(result).toBe(false);
    expect(tooltip.textContent).toBe(
      "Введите два параметра через запятую (широта, долгота)"
    );

    // Три значения
    inputEl.value = "10, 20, 30";
    const result2 = validator.verify();
    expect(result2).toBe(false);
    expect(tooltip.textContent).toBe(
      "Введите два параметра через запятую (широта, долгота)"
    );
  });

  test("verify() корректно обрабатывает типографический минус (−)", () => {
    inputEl.value = "51.50851, −0.12572"; // типографический минус
    const result = validator.verify();
    expect(result).toEqual(["51.50851", "−0.12572"]);
    expect(tooltip).toHaveClass("hidden");
  });

  test("verify() обрабатывает квадратные скобки с правильным разделением", () => {
    inputEl.value = "[ 51.5 , -0.12 ]";
    const result = validator.verify();
    expect(result).toEqual(["51.5", "-0.12"]);
    expect(tooltip).toHaveClass("hidden");
  });

  test("verify() отклоняет координаты в квадратных скобках без разделения", () => {
    inputEl.value = "[51.5 -0.12]";
    const result = validator.verify();
    expect(result).toBe(false);
    expect(tooltip.textContent).toBe(
      "Введите два параметра через запятую (широта, долгота)"
    );
  });

  test("verify() корректно обрабатывает пробелы вокруг значений", () => {
    inputEl.value = "  40.5  ,  -120.3  ";
    const result = validator.verify();
    expect(result).toEqual(["40.5", "-120.3"]);
    expect(tooltip).toHaveClass("hidden");
  });

  test("verify() отклоняет отсутствие запятой", () => {
    inputEl.value = "51.5 -0.12";
    const result = validator.verify();
    expect(result).toBe(false);
    expect(tooltip.textContent).toBe(
      "Введите два параметра через запятую (широта, долгота)"
    );
  });

  test("verify() принимает широту = 90", () => {
    inputEl.value = "90, 0";
    const result = validator.verify();
    expect(result).toEqual(["90", "0"]);
    expect(tooltip).toHaveClass("hidden");
  });

  test("verify() принимает широту = -90", () => {
    inputEl.value = "-90, 0";
    const result = validator.verify();
    expect(result).toEqual(["-90", "0"]);
    expect(tooltip).toHaveClass("hidden");
  });

  test("verify() принимает долготу = 180", () => {
    inputEl.value = "0, 180";
    const result = validator.verify();
    expect(result).toEqual(["0", "180"]);
    expect(tooltip).toHaveClass("hidden");
  });

  test("verify() принимает долготу = -180", () => {
    inputEl.value = "0, -180";
    const result = validator.verify();
    expect(result).toEqual(["0", "-180"]);
    expect(tooltip).toHaveClass("hidden");
  });

  test("verify() отклоняет буквы в координатах", () => {
    inputEl.value = "abc, 10";
    const result = validator.verify();
    expect(result).toBe(false);
    expect(tooltip.textContent).toBe(
      "Допустимы только числовые параметры (например, 45.5, -120)"
    );
  });

  test("verify() отклоняет смешанные символы в числе", () => {
    inputEl.value = "51.5a, -0.12";
    const result = validator.verify();
    expect(result).toBe(false);
    expect(tooltip.textContent).toBe(
      "Допустимы только числовые параметры (например, 45.5, -120)"
    );
  });
});
