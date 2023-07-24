let inputYearUser = 0;
let inputNameUser = "";
let inputEmailUser = "";
let inputSex = 0;
let inputArray;
let messageOutput;
let flagName = false;
let flagYear = false;
let flagEmail = false;
let flagButtonHide = false;
function hideElementsOfFormsInput() {
  document.getElementsByClassName("iputInfo")[0].classList.add("hide");
  let divInput1 = document.getElementsByClassName("group_Block_Calc");
  let style1 = divInput1[0].style;
  style1.display = "block";
  console.log(divInput1);
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
      document.getElementById("massageErrorOfEmail").style.display = "block";
      flagEmail = false;
    } else {
      event.target.classList.remove("inputRed");
      inputEmailUser = this.value;
      document.getElementById("massageErrorOfEmail").style.display = "none";
      console.log(inputEmailUser);
      flagEmail = true;
    }

    blockButton();
  };
}

function nameParse() {
  inputArray[0].oninput = function (event) {
    this.value = this.value.replace(/[^A-Za-zА-Яа-я ]+/g, "");
    if (this.value.length > 0) {
      event.target.classList.remove("inputRed");
      document.getElementById("massageErrorofName").style.display = "none";
      flagName = true;
    } else {
      event.target.classList.add("inputRed");
      document.getElementById("massageErrorofName").style.display = "block";
      flagName = false;
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
      document.getElementById("massageErrorOfYear").style.display = "block";
      flagYear = false;
    } else {
      event.target.classList.remove("inputRed");
      document.getElementById("massageErrorOfYear").style.display = "none";
      flagYear = true;
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
  if (flagName && flagYear && flagEmail) {
    btn.style.display = "block";
    divBtn.style.display = "flex";
  } else {
    btn.style.display = "none";
    divBtn.style.display = "none";
  }
}
