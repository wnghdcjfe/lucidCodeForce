const request = require('request');
const cheerio = require('cheerio');
const express = require('express')
const fxjs = require('fxjs2') 
const cors = require('cors')
const app = express() 
app.use(cors()) 
const set_url = a => b => `https://codeforces.com/contest/${a}/status/page/${b}?order=BY_JUDGED_DESC`
const _req = (a, b) => { 
    const url = set_url(a)(b); 
    return new Promise((resolve, reject) => {
        request(url, function (error, response, html) {
            if (!error && response.statusCode == 200) {
                const $ = cheerio.load(html); 
                let _list = [];
                $('tr').each(function (i, element) { 
                    const _this = $(this).children('td')
                    if(!_this.eq(0).find('a.view-source').attr('href')) return; 
                    const isS = _this.eq(5).text().trim() 
                    if(!isS.includes("Accepted")) return;
                    const solvedlink = "https://codeforces.com" + _this.eq(0).find('a.view-source').attr('href')
                    const problemLink = "https://codeforces.com" + _this.eq(3).find('a').attr('href')
                    const problemName = _this.eq(3).find('a').text().trim()
                    const lang = _this.eq(4).text().trim() 
                    const time = _this.eq(6).text().trim().split(/\s/)[0] 
                    const memory = _this.eq(7).text().trim().split(/\s/)[0]
                    const obj = {
                        "solvedlink" : solvedlink, 
                        "problemLink" : problemLink, 
                        "problemName" : problemName, 
                        "lang" : lang, 
                        "time" : time, 
                        "memory" : memory
                    }  
                    _list.push(obj); 
                });
                resolve(_list);
            }
        })
    });
}
// const test = async(a) =>{
//     let ret = [];
//     for(let i = 1; i <= 10; i++){
//         ret.push(_req(a, i));
//     } 
//     const t = await Promise.all(ret)
//     console.log(fxjs.flat(t))
// }
// test(1182)
app.get('/get/:num', async(req, res) =>{
    const pageNum = req.params.num; 
    let ret = [];
    for(let i = 1; i <= 10; i++){
        ret.push(_req(pageNum, i));
    } 
    const t = await Promise.all(ret) 
    res.send(fxjs.flat(t))
})

app.listen(3000)