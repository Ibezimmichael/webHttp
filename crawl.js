const {JSDOM} = require('jsdom');

function getURLsFromHTMl(html, baseURL){
    const urls = []
    const dom = new JSDOM(html)
    const linkElemets = dom.window.document.querySelectorAll("a")
    for (const link of linkElemets) {
        if(link.href.slice(0, 1) === "/"){
            // relative
            try {
                const urlObj = new URL(`${baseURL}${link.href}`)
                urls.push(urlObj.href)
            } catch (err){
                console.log(`error with relative url: ${err.message}`);
            }       
        }else{
            try {
                const urlObj = new URL(link.href)
                urls.push(urlObj.href)
            } catch (err){
                console.log(`error with absolute url: ${err.message}`);
            }  
        }
    }
    return urls
}

function normalizeUrl(url){
    const urlObj = new URL(url)

    const hostPath =  `${urlObj.hostname}${urlObj.pathname}`;
    if (hostPath.length > 0 && hostPath.slice(-1) == "/") {
        return hostPath.slice(0, -1)
    }
    return hostPath;
}

module.exports = {
    normalizeUrl,
    getURLsFromHTMl
}