let changeColor = document.getElementById("switch");

changeColor.onclick = function (element) {
  let svgPath = document.getElementById("power-off-path");

  let turnedOn = svgPath.style.fill === "rgb(39, 167, 0)" ? true : false;

  // ... then turn off
  if (turnedOn) {
    svgPath.style.fill = "rgb(194, 39, 39)";
  } else {
    svgPath.style.fill = "rgb(39, 167, 0)";
  }
};
