// content.js
function injectAlertIfRootAvailable() {
    var root1 = document.querySelector('[aria-labelledby="accessible-list-0"]')
    var root2 = document.querySelector('[aria-labelledby="accessible-list-1"]')
    var root3 = document.querySelector('[aria-labelledby="accessible-list-2"]')
    if (!root1 && !root2 && !root3) {
        // The node we need does not exist yet.
        // Wait 500ms and try again
        window.setTimeout(injectAlertIfRootAvailable, 300);
        return;
    }
    chrome.runtime.sendMessage({message: "injectAlert"}, function (response) {
    });
}

console.log("Checking for injection: ");
injectAlertIfRootAvailable();


