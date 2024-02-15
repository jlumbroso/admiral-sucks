// Called when the user clicks on the browser action.
chrome.action.onClicked.addListener((tab) => {
    // No tabs or host permissions needed!
    console.log("Applying Admiral Sucks! removal to: " + tab.url);
    chrome.scripting.executeScript({
        target: {tabId: tab.id},
        files: ['content.js']
    });
});
