document.addEventListener("DOMContentLoaded",　function(){
    document.getElementById("optionLink").addEventListener("click",function(){
        chrome.tabs.create({
            "url":chrome.extension.getURL("options.html"),
        });
    });
})