let inputYearUser = 0;
let inputNameUser = "";
let inputEmailUser = "";
let inputSex = 0;
let inputArray;
const urlCurrency = "https://demo4108280.mockable.io/";
const urlCurrencyMonoBank = "https://api.monobank.ua/bank/currency";

function inputConteinerHide() {
  document.querySelector(".inputConteiner").classList.add("hide");
  document.querySelector(".CalcConteiner").classList.remove("hide");
}

window.onload = function () {
  inputArray = document.querySelectorAll("input");
  //console.log(document.querySelectorAll("input"));
  yearCheck();
  emailCheck();
  nameParse();
  sexCheck();
  blockButton();

  const rangeArray = document.querySelectorAll(".sliderContainer .slider");
  rangeArray.forEach((element) => {
    rangeInputCounter(element);
  });
};
// window.setTimeout(function () {
//   sendReqvestCurrency(urlCurrencyMonoBank);
//   console.log("reqvestCurrency ok");
//   inputCurrensy();
// }, 5000);

document.addEventListener("DOMContentLoaded", (event) => {
  sendReqvestCurrency(urlCurrencyMonoBank);
});

function sendReqvestCurrency(url) {
  fetch(url).then(function (response) {
    response.json().then(function (data) {
      let theCurrency = data;
      // for (let key in theCurrency[0]) {
      //   console.log(key);
      // }
      theCurrency.forEach((item) => {
        if (item.currencyCodeA === 840 && item.currencyCodeB === 980) {
          document.querySelector(".tableRowCurrency.dollar .sell").innerHTML =
            item.rateSell;
          document.querySelector(".tableRowCurrency.dollar .buy").innerHTML =
            item.rateBuy;
        }
        if (item.currencyCodeA === 978 && item.currencyCodeB === 980) {
          document.querySelector(".tableRowCurrency.euro .sell").innerHTML =
            item.rateSell;
          document.querySelector(".tableRowCurrency.euro .buy").innerHTML =
            item.rateBuy;
        }
      });
    });
  });
}

function blockButton() {
  let btn = document.querySelector(".ButtonOk");
  let divBtn = document.querySelector(".buttonOkDiv");
  let divMessage = document.querySelector(".textInsteadOfButton");
  console.log(
    inputNameUser === "" ? "[wait input Name]" : inputNameUser,
    ",",
    inputYearUser === 0 ? "[wait input Year]" : inputYearUser,
    ",",
    inputEmailUser === "" ? "[wait input Email]" : inputEmailUser
  );
  console.log(
    document.querySelectorAll(".massageOfError.hide").length === 3,
    inputNameUser.length > 0,
    inputYearUser > 0,
    inputEmailUser.length > 0
  );
  if (
    inputYearUser > 0 &&
    inputEmailUser.length > 0 &&
    inputNameUser.length > 0
  ) {
    btn.classList.remove("hide");
    divBtn.classList.remove("hide");
    hideError(divMessage);
    btn.classList.add("inputFildButton");
    divBtn.classList.add("inputBtnAnim");
  } else {
    btn.classList.add("hide");
    divBtn.classList.add("hide");
    btn.classList.remove("inputFildButton");
    divBtn.classList.remove("inputBtnAnim");
    showError(divMessage);
  }
}

function showError(el) {
  el.querySelector(".massageOfError").classList.remove("hide");
}

function hideError(el) {
  el.querySelector(".massageOfError").classList.add("hide");
}

function showCheckIcon(el, boolean) {
  if (boolean) {
    el.querySelector(".icon-ok").classList.remove("hide");
  } else {
    el.querySelector(".icon-ok").classList.add("hide");
  }
}

function rangeInputCounter(el) {
  let item = el.parentNode.parentNode.querySelector(
    ".inputContainer .inputItem"
  );
  let maxValueItem = Number(el.getAttribute("max"));

  el.addEventListener("input", function () {
    item.value = this.value;
  });

  el.parentNode.parentNode
    .querySelector(".icon-chevron-up")
    .addEventListener("click", function () {
      if (Number(item.value) < maxValueItem) {
        item.value = Number(item.value) + 1;
      }
    });

  el.parentNode.parentNode
    .querySelector(".icon-chevron-down")
    .addEventListener("click", function () {
      if (Number(item.value) > 0) {
        item.value = Number(item.value) - 1;
      }
    });

  item.oninput = function (event) {
    this.value = item.value.replace(/\D/, "");
    el.value = this.value;
  };
}
