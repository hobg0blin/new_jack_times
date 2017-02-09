var t = '';
var airHorn = new Audio();
var positionStore = [];
console.log(window.location.href);
chrome.storage.local.get([window.location.href], (result) => {
   positionStore = result[window.location.href] ? result[window.location.href]['positions'] : [];
});
airHorn.src = chrome.runtime.getURL('air-horn-club-sample_1.mp3');
//TODO: make site-specific and eventually shareable, highlight the airhorned text
//for testing purposes, clear cache on pageload
// chrome.storage.local.clear();
function gText(e) {
    t = (document.all) ? document.selection.createRange().text : document.getSelection();
    chrome.storage.local.get([window.location.href], (result) => {
      var array = result[window.location.href]?result[window.location.href]['positions']:[];
      array.unshift(document.body.scrollTop);
      var positions = {};
      positions[window.location.href] = {};
      positions[window.location.href]['positions'] = array;
      positionStore = array;
      chrome.storage.local.set(positions);
    })
}

window.onscroll = function(e) {
  console.log(positionStore);
  positionStore.map(function(x) {
    console.log(x);
    console.log(document.body.scrollTop);
    if ((document.body.scrollTop >= x - 30) && (document.body.scrollTop <= x+ 30)) {
      console.log('foo');
      airHorn.play();
    }
  })
}

document.onmouseup = gText;
if (!document.all) document.captureEvents(Event.MOUSEUP);