// content.js
function injectAlertIfRootAvailable() {
    var root = document.querySelector('[aria-label="Timeline: Your Home Timeline"]')
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
chrome.tabs.onUpdated.addListener(function () {
    injectAlertIfRootAvailable();
});