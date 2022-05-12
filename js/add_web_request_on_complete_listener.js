import { addPrNotApprovedTab } from '../common/js/add_pr_not_approved_tab.js'

function executeScriptListener(details) {
    setTimeout(() => {
        chrome.scripting.executeScript({
            target: { tabId: details.tabId !== -1 ? details.tabId : undefined },
            function: addPrNotApprovedTab,
        })
    }, 100)
}

function addOnCompletedListener(filterUrlList) {
    const filter = {
         urls: (filterUrlList ?? []).concat("https://github.com/pulls*")
    }
    chrome.webRequest.onCompleted.removeListener(executeScriptListener)
    chrome.webRequest.onCompleted.addListener(executeScriptListener, filter)
}

chrome.storage.onChanged.addListener((changes, areaName) => {
    addOnCompletedListener(changes.filterUrlList.newValue)
})
 
chrome.storage.sync.get("filterUrlList", ({filterUrlList}) => {
    addOnCompletedListener(filterUrlList)
})
