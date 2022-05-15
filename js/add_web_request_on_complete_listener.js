import { addPrNotApprovedTab } from './add_pr_not_approved_tab.js'

function executeScriptListener(details) {
    setTimeout(() => {
        browser.tabs.executeScript(
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
    browser.webRequest.onCompleted.removeListener(executeScriptListener)
    browser.webRequest.onCompleted.addListener(executeScriptListener, filter)
}

chrome.storage.onChanged.addListener((changes, areaName) => {
    addOnCompletedListener(changes.filterUrlList.newValue)
})

browser.storage.sync.get("filterUrlList")
    .then(({filterUrlList}) => {
        addOnCompletedListener(filterUrlList)
    })
