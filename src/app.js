const express = require('express');
const app = express();
let port = 6969;

app.use('/',(req,res)=>{
    res.send('bad req')
})

app.listen(port,()=>{
    console.log(`server is runnning on http://localhost:${port}/`)
})

