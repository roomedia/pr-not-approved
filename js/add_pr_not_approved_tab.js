function addPrNotApprovedTab() {
    const prNotApproved = document.createElement("a")
    prNotApproved.className = "js-selected-navigation-item subnav-item flex-1 text-center no-wrap hide-sm"
    prNotApproved.text = "Not Approved Review"
    prNotApproved.title = "Pull Requests reviewed but not approved by you"

    const searchText = decodeURIComponent(document.querySelector(".subnav-links > a").href)
    const userName = document.querySelector("meta[name='user-login']").content
    const originalRegex = new RegExp(`(author|assignee|mentions|review-requested|reviewed-by):${userName}`, "g")
    const query = searchText.split("=")[1].split("+").filter((ele) => !originalRegex.test(ele) && ele !== "-review:approved").concat([`reviewed-by:${userName}`, "-review:approved"]).join("+")
    prNotApproved.href = `/pulls?q=${query}`

    const extraRegex = new RegExp(`reviewed-by:${userName}`, "g")
    const isSelected = searchText.search(extraRegex) > -1 && searchText.search("-review:approved") > -1
    if (isSelected) {
        prNotApproved.className += " selected"
    }

    const parent = document.querySelector(".subnav-links")
    parent.querySelectorAll("a").forEach((ele) => {
        ele.href = decodeURIComponent(ele.href).replace(extraRegex, "")
    })
    parent.appendChild(prNotApproved)
}

export { addPrNotApprovedTab }
