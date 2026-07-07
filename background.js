console.log("🚀 Background Loaded");

let studyMode = false;

const blockedSites = [
    "youtube.com",
    "instagram.com",
    "facebook.com",
    "twitter.com",
    "netflix.com"
];

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {

    console.log("📩 Message Received");
    console.log(request);

    if (request.action === "START_STUDY") {

        studyMode = true;

        console.log("✅ Study Mode ON");

        sendResponse({
            success: true
        });

        return;
    }

    if (request.action === "STOP_STUDY") {

        studyMode = false;

        console.log("❌ Study Mode OFF");

        sendResponse({
            success: true
        });

        return;
    }

    sendResponse({
        success: false
    });

});

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {

    console.log("Tab Updated", tab.url);

    if (!studyMode) return;

    if (!tab.url) return;

    const blocked = blockedSites.some(site =>
        tab.url.includes(site)
    );

    if (blocked) {

        console.log("🚫 Blocking", tab.url);

        chrome.tabs.update(tabId, {
            url: chrome.runtime.getURL("blocked.html")
        });

    }

});