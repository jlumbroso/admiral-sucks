// Called when the user clicks on the browser action.
chrome.browserAction.onClicked.addListener(function(tab) {
    // No tabs or host permissions needed!
    console.log("Applying Admiral Sucks! removal to: " + tab.url);
    chrome.tabs.executeScript({
        file: "content.js"
    });
});
