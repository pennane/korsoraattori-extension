const main = () => {
    chrome.tabs.executeScript({
        file: 'dist/main.js'
    })
}

const openOriginal = () => {
    let url = 'https://korsoraattori.evvk.com/'
    chrome.tabs.create({ url })
}

chrome.browserAction.onClicked.addListener(function (tab) {
    main()
})

chrome.contextMenus.create({
    title: 'Korsoroi sivu',
    contexts: ['browser_action'],
    onclick: () => main()
})

chrome.contextMenus.create({
    title: 'Alkuperäinen korsoraattori',
    contexts: ['browser_action'],
    onclick: () => openOriginal()
})
