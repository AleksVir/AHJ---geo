export default class Validator {
  constructor(inputEl) {
    this.inputEl = inputEl;
    this.result = [];
  }

  verify() {
    const arr = this.getValuesArr();

    const validArr = this.getAllowableValue(arr);

    this.result = [];
    return validArr;
  }

  getValuesArr() {
    let arr = this.inputEl.value.replace(/\[|\]/g, "");
    arr = arr.split(",");

    const notSpace = arr.map((elem) => elem.replaceAll(" ", ""));
    return notSpace;
  }

  getAllowableValue(arr) {
    arr.forEach((el) => {
      const reg = /^-?[0-9][0-9,./]+$/.test(el);
      this.result.push(reg);
    });

    const total = this.someValues(this.result);

    if (total) {
      this.showTooltip("Допустимы только числовые параметры");
      this.result = [];

      return false;
    }
    const validArr = this.getOverlapValue(arr);
    if (validArr) {
      document.querySelector(".tooltip-active").classList.add("hidden");

      return arr;
    }
  }

  getOverlapValue(arr) {
    if (arr.length <= 1 || arr.length > 2) {
      this.showTooltip("Введите второй параметр через запятую");
      return false;
    }
    if (arr[0].replace("-", "") > 90) {
      this.showTooltip("Допустимые значения широты от -90 до 90");
      return false;
    }
    if (arr[1].replace("-", "") > 180) {
      this.showTooltip("Допустимые значения долготы -180 до 180");
      return false;
    }
    document.querySelector(".tooltip-active").classList.add("hidden");

    return arr;
  }

  showTooltip(text) {
    const tooltip = document.querySelector(".tooltip-active");
    tooltip.classList.remove("hidden");
    tooltip.textContent = text;
  }

  someValues(arr) {
    const resultNum = arr.some((elem) => elem === false);

    if (resultNum) {
      return true;
    }
    return false;
  }
}
