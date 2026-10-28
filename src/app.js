const express = require('express')

const app = express()

app.use( "/path", (req,res)=>{
    res.send('this is new path')
})

app.use( "/test", (req,res)=>{
    res.send('this is test')
})

app.use(function(req,res){
    res.send('this is main')
})



app.listen(7777, ()=>{
    console.log('server is succcessfully run on 7777...')
})