document.addEventListener("DOMContentLoaded", (event) => {
  if (checkDate()) {
    reqvestCurrencyMono(urlCurrencyMonoBank);
  } else {
    let timeNow = new Date();
    let timeSave = Date.parse(getData("date"));

    if (timeNow - timeSave < 300000) {
      insertCurrencyFormLocalStorage();
      console.log("time to requvest-->", timeNow - timeSave, "<300000");
    } else {
      reqvestCurrencyMono(urlCurrencyMonoBank);
      console.log("requvest time-->", timeNow - timeSave);
    }
  }
});

async function reqvestCurrencyMono(url) {
  let count = 0;
  let intervalId = null;
  console.log("LocalStorage Date-->", checkDate());
  if (count <= 3) {
    try {
      const response = await fetch(url);
      if (response.ok) {
        let data = await response.json();
        console.log("answer", data);
        parseSaveCurrency(data);
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
      count++;
      let intervalId = setInterval(
        () => reqvestCurrencyMono(urlCurrencyMonoBank),
        30000
      );
    } finally {
      console.log("Done!");
    }
  } else {
    clearInterval(intervalId);
    console.log("BED REQUVEST !!!");
  }
}
//parse and save currancy from promise in local storage with Now Date
function parseSaveCurrency(el) {
  el.forEach((item) => {
    if (item.currencyCodeA === 840 && item.currencyCodeB === 980) {
      document.querySelector(".tableRowCurrency.dollar .sell").innerHTML =
        Math.round(100 * item.rateSell) / 100;
      setData("dollarSell", item.rateSell, new Date());

      document.querySelector(".tableRowCurrency.dollar .buy").innerHTML =
        Math.round(100 * item.rateBuy) / 100;
      setData("dollarBuy", item.rateBuy, new Date());
    }
    if (item.currencyCodeA === 978 && item.currencyCodeB === 980) {
      document.querySelector(".tableRowCurrency.euro .sell").innerHTML =
        Math.round(100 * item.rateSell) / 100;
      setData("euroSell", item.rateSell, new Date());
      document.querySelector(".tableRowCurrency.euro .buy").innerHTML =
        Math.round(100 * item.rateBuy) / 100;
      setData("euroBuy", item.rateBuy, new Date());
    }
  });
}

function insertCurrencyFormLocalStorage() {
  document.querySelector(".tableRowCurrency.dollar .sell").innerHTML =
    getData("dollarSell");
  document.querySelector(".tableRowCurrency.dollar .buy").innerHTML =
    getData("dollarBuy");

  document.querySelector(".tableRowCurrency.euro .sell").innerHTML =
    getData("euroSell");
  document.querySelector(".tableRowCurrency.euro .buy").innerHTML =
    getData("euroBuy");
}
