"use strict"

document.addEventListener("DOMContentLoaded", function(){
    
    chrome.storage.local.get(null,function(items){
        let keyNumbers=Object.keys(items);
        let keyValues=Object.values(items);
        let keyLength=keyValues.length;
        let xy;
        
        //引き出してきたアイテム確認用
        console.log(keyNumbers);
        console.log(keyValues);

        function addList(xy){
            var getUl=document.getElementById("list-group");
            var li=document.createElement("li");
            var lidiv2=document.createElement("div");
            lidiv2.innerHTML = keyValues[xy];
            var dock2 =li.appendChild(lidiv2);

            var deleteBtn = document.createElement("button");
            deleteBtn.innerHTML = "このワードを削除する";
            deleteBtn.id = "buttonID";
            var dock3=li.appendChild(deleteBtn);
            
            let sprintf = ("000"+xy).substr(-4);
            let keyNumber = "!key"+sprintf;
            
            //削除ボタンの動作の定義
            deleteBtn.addEventListener("click",function(){
                chrome.storage.local.remove(keyNumber, function(items){
                    console.log(keyNumber+"を削除しました");

                    let j;

                    for(j=0; j<keyLength-xy; j++){
                        let k = j+1;
                        let f = xy+j;
                        let sprintf2 = ("000"+f).substr(-4);
                        let newKeyNumber = "!key"+sprintf2; 
                        let newValue = keyValues[xy+k];
                        let newKeyValues = {[newKeyNumber]:newValue};
                        chrome.storage.local.set(newKeyValues,function(){});
                  
                        let honya = keyLength-1;
                        let sprintf3 = ("000"+honya).substr(-4);
                        let lastKey = "!key"+sprintf3;
                        chrome.storage.local.remove(lastKey, function(){});
                    
                        location.reload(true);
                    };
                });
                li.parentNode.removeChild(li);

            });

            getUl.appendChild(li);

        };
        
        //addListを、ワード数分くりかえす
        for(var s=0; s<keyLength; s++){
            addList(s)
        };
    });
});



document.getElementById("allDel").addEventListener("click", function(){
    let result=window.confirm("本当に全て削除しますか？");
    if(result==true){
        chrome.storage.local.clear();
        var getUl=document.getElementById("list-group");
        getUl.textContent = null;
        location.reload();
    };
})


var tabs = document.getElementById('menu').getElementsByTagName('a');
var pages = document.getElementById('main').getElementsByTagName('div');

function changeTab() {
   var targetid = this.href.substring(this.href.indexOf('#')+1,this.href.length);
   for(var i=0; i<pages.length; i++) {
      if( pages[i].id != targetid ) {
         pages[i].style.display = "none";
      }
      else {
         pages[i].style.display = "block";
      }
   }
   for(var i=0; i<tabs.length; i++) {
      tabs[i].style.zIndex = "0";
   }
   this.style.zIndex = "10";
   return false;
}



for(var i=0; i<tabs.length; i++) {
   tabs[i].onclick = changeTab;
};


tabs[0].addEventListener("click", function(){
     location.reload();
});


tabs[0].onclick();













