


// okay this is what I would do
// everytime user opens a website, then I will query the website url 
// if the url matches the url I have saved in the local storage, then I will access its scroll State. 
// then use that scroll state to take it back to you. 

// first we set the website key and its scroll state to 0 in popupjs. This is the confirmation that user wants to save scroll state of that website

// content js will have no work I guess. Or maybe get the scroll state. I dont know! 


let currentTab;

let checkBox = document.getElementById('stateSaver')

chrome.tabs.query({active: true, currentWindow: true}, tabs => {
    currentTab=tabs[0].url.toString().trim(); 
    
    chrome.storage.local.get(currentTab, function(result) {
        const totalKeys = Object.keys(result)
        if (totalKeys.length){
            checkBox.checked=true
        }
        else{
            checkBox.checked=false
        }
    });
});

checkBox.addEventListener( 'change', function() {

    if(this.checked) {
        let value = {}; 
        value[currentTab]=0; 

        chrome.storage.local.set(value, function() {
          });
    } else {
        // uncheck which means I have removed it! 
        chrome.storage.local.remove(currentTab,function(){
        })
    }
});










