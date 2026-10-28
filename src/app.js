const express = require('express')

const app = express()

app.use("/user/:userId", (req,res)=>{

    console.log(req.params)
    res.send('got my information')
})

// app.get("/user",(req,res)=>{
//     res.send('get user successfully')
// })


// app.post("/user",(req,res)=>{
//     res.send('post user successfully')
// })


// app.delete("/user",(req,res)=>{
//     res.send('delete user successfully')
// })


// app.patch("/user",(req,res)=>{
//     res.send('update user successfully')
// })


app.use( "/test", (req,res)=>{
    res.send('this is test')
})


app.listen(7777, ()=>{
    console.log('server is succcessfully run on 7777...')
})