const request = require('request') 
const cheerio = require('cheerio')
const express = require('express') 
const FxJS = require("fxjs")   
const cors = require('cors')   
const path = require('path')   
const app = express()   
app.use(cors())  
app.use(express.static(path.join(__dirname, 'dist'))) 
const set_url = a => b => `https://codeforces.com/contest/${a}/status/page/${b}?order=BY_JUDGED_DESC`  
const set_url2 = a => b => `https://codeforces.com/submissions/${a}/page/${b}`
const _req = (a, b) => { 
    const url = set_url(a)(b)
    return new Promise((resolve, reject) => {
        request(url, function (error, response, html) {
            if (!error && response.statusCode == 200) {
                const $ = cheerio.load(html)
                let _list = []
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
                    _list.push(obj)
                });
                resolve(_list)
            }
        })
    });
} 
const _form = date => ("00" + date).slice(-2)   
const _req2 = (a, b) => { 
    const url = set_url2(a)(b); 
    return new Promise((resolve, reject) => {
        request(url, function (error, response, html) {
            if (!error && response.statusCode == 200) {
                const $ = cheerio.load(html)
                let _list = []
                $('tr').each(function (i, element) { 
                    const _this = $(this).children('td')
                    if(!_this.eq(0).find('a.view-source').attr('href')) return
                    const isS = _this.eq(5).text().trim() 
                    if(!isS.includes("Accepted")) return;

                    let when = _this.eq(1).text().trim()   
                    let d = new Date(when); 
                    d.setHours(d.getHours() + 6)
                    const day = ["일", "월", "화", "수", "목","금","토"]
                    when = `${d.getFullYear()}-${_form(d.getMonth() + 1)}.${_form(d.getDate())} (${day[d.getDay()]}) ${_form(d.getHours())}:${_form(d.getMinutes())}:${_form(d.getSeconds())}`
                    const problemName = _this.eq(3).find('a').text().trim() 
                    const problemLink = "https://codeforces.com" + _this.eq(3).find('a').attr('href')
                    const obj = {
                        "when" : when,  
                        "problemName" : problemName, 
                        "problemLink" : problemLink
                    }  
                    _list.push(obj) 
                });
                resolve(_list)
            }
        })
    });
} 
app.get('/user/:name', async(req, res) =>{
    const userName = req.params.name
    let temp_list = []
    for(let i = 1; i <= 1; i++){
        temp_list.push(_req2(userName, i))
    } 
    let solvedList = await Promise.all(temp_list)   
    const ret = FxJS.go(
        FxJS.flat(solvedList), 
        FxJS.uniqueBy(u => u.problemName)
    )  
    res.send(ret)
}) 
app.get('/contest/:num', async(req, res) =>{
    const pageNum = req.params.num
    let temp_list = []
    for(let i = 1; i <= 10; i++){
        temp_list.push(_req(pageNum, i))
    } 
    const solvedList = await Promise.all(temp_list) 
    const _sort = (a, b) => {
        if(a.time === b.time) return a.memory - b.memory
        return a.time - b.time
    }
    const ret = FxJS.flat(solvedList).sort(_sort)
    res.send(ret)
})

const PORT = process.env.PORT || 3000
app.listen(PORT, ()=>{
    console.log('서버가 시작되었습니다. : http://127.0.0.1:' + PORT)
})