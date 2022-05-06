import { addPrNotApprovedTab } from './add_pr_not_approved_tab.js'

const listener = (details) => {
    setTimeout(() => {
        chrome.tabs.executeScript(
            details.tabId !== -1 ? details.tabId : undefined,
            {
                code: `${addPrNotApprovedTab.toString()} addPrNotApprovedTab();`
            }
        )
    }, 100)
}

function addOnCompletedListener(filterUrlList) {
    const filter = {
         urls: (filterUrlList ?? []).concat("https://github.com/pulls*")
    }
    chrome.webRequest.onCompleted.removeListener(listener)
    chrome.webRequest.onCompleted.addListener(listener, filter)
}

chrome.storage.onChanged.addListener((changes, areaName) => {
    addOnCompletedListener(changes.filterUrlList.newValue)
})
 
const isChrome = navigator.userAgent.match(/chrome|chromium|crios/i)
if (isChrome) {
    chrome.storage.sync.get("filterUrlList", ({filterUrlList}) => {
        addOnCompletedListener(filterUrlList)
    })
} else {
    browser.storage.local.get("filterUrlList")
        .then(({filterUrlList}) => {
            addOnCompletedListener(filterUrlList)
        })
}
