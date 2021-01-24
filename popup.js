let changeColor = document.getElementById("switch");
let svgPath = document.getElementById("power-off-path");

var isTurnedOn = null;

console.log(svgPath);

chrome.storage.local.get("detoxifierOn", function (data) {
  isTurnedOn = data.detoxifierOn === true;
  if (isTurnedOn) {
    svgPath.style.fill = "rgb(194, 39, 39)";
  } else {
    svgPath.style.fill = "rgb(39, 167, 0)";
  }
});

changeColor.onclick = function (element) {
  chrome.storage.local.get("detoxifierOn", function (data) {
    isTurnedOn = data.detoxifierOn === true;

    if (isTurnedOn) {
      // then turn off
      svgPath.style.fill = "rgb(194, 39, 39)";

      chrome.storage.local.set({ detoxifierOn: false }, function () {
        console.log("The detoxifier is off.");
      });
    } else {
      // else turn on
      svgPath.style.fill = "rgb(39, 167, 0)";
      chrome.storage.local.set({ detoxifierOn: true }, function () {
        console.log("The detoxifier is on.");
      });
    }
  });
};
