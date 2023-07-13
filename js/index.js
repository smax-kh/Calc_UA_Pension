let inputYearUser = 0;
let inputNameUser = "";
let inputEmailUser = "";
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
  console.log(Number.parseInt(inputYearUser) + 1);
}
window.onload = function () {
  yearCheck();
};

function emailCheck() {
  let emailUser;
}

function nameParse() {
  let nameUser;
}

function yearCheck() {
  let yearUserInput = document.querySelectorAll("input");
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

    if (inputYearUser < 1940 || inputYearUser > 2023) {
      console.log("YES");
      event.target.classList.add("inputRed");
    } else {
      console.log("NOO");
      event.target.classList.remove("inputRed");
    }
  };
}
