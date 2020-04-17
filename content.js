
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
    let value = {}
    value[currentURL] = topVal

    chrome.runtime.sendMessage(value, function(response) {
        
    });

}



