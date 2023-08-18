function setData(name, value, date) {
  let item = Math.round(100 * value) / 100;
  localStorage.setItem(name, item); // all data is String
  localStorage.setItem("date", date); // all data is String
}

function getData(name) {
  return localStorage.getItem(name);
}

function checkDate() {
  let valString = localStorage.getItem("date");
  return valString !== null ? false : true;
  //return true; //from debag
  ``;
}
