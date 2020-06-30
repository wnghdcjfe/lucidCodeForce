const express =require('express')
const app = express();
app.use(express.static('./three.js'))
app.listen(12010)