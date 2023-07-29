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
  yearCheck();
  emailCheck();
  nameParse();
  sexCheck();
  blockButton();
};

function emailCheck() {
  inputArray[4].oninput = function (event) {
    let filter =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!filter.test(inputArray[4].value)) {
      console.log("Please provide a valid email address");
      event.target.classList.add("inputRed");
      showError(event.target.parentNode);
    } else {
      event.target.classList.remove("inputRed");
      inputEmailUser = this.value;
      hideError(event.target.parentNode);
      console.log(inputEmailUser);
    }

    blockButton();
  };
}

function nameParse() {
  inputArray[0].oninput = function (event) {
    this.value = this.value.replace(/[^A-Za-zА-Яа-я ]+/g, "");
    if (this.value.length > 0) {
      event.target.classList.remove("inputRed");
      hideError(event.target.parentNode);
      inputNameUser = this.value;
    } else {
      event.target.classList.add("inputRed");
      showError(event.target.parentNode);
    }
    blockButton();
  };
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
      showError(event.target.parentNode);
    } else {
      event.target.classList.remove("inputRed");
      hideError(event.target.parentNode);
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
