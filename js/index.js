let inputYearUser = 0;
let inputNameUser = "";
let inputEmailUser = "";
let inputSex = 0;
let inputArray;
let messageOutput;
let flagButtonHide = false;

function inputConteinerHide() {
  document.querySelector(".inputConteiner").classList.add("hide");
  document.querySelector(".CalcConteiner").classList.remove("hide");
}

window.onload = function () {
  inputArray = document.querySelectorAll("input");
  console.log(document.querySelectorAll("input"));
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
          console.log(radio.value);
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
    if (inputData.length > 3) {
      console.log("Too LONG");
      this.value = inputData.substring(0, 4);
    }
    inputYearUser = this.value;
    console.log(inputYearUser);

    let dateNow = new Date().getFullYear();
    if (inputYearUser < dateNow - 80 || inputYearUser > dateNow) {
      event.target.classList.add("inputRed");
      showError(event.target.parentNode.parentNode);
      showCheckIcon(event.target.parentNode, false);
    } else {
      event.target.classList.remove("inputRed");
      hideError(event.target.parentNode.parentNode);
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
      showError(event.target.parentNode.parentNode);
      showCheckIcon(event.target.parentNode, false);
    } else {
      event.target.classList.remove("inputRed");
      inputEmailUser = this.value;
      hideError(event.target.parentNode.parentNode);
      showCheckIcon(event.target.parentNode, true);
      console.log(inputEmailUser);
    }

    blockButton();
  };
}

function blockButton() {
  let btn = document.querySelector(".inputFildButton");
  let divBtn = document.querySelector(".inputBtnAnim");
  let divMessage = document.querySelector(".textInsteadOfButton");
  if (
    document.querySelectorAll(".massageOfError.hide").length === 3 &&
    inputYearUser > 0 &&
    inputEmailUser.length > 0 &&
    inputNameUser.length > 0
  ) {
    btn.style.display = "block";
    divBtn.style.display = "flex";
    hideError(divMessage);
  } else {
    btn.style.display = "none";
    divBtn.style.display = "none";
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

const urlCurrency = "https://demo4108280.mockable.io/";
const urlCurrencyMonoBank = "https://api.monobank.ua/bank/currency";

window.setTimeout(function () {
  console.log("Inside timeout ok");
}, 2000);

fetch(urlCurrency)
  .then((respons) => {
    return respons.json();
  })
  .then((data) => {
    console.log(data);
  });

fetch(urlCurrencyMonoBank).then(function (response) {
  response.text().then(function (text) {
    console.log(text);
  });
});
