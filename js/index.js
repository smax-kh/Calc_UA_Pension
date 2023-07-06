function functionGo() { //скрыть блок iputInfo
   var divInput = document.getElementsByClassName ('iputInfo');
   var style = divInput[0].style;
   style.display = "none";
   console.log(divInput);

   var divInput1 = document.getElementsByClassName ('block_Calc');
   var style1 = divInput1[0].style;
   style1.display = "block";
   console.log(divInput1);
}
window.onload = function () {
   console.log("Page loaded");
 };