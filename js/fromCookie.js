function setCookie(name, value) {
  document.cookie = encodeURIComponent(name) + "=" + encodeURIComponent(value);
}

function getCookie() {
  document.cookie;
}
