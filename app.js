const axios = require("axios");
const cheerio = require("cheerio");

// ability to go to a page
const PAGE_STR = "https://news.ycombinator.com/news?p="

async function getPage(page_no) {
    const {data} = await axios.get(PAGE_STR+page_no);
    return data;
}

function getLinks(data){
    const links = [];
    const $ = cheerio.load(data);
    $('a[class="titlelink"]').each(function(i,e){
        const link = $(e).attr('href');
        if(link && link.split('/')[2] && link.split("/")[2].startsWith("github")){
            links.push(link);
        }
    })
    return links;
}
const delay = millis => new Promise((resolve, reject) => {
  setTimeout(_ => resolve(), millis)
});

async function main(){
    const links = [];
    const noOfPages = 10;
    for(let i = 1; i<=noOfPages; i++){
        try{
            const data = await getPage(i);
            const pageLinks = getLinks(data);
            pageLinks.forEach((link)=>{
                links.push(link);
            })
            await delay(500);
        }catch (e) {
            console.log(e)
        }
    }
    console.log(links);
}

main()