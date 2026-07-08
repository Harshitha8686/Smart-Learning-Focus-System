console.log("✅ Content Script Loaded");

window.addEventListener("message", (event) => {

    if (event.source !== window) return;

    if (!event.data.action) return;

    chrome.runtime.sendMessage(event.data, (response) => {

        if (chrome.runtime.lastError) {
            console.log(chrome.runtime.lastError.message);
            return;
        }

        console.log("✅ Background Response:", response);

    });

});