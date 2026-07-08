const status = document.getElementById("status");

document.getElementById("startBtn").addEventListener("click", () => {

    chrome.runtime.sendMessage(
        "kaljjghafnnjgpkdhojoafnmngoompfh",
        {
            action: "START_STUDY"
        },
        (response) => {
            console.log(response);
        }
    );

    status.innerHTML = "Study Mode : ON";

});


document.getElementById("stopBtn").addEventListener("click", () => {

    chrome.runtime.sendMessage(
        "kaljjghafnnjgpkdhojoafnmngoompfh",
        {
            action: "STOP_STUDY"
        },
        (response) => {
            console.log(response);
        }
    );

    status.innerHTML = "Study Mode : OFF";

});