chrome.runtime.onInstalled.addListener(function () {
    chrome.declarativeContent.onPageChanged.removeRules(undefined, function () {
        chrome.declarativeContent.onPageChanged.addRules([
            {
                conditions: [
                    new chrome.declarativeContent.PageStateMatcher({
                        pageUrl: {hostEquals: "twitter.com"},
                    }),
                ],
                actions: [new chrome.declarativeContent.ShowPageAction()],
            },
        ]);
    });
});

chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {
        if (request.message === "injectAlert") {
            chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
                chrome.tabs.insertCSS(tabs[0].id, {file: "tailwind.min.css"});

                chrome.tabs.executeScript(tabs[0].id, {
                    // code: 'document.body.style.backgroundColor = "' + color + '";',
                    file: "injectAlert.js",
                });
            });

            sendResponse({message: "OK"});
        }
    });

chrome.webNavigation.onHistoryStateUpdated.addListener(function
    (event) {
    // read changeInfo data and do something with it (like read the url)
    console.log("Detected a url change!");
    chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
        chrome.tabs.insertCSS(tabs[0].id, {file: "tailwind.min.css"});

        chrome.tabs.executeScript(tabs[0].id, {
            // code: 'document.body.style.backgroundColor = "' + color + '";',
            file: "injectAlert.js",
        });
    });
}, {url: [{hostEquals: 'twitter.com'}]});

