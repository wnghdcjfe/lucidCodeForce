const request = require('request');
const cheerio = require('cheerio');
const express = require('express')
const fxjs = require('fxjs2') 
const cors = require('cors')
const path = require('path')
const app = express() 
app.use(cors())  
app.use(express.static(path.join(__dirname, 'dist'))) 
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
app.get('/get/:num', async(req, res) =>{
    const pageNum = req.params.num; 
    let temp_list = [];
    for(let i = 1; i <= 10; i++){
        temp_list.push(_req(pageNum, i));
    } 
    const solvedList = await Promise.all(temp_list) 
    const _sort = (a, b) => {
        if(a.time === b.time) return a.memory - b.memory
        return a.time - b.time;
    }
    const ret = fxjs.flat(solvedList).sort(_sort)
    res.send(ret)
})

app.listen(3000, ()=>{
    console.log('서버가 시작되었습니다. : http://127.0.0.1:3000')
})