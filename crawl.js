const {JSDOM} = require('jsdom');

// Function 1.0
function normalizeURL(urlString){
    const urlObj = new URL(urlString);
    const hostPath = `${urlObj.hostname}${urlObj.pathname}`;
    if(hostPath.length > 0 && hostPath.slice(-1) ==='/'){
        return hostPath.slice(0,hostPath.length-1);
    }
    return hostPath;
}

// Function 2.0
function getURLsFromHTML(htmlBody,baseURL){
    const urls = []
    const dom = new JSDOM(htmlBody);
    const AllLinkElems = dom.window.document.querySelectorAll('a');

    for(const Linkelem of AllLinkElems){
        if(Linkelem.href.slice(0,1)==='/'){
            // Relative URL
            try {
                const urlObj = new URL(`${baseURL}${Linkelem.href}`);
                urls.push(urlObj.href); 
            }catch(err){
                console.log(`Error With Relative URL:${err.message}`);
            }
        }else{
            // Absolute URL
            try {
                const urlObj = new URL(Linkelem.href);
                urls.push(urlObj.href);
            }catch(err){
                console.log(`Error with Absolute URL: ${err.message}`);
            }
        }
    }
    return urls;
}

// Function 3.0
async function crawlPage(baseURL,currrentURL,pages){
    
    const baseURLObj = new URL(baseURL);
    const currrentURLObj = new URL(currrentURL);

    if(baseURLObj.hostname!==currrentURLObj.hostname){return pages;}

    const normalizedCurrentURL = normalizeURL(currrentURL);
    if(pages[normalizedCurrentURL]>0){
        pages[normalizedCurrentURL]++;
        return pages;
    }
    pages[normalizedCurrentURL]=1;

    console.log(`Actively Crawling :${currrentURL}`);

    try{
        const respon = await fetch(currrentURL);
        if(respon.status > 399){
            console.log(`Error in Fetch with the Status Code as: ${respon.status} ,On Page ${currrentURL}\n`)
            return pages;
        }

        const contentType = respon.headers.get('content-type');
        if(!contentType.includes('text/html')){
            console.log(`{{{Non HTML Response, Content Type: ${contentType} ,On Page ${currrentURL}}}}`)
            return pages;
        }

        const htmlBody = await respon.text();
        const nextURLS = getURLsFromHTML(htmlBody,baseURL);
        for(const nextURL of nextURLS){
            pages = await crawlPage(baseURL,nextURL,pages) ;
        }
    }catch(err){
        console.log(`\nError in Fetch : ${err.message} ,On Page ${currrentURL}`);
    }
    return pages;
}

module.exports = {
    normalizeURL,
    getURLsFromHTML,
    crawlPage
};
