
const currentURL = location.href.toString().trim()
let topVal = 0

window.addEventListener("scroll", runOnScroll, {passive: true});

function runOnScroll(){
    topVal  = window.pageYOffset || document.documentElement.scrollTop; 
    sendScrollStateToBackGround(topVal); 
}

chrome.runtime.onMessage.addListener(function(scrollHeight,sender,sendResponse){
    if(confirm('This page has saved scroll state. Would you like me to drag you down to where to last came?')){
        window.scrollTo(0,scrollHeight.scrollHeight)
    }
})

function sendScrollStateToBackGround(topVal){
    chrome.storage.local.get(currentURL,function(result){
        const totalKeys = Object.keys(result)
            if (totalKeys.length){
                let value = {}
                value[currentURL] = topVal
                // means thats the site whose scroll state has to be saved.
                chrome.runtime.sendMessage(value, function(response) {
                });
            }
    })
}



