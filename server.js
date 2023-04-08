const {crawlPage} = require('./crawl');

async function main(){
    if(process.argv.length<3){
        console.log('No Website Provided');
        process.exit(1);
    }
    else if(process.argv.length>3){
        console.log('Too Many Command Line Argumnets');
        process.exit(1);
    }
    const baseURL = process.argv[2];

    console.log(`Started Crawling of ${baseURL}\n`);

    const pages = await crawlPage(baseURL,baseURL,{});
    for(const page of Object.entries(pages)){
        console.log(page);
    }
}
main();