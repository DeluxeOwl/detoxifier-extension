let changeColor = document.getElementById("changeColor");

changeColor.onclick = function (element) {
  console.log("clicked");
};

chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
  chrome.tabs.insertCSS(tabs[0].id, { file: "tailwind.min.css" });

  chrome.tabs.executeScript(tabs[0].id, {
    // code: 'document.body.style.backgroundColor = "' + color + '";',
    file: "injectAlert.js",
  });
});
