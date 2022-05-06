const template = document.createElement("input")
template.type = "text"
template.className = "filter"
template.placeholder = "Input github url"

const filterListNode = document.querySelector("#filter-list")

function getFilterUrlListCallback(filterUrlList) {
    filterUrlList
        ?.filter((value) => value != "https://github.com/pulls*")
        ?.forEach((url) => {
            const inputNode = template.cloneNode()
            inputNode.value = url
            filterListNode.appendChild(inputNode)
        })
}

function setFilterUrlListCallback(filterUrlList) {
    alert(`Saved: [${filterUrlList.join(", ")}]`)
}

const isChrome = navigator.userAgent.match(/chrome|chromium|crios/i)
if (isChrome) {
    chrome.storage.sync.get("filterUrlList", ({filterUrlList}) => {
        getFilterUrlListCallback(filterUrlList)
    })
} else {
    browser.storage.local.get("filterUrlList")
        .then(({filterUrlList}) => {
            getFilterUrlListCallback(filterUrlList)
        })
}

document.querySelector("#add").onclick = () => {
    filterListNode.appendChild(template.cloneNode())
}

document.querySelector("#save").onclick = () => {
    const filterUrlList = Array.from(filterListNode.querySelectorAll(".filter"))
        .map((inputNode) => inputNode.value)
        .filter((value) => value !== "" && value !== "https://github.com/pulls*")
    if (isChrome) {
        chrome.storage.sync.set({filterUrlList}, () => {
            setFilterUrlListCallback(filterUrlList)
        })
    } else {
        browser.storage.local.set({filterUrlList})
            .then(() => {
                setFilterUrlListCallback(filterUrlList)
            })
    }
}
