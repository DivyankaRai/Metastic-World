const express = require('express');
const app = express()
const router = require('./router')
require('./db/db')

app.use(express.json())
app.use(router)

app.listen(8080,()=>{
    console.log("server start on port 8080")
})