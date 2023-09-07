urlIpApi = "https://ipapi.co/json/";
document.addEventListener("DOMContentLoaded", (event) => {
  requvestIpFoundApi(urlIpApi);
});

async function requvestIpFoundApi(url) {
  let count = 0;
  let intervalId = null;
  url;
  if (count <= 3) {
    try {
      const response = await fetch(url);
      if (response.ok) {
        let data = await response.json();
        console.log("answer", data);
      } else {
        const er = new Error("Bad response IPapi " + response.status);
        throw er;
      }
    } catch (er) {
      console.log("catch response IPapi " + er);
      count++;
      intervalId = setInterval(
        () => reqvestCurrencyMono(urlCurrencyMonoBank),
        30000
      );
    } finally {
      console.log("Done!");
    }
  } else {
    clearInterval(intervalId);
    console.log("BED REQUVEST IPapi!!!");
  }
}
