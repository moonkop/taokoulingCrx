export function setLastOpenFormClipboard (key) {
    localStorage.setItem('lastKey', key);
}

export function getLastOpenFormClipboard () {
    return localStorage.getItem('lastKey');
}

export function tryReadValidKeyFromClipboard (): undefined | string {
    try {
        if (!chrome.extension) {
            return '￥UH2lc5umIU8￥'
        }
        let bg = chrome.extension.getBackgroundPage();        // get the background page
        bg.document.body.innerHTML = "";                   // clear the background page

        // add a DIV, contentEditable=true, to accept the paste action
        let helperdiv = bg.document.createElement("div");
        bg.document.body.appendChild(helperdiv);
        helperdiv.contentEditable = 'true';

        // focus the helper div's content
        let range = bg.document.createRange();
        range.selectNode(helperdiv);
        window.getSelection().removeAllRanges();
        window.getSelection().addRange(range);
        helperdiv.focus();

        // trigger the paste action
        bg.document.execCommand("Paste");

        // read the clipboard contents from the helperdiv
        let clipboardContents = helperdiv.innerText;
        console.log({clipboardContents})
        if (isValidKey(clipboardContents)) {
            return clipboardContents;
        }
        ;
    } catch (e) {
        console.error(e);
    }

}

export function isValidKey (key: string) {
    return /^[A-Za-z0-9]{11}$/.test(key)
        || /\W[A-Za-z0-9]{11}\W/.test(key);
}