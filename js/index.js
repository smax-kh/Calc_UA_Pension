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

function nameParse() {
  inputArray[0].oninput = function (event) {
    this.value = this.value.replace(/[^A-Za-zА-Яа-я ]+/g, "");
    if (this.value.length > 0) {
      event.target.classList.remove("inputRed");
      hideError(event.target.parentNode.parentNode);
      inputNameUser = this.value;
      showCheckIcon(event.target.parentNode, true);
    } else {
      event.target.classList.add("inputRed");
      showError(event.target.parentNode.parentNode);
      showCheckIcon(event.target.parentNode, false);
    }
    blockButton();
  };
}
function sexCheck() {
  let sexRB = document.querySelector("fieldset");
  sexRB.addEventListener(
    "click",
    (event) => {
      let radioBtns = document.getElementsByName("Sex");
      for (const radio of radioBtns) {
        if (radio.checked) {
          sexCheck = radio.value;
        }
      }
      blockButton();
    },
    false
  );
}

function yearCheck() {
  inputArray[3].oninput = function (event) {
    this.value = inputArray[3].value.replace(/\D/, "");
    let inputData = inputArray[3].value;
    if (inputData.length > 4) {
      console.log("Error Too LONG Year");
      this.value = inputData.substring(0, 4);
    }
    inputYearUser = this.value;

    //validation
    let dateNow = new Date().getFullYear();
    if (inputYearUser < dateNow - 80 || inputYearUser > dateNow) {
      event.target.classList.add("inputRed");
      showError(event.target.parentNode.parentNode.parentNode);
      showCheckIcon(event.target.parentNode, false);
    } else {
      event.target.classList.remove("inputRed");
      hideError(event.target.parentNode.parentNode.parentNode);
      showCheckIcon(event.target.parentNode, true);
    }
    blockButton();
  };
}

function emailCheck() {
  inputArray[4].oninput = function (event) {
    let filter =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!filter.test(inputArray[4].value)) {
      console.log("Please provide a valid email address");
      event.target.classList.add("inputRed");
      showError(event.target.parentNode.parentNode.parentNode);
      showCheckIcon(event.target.parentNode, false);
    } else {
      event.target.classList.remove("inputRed");
      inputEmailUser = this.value;
      hideError(event.target.parentNode.parentNode.parentNode);
      showCheckIcon(event.target.parentNode, true);
    }

    blockButton();
  };
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
