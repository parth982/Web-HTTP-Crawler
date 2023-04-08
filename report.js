function printReport(pages){
    console.log('================');
    console.log('REPORT BEGINS');
    console.log('================');
    const sortedPages = sortPages(pages);
    for(const sortedPage of sortedPages){
        const url = sortedPage[0];
        const hits = sortedPage[1];
        console.log(`Found ${hits} links to Page ${url}`);
    }
    console.log('================');
    console.log('END OF REPORT');
    console.log('================');
}


function sortPages(pages){
	// Convert 'pages' onject to 'array'
    const pages_arr = Object.entries(pages);
    // Sort Arr based On Num of Hits on Pages 
    // In Desecending Order
    pages_arr.sort((a,b)=>{
        return b[1]-a[1];
    });
    return pages_arr;
}
module.exports = {sortPages,printReport}; 