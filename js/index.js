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
};

function emailCheck() {
  let emailUser;
}

function nameParse() {
  let nameUser;
}

function yearCheck() {
  let yearUserInput = document.querySelectorAll("input");
  console.log(yearUserInput[4]);
  yearUserInput[3].onkeyup = function (event) {
    if (event.key >= "0" && event.key <= "9") {
      //filter of pressed key
      console.log(yearUserInput[3].value);
    } else {
      let inputVal = yearUserInput[3].value;
      this.value = inputVal.substring(0, inputVal.length - 1); // remove last element in string
      console.log("-X-");
    }

    let inputYearUser = this.value;
    if (inputYearUser.length <= 4) {
      //check length of year
      console.log("FiNAL = ", inputYearUser);
    } else {
      this.value = inputYearUser.substring(0, 4); // remove last symbol
      inputYearUser = this.value;
      console.log("Too many numbers = ", inputYearUser);
    }
  };
}
