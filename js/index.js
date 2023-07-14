let inputYearUser = 0;
let inputNameUser = "";
let inputEmailUser = "";
let inputSex = 0;
function functionGo() {
  //скрыть блок iputInfo
  var divInput = document.getElementsByClassName("iputInfo");
  var style = divInput[0].style;
  style.display = "none";
  console.log(divInput);

  var divInput1 = document.getElementsByClassName("group_Block_Calc");
  var style1 = divInput1[0].style;
  style1.display = "block";
  console.log(divInput1);
}
window.onload = function () {
  yearCheck();
  emailCheck();
  nameParse();
  sexCheck();
};

function emailCheck() {
  let emailUser = document.querySelectorAll("input");
  let messageOutput = document.getElementById("massageError");
  let email_flag = false;
  emailUser[4].onkeyup = function (event) {
    let filter =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!filter.test(emailUser[4].value)) {
      console.log("Please provide a valid email address");
      email.focus;
      email_flag = false;
    } else {
      email_flag = true;
    }

    if (!email_flag) {
      event.target.classList.add("inputRed");
      messageOutput.innerText = "Email not valid!!!";
    } else {
      event.target.classList.remove("inputRed");
      messageOutput.innerText = "Enter your data...";
      inputEmailUser = this.value;
      console.log(inputEmailUser);
    }
  };
}

function nameParse() {
  let nameUser = document.querySelectorAll("input");
  let messageOutput = document.getElementById("massageError");
  nameUser[0].onkeyup = function (event) {
    this.value = this.value.replace(/[^A-Za-zА-Яа-я]+/g, "");
    if (this.value.length >= 1) {
      event.target.classList.remove("inputRed");
      messageOutput.innerText = "Enter your data...";
    } else {
      event.target.classList.add("inputRed");
      messageOutput.innerText = "Name must contain only letters!!!";
    }
  };
}

function yearCheck() {
  let yearUserInput = document.querySelectorAll("input");
  let messageOutput = document.getElementById("massageError");
  yearUserInput[3].onkeyup = function (event) {
    this.value = yearUserInput[3].value.replace(/\D/, "");
    let inputData = yearUserInput[3].value;
    let count = inputData.length;
    console.log(count);
    if (count > 3) {
      console.log("Too LONG");
      this.value = inputData.substring(0, 4);
    }
    inputYearUser = this.value;
    if (inputYearUser < 1940 || inputYearUser > new Date().getFullYear()) {
      event.target.classList.add("inputRed");
      messageOutput.innerText = "Year not valid!!!";
    } else {
      event.target.classList.remove("inputRed");
      messageOutput.innerText = "Enter your data...";
    }
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
    },
    false
  );
}
