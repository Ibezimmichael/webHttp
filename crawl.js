const { log } = require('console');
const {JSDOM} = require('jsdom');

async function crawlPage(currentURl){
    console.log("craling now");
    try{
        const resp = await fetch(currentURl)
        if (resp.status > 399) {
            console.log(`error in fetch with status code ${resp.status} on page ${currentURl}`);
            return
        }
        const contentType = resp.headers.get("content-type")
        if (!contentType.includes("text/html")) {
            console.log(`Not html response, content: ${contentType} on page ${currentURl}`);
            return
            
        }
        console.log(await resp.text());
    }catch (err){
        console.log(`error in fetch: ${err.message}, on page ${currentURl}`);
    }


}

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
    getURLsFromHTMl,
    crawlPage
}