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
async function crawlPage(currrentURL){
    console.log(`Actively Crawling ${currrentURL}\n\n`);
    try{
        const respon = await fetch(currrentURL);
        if(respon.status > 399){
            console.log(`Error in Fetch with the Status Code as: ${respon.status} \nOn Page ${currrentURL}\n`)
            return;
        }

        const contentType = respon.headers.get('content-type');
        console.log(contentType);
        if(!contentType.includes('text/html')){
            console.log(`Non HTML Response, Content Type: ${contentType} \nOn Page ${currrentURL}\n`)
            return;
        }
        console.log(await respon.text());
    }catch(err){
        console.log(`\n\nError in Fetch : ${err.message} \nOn Page ${currrentURL}`);
    }
}

module.exports = {
    normalizeURL,
    getURLsFromHTML,
    crawlPage
};
