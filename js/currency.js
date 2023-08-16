document.addEventListener("DOMContentLoaded", (event) => {
  reqvestCurrencyMono(urlCurrencyMonoBank);
});

/*
const reqvestCurrencyMono = function (url) {
  let count = 0;
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
};
*/

async function reqvestCurrencyMono(url) {
  let count = 0;
  try {
    const response = await fetch(url);
    if (response.ok) {
      let data = await response.json();
      console.log("answer", data);
      parseCurrency(data);
      document.querySelector(".containerSpiner").classList.add("hide");
      document.querySelector(".CurrencyMonoBank").classList.remove("hide");
    } else {
      const er = new Error("Bad response " + response.status);
      throw er;
    }
  } catch (er) {
    console.log("catch " + er);
    document.querySelector(".containerSpiner").classList.remove("hide");
    document.querySelector(".CurrencyMonoBank").classList.add("hide");
    let timerId = setInterval(() => console.log("need insert function"), 10000);
  } finally {
    console.log("Done!");
  }
}

function parseCurrency(el) {
  el.forEach((item) => {
    if (item.currencyCodeA === 840 && item.currencyCodeB === 980) {
      document.querySelector(".tableRowCurrency.dollar .sell").innerHTML =
        Math.round(100 * item.rateSell) / 100;
      document.querySelector(".tableRowCurrency.dollar .buy").innerHTML =
        Math.round(100 * item.rateBuy) / 100;
    }
    if (item.currencyCodeA === 978 && item.currencyCodeB === 980) {
      document.querySelector(".tableRowCurrency.euro .sell").innerHTML =
        Math.round(100 * item.rateSell) / 100;
      document.querySelector(".tableRowCurrency.euro .buy").innerHTML =
        Math.round(100 * item.rateBuy) / 100;
    }
  });
}
