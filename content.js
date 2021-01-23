// content.js
function injectAlertIfRootAvailable() {
    var root = document.querySelector('[aria-labelledby="accessible-list-0"]')
    if (!root) {
        // The node we need does not exist yet.
        // Wait 500ms and try again
        window.setTimeout(injectAlertIfRootAvailable, 500);
        return;
    }
    chrome.runtime.sendMessage({message: "injectAlert"}, function (response) {
    });
}

injectAlertIfRootAvailable();

