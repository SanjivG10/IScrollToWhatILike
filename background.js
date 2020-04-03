// we check in background js if the currently working tab is under the save state because 
// thats the only site we are saving state of, not all
// okay so when do we save state then? when the active tab is changed or when the tab is removed.. so it the two cases! 

let currentTab; 
var scrollYPosition; 

chrome.tabs.onUpdated.addListener(function(tabId,changeInfo,tab){
    if(changeInfo.status=="complete"){
        currentTab = tab.url.toString().trim();
        if(currentTab)
        {
            chrome.storage.local.get(currentTab,function(result){
                const totalKeys = Object.keys(result)
                    if (totalKeys.length){
                        const scrollHeight = result[totalKeys[0]]; 
                        if(scrollHeight>5)
                        {
                            chrome.tabs.sendMessage(tab.id, {scrollHeight}, function(response) {});  
                        }
                    }
            })
        }
    }
}); 

chrome.runtime.onMessage.addListener(
    function(message, sender, sendResponse) {
        const localKeys = Object.keys(message); 
        
        scrollYPosition = message[localKeys[0]];

        chrome.storage.local.set(message, function() {
        });    
});

chrome.tabs.query({currentWindow: true, active: true}, function(tabs){
    currentTab=tabs[0].url.toString().trim();
    chrome.storage.local.get(currentTab,function(result){
        const totalKeys = Object.keys(result)
            if (totalKeys.length){
                const scrollHeight = result[totalKeys[0]]; 
                if(scrollHeight>5)
                {
                    chrome.tabs.sendMessage(tabs[0].id, {scrollHeight}, function(response) {});  
                }
            }
    })
});


