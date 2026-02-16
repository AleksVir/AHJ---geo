export default class Validator {
  constructor(inputEl) {
    this.inputEl = inputEl;
  }

  verify() {
    const arr = this.getValuesArr();

    if (arr.length !== 2) {
      this.showTooltip("Введите два параметра через запятую (широта, долгота)");
      return false;
    }

    
    const normalizedArr = arr.map((val) => this.normalizeMinus(val));

    const isValidNumbers = normalizedArr.every((val) =>
      this.isValidNumber(val)
    );
    if (!isValidNumbers) {
      this.showTooltip(
        "Допустимы только числовые параметры (например, 45.5, -120)"
      );
      return false;
    }

    const latitude = parseFloat(normalizedArr[0]);
    const longitude = parseFloat(normalizedArr[1]);

    if (latitude < -90 || latitude > 90) {
      this.showTooltip("Широта должна быть в диапазоне от -90 до 90");
      return false;
    }

    if (longitude < -180 || longitude > 180) {
      this.showTooltip("Долгота должна быть в диапазоне от -180 до 180");
      return false;
    }

    this.hideTooltip();
    return arr; 
  }

  getValuesArr() {
    const value = this.inputEl.value.replace(/\[|\]/g, "");
    const arr = value.split(",");
    return arr.map((elem) => elem.trim());
  }

  normalizeMinus(str) {
    return str.replace(/\u2212/g, "-"); 
  }

  isValidNumber(str) {
    return /^[-\u2212]?\d+(\.\d+)?$/.test(str);
  }

  showTooltip(text) {
    const tooltip = document.querySelector(".tooltip-active");
    tooltip.classList.remove("hidden");
    tooltip.textContent = text;
  }

  hideTooltip() {
    const tooltip = document.querySelector(".tooltip-active");
    tooltip.classList.add("hidden");
  }
}
