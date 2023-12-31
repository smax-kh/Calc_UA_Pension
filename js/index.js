let inputYearUser = 0;
let inputNameUser = "";
let inputEmailUser = "";
let inputSex = 0;
let pension = 0;
let age = 0;
let salary = 0;
let pensionAge = 0;
let categoryCoefficient = 1;
let categoryCoefficientAdd = 0;
let seniority = 0;
let categoryCoefBonus = 0;
let currentCurrency = 0;

const urlCurrency = "https://demo4108280.mockable.io/";
const urlCurrencyMonoBank = "https://api.monobank.ua/bank/currency";

window.onload = function () {
  addListenersForObj();
};
//create Listener for objects
function addListenersForObj() {
  yearCheck();
  emailCheck();
  nameParse();
  sexCheck();
  blockButton();
  additionVisible();
  categoryOfProfession();
  calculationPension();
  checkBoxsInput();

  const rangeArray = document.querySelectorAll(".sliderContainer .slider");
  rangeArray.forEach((element) => {
    rangeInputCounter(element);
  });
}
// if click btn ok hide conteiner with input
function inputConteinerHide() {
  if (!document.querySelector(".inputConteiner").classList.contains("hide")) {
    document.querySelector(".inputConteiner").classList.add("hide");
    document.querySelector(".CalcConteiner").classList.remove("hide");
  } else {
    document.querySelector(".inputConteiner").classList.remove("hide");
    document.querySelector(".CalcConteiner").classList.add("hide");
  }

  foundAge();
  minPensionAge();
  calculationPension();
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
    calculationPension();
  });

  el.parentNode.parentNode
    .querySelector(".icon-chevron-up")
    .addEventListener("click", function () {
      if (Number(item.value) < maxValueItem) {
        item.value = Number(item.value) + 1;
        calculationPension();
      }
    });

  el.parentNode.parentNode
    .querySelector(".icon-chevron-down")
    .addEventListener("click", function () {
      if (Number(item.value) > 0) {
        item.value = Number(item.value) - 1;
        calculationPension();
      }
    });

  item.oninput = function (event) {
    this.value = item.value.replace(/\D/, "");
    el.value = this.value;
    calculationPension();
  };
}

function additionVisible() {
  let el = document.querySelector(".additionButton");
  el.addEventListener("click", () => {
    let item = document.querySelector(".additionElementsContainer");
    if (item.classList.contains("hide")) {
      console.log("unhide");
      item.classList.remove("hide");
    } else {
      console.log("hide");
      item.classList.add("hide");
    }
  });
}

function foundAge() {
  if (inputYearUser > 0) {
    age = new Date().getFullYear() - inputYearUser;
    console.log("age=", age);
  }
}
//this will be calculated pension in value
function calculationPension() {
  salary = document.querySelectorAll(".inputItem")[0].value;
  pensionAge = document.querySelectorAll(".inputItem")[1].value;
  seniority = document.querySelectorAll(".inputItem")[2].value;
  document.querySelector(".textLine1Pansion").innerHTML = Math.round(
    (((pensionAge / age) * seniority) / 35) *
      salary *
      (categoryCoefficient + categoryCoefficientAdd)
  );
  document.querySelector(".textLine1AlternativePension").innerHTML = Math.round(
    1.05 * salary
  );
}

function categoryOfProfession() {
  let categoryProfession = document.querySelector(".radioContainer");
  categoryProfession.addEventListener(
    "click",
    (event) => {
      let radioBtns = document.getElementsByName("Profession");
      for (const radio of radioBtns) {
        if (radio.checked) {
          categoryCoefficient = Number(radio.value);
          calculationPension();
        }
      }
      blockButton();
    },
    false
  );
}

function btnLeftTabClick() {
  document.querySelector(".LeftBlockWithParam").classList.remove("hide");
  document.querySelector(".RightBlockWithParam").classList.add("hide");
}

function btnRightTabClick() {
  document.querySelector(".LeftBlockWithParam").classList.add("hide");
  document.querySelector(".RightBlockWithParam").classList.remove("hide");
  selectCurrency();
}

function checkBoxsInput() {
  let obj = document.getElementsByName("checkBoxes");

  obj.forEach((el) => {
    el.addEventListener("click", (item) => {
      if (item.target.checked) {
        categoryCoefficientAdd +=
          Math.round(100 * Number(item.target.value)) / 100;
      } else {
        categoryCoefficientAdd -=
          Math.round(100 * Number(item.target.value)) / 100;
      }
      calculationPension();
    });
  });
}

function minPensionAge() {
  let item = document.querySelectorAll(".slider")[1];
  if (sexCheck == 1) {
    item.max = 55;
  } else {
    item.max = 65;
  }
}

function selectCurrency() {
  let obj = document.querySelector(".currencyItem");
  obj.addEventListener(
    "click",
    (el) => {
      if (el.target.value === "euro") {
        currentCurrency = getData("euroBuy");
      } else {
        currentCurrency = getData("dollarBuy");
      }

      if (currentCurrency == null) {
        alert(
          "Need ethernet connection from this action!!! curency set default 1 USD dollar = 43 hrn"
        );
        currentCurrency = 43;
        setData("dollarBuy", currentCurrency, new Date());
      }
    },
    false
  );
}
