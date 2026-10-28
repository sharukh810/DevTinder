const express = require('express')

const app = express()

// app.use("/user/:userId", (req,res)=>{

//     console.log(req.params)
//     res.send('yes my information')
// })

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


// app.use( "/test", (req,res)=>{
//     res.send('this is test')
// })

//multiple route handlers
app.use("/user",(req,res,next)=>{
    console.log('1st response')
   // res.send('1st response')
   next();
},
(req,res,next)=>{
    console.log('2nd response')
    res.send('2nd response')
    next()
},
(req,res,next)=>{
    console.log('3rd response')
    res.send('3rd response')
},
(req,res,next)=>{
    console.log('4th response')
    res.send('4th response')
})


app.listen(7777, ()=>{
    console.log('server is succcessfully run on 7777...')
})