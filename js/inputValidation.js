function nameParse() {
  inputArray[0].oninput = function (event) {
    event.stopPropagation;
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
      event.stopPropagation;
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
    event.stopPropagation;
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
    event.stopPropagation;
    let filter =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!filter.test(inputArray[4].value)) {
      console.log("Please provide a valid email address");
      event.target.classList.add("inputRed");
      showError(event.target.parentNode.parentNode.parentNode);
      showCheckIcon(event.target.parentNode, false);
      inputEmailUser = "";
    } else {
      event.target.classList.remove("inputRed");
      inputEmailUser = this.value;
      hideError(event.target.parentNode.parentNode.parentNode);
      showCheckIcon(event.target.parentNode, true);
    }

    blockButton();
  };
}
