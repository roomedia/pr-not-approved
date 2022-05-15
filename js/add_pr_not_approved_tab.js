function addPrNotApprovedTab() {
    const prNotApproved = document.createElement("a")
    prNotApproved.className = "js-selected-navigation-item subnav-item flex-1 text-center no-wrap hide-sm"
    prNotApproved.text = "Not Approved Review"
    prNotApproved.title = "Pull Requests reviewed but not approved by you"

    const searchText = decodeURIComponent(document.querySelector(".subnav-links > a").href)
    const userName = document.querySelector("meta[name='user-login']").content

    const regex = new RegExp(`(author|assignee|mentions|review-requested):${userName}`, "g")
    const customRegex = new RegExp(`reviewed-by:${userName}|-review:approved`, "g")

    const query = searchText
        .split("=")[1]
        .split("+")
        .filter((ele) => !regex.test(ele) && !customRegex.test(ele))
        .concat([`reviewed-by:${userName}`, "-review:approved"])
        .join("+")
    prNotApproved.href = `/pulls?q=${query}`

    const isSelected = searchText.search(customRegex) > -1
    if (isSelected) {
        prNotApproved.className += " selected"
    }

    const parent = document.querySelector(".subnav-links")
    parent.querySelectorAll("a").forEach((ele) => {
        ele.href = decodeURIComponent(ele.href)
            .replaceAll(customRegex, "")
    })
    parent.appendChild(prNotApproved)
}

export { addPrNotApprovedTab }
