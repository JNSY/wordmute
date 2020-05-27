chrome.contextMenus.create({
    id: "some-command",
    title:"全ユーザーで「%s」をミュートする",
    contexts:["selection"],
});

chrome.contextMenus.create({
    id: "some-command2",
    title:"このユーザーで「%s」をミュートする",
    contexts:["selection"],
});

chrome.contextMenus.onClicked.addListener(function(info,tab) {
    const queryInfo = {
        active: true,
        windowId: chrome.windows.WINDOW_ID_CURRENT
      };
    chrome.tabs.query(queryInfo, function (result) {
        const currentTab = result.shift();
        const message = {};
        if(info.menuItemId=="some-command"){   
            const muteWord=info.selectionText;
            console.log(muteWord);
            chrome.storage.local.get(null,function(items){
                const allKeys=Object.keys(items);
                const allValues=Object.values(items);
                let judge;
                console.log(allKeys);
                for(var f=0; f<allKeys.length; f++){
                    if(allValues[f]===muteWord){
                        judge="anpan";
                        break;
                    };
                };
                let keyLength=allKeys.length;
                let sprintf = ("000"+keyLength).substr(-4);
                let keyNumber="!key"+sprintf;
                let keyData={[keyNumber]:muteWord};
                
                function setData(){
                    chrome.storage.local.set(
                        keyData, function(){
                        //console.log(muteWord+"がブラックリストに登録されました");
                    }); 
                };
                //既に登録されている場合何もしない
                if(judge=="anpan"){
                }else{
                    setData();
                };
            });
            chrome.tabs.sendMessage(currentTab.id,muteWord,function (response){
                console.log("受け取ったデータ：", response);
            });
        };
    });
});