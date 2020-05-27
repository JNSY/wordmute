//基本動作の定義
function basic_muteFunction(){
    const tweetList = document.getElementsByClassName("TweetTextSize");
    const arrayedList = Array.prototype.slice.call(tweetList);
    //console.log(arrayedList.length); 読み込まれたツイート数の表示
    let allKeys;
    let allValues;
    let keyLength;
    chrome.storage.local.get(null,function(items){
        allKeys=Object.keys(items);
        allValues=Object.values(items);
        keyLength=allKeys.length;
        for(let u = 0; u<arrayedList.length; u++){
            const tweetElm = arrayedList[u];
            const tweet = tweetElm.innerText;
            const p1 = tweetElm.parentNode; const p2 = p1.parentNode; const p3 = p2.parentNode; const p4 = p3.parentNode;
            for(var z=0; z<keyLength; z++){
                if(tweet.includes(allValues[z])){
                    p4.parentNode.removeChild(p4);
                };
            };
        };
    });
    chrome.runtime.onMessage.addListener(function(message, sender, sendResponse){
        //console.log(message+"がミュートワードに設定されました");
        for(let i = 0; i<arrayedList.length; i++){
            const tweetElm = arrayedList[i];
            const tweet = tweetElm.textContent;

            const p1 = tweetElm.parentNode; const p2 = p1.parentNode; const p3 = p2.parentNode; const p4 = p3.parentNode;

            if(tweet.includes(message)){
                p4.parentNode.removeChild(p4);
            };
        };
        return true;
    });
};

function ObserveStream(){
    var observer = new MutationObserver(basic_muteFunction);
    observer.observe(document.getElementsByClassName('stream-items')[0], {
        attributes: true,
        childList:  true
    });
    basic_muteFunction();
};

var observer = new MutationObserver(ObserveStream);
observer.observe(document.getElementsByTagName("body")[0], {
    attributes: true
});