const express = require('express')
const connectDb= require('./config/database')
const app = express()
const User  = require('./models/user')

app.post("/signup",(req,res)=>{
    const user = new User({
        firstName: "sharukh",
        lastName: "nawab",
        emailId: "sharukh@nawab.com",
        password: "sharukh@123"
    })

    user.save()
    res.send("db created successfully")
})



connectDb().then(
    ()=>{
        console.log('db connected successfully')
        app.listen(7777, ()=>{
            console.log('server is succcessfully run on 7777...')
        })
    }
).catch((err)=>{
    console.error("not connected")
})




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
// app.use("/user",(req,res,next)=>{
//     console.log('1st response')
//    // res.send('1st response')
//    next();
// },
// (req,res,next)=>{
//     console.log('2nd response')
//     res.send('2nd response')
//     next()
// },
// (req,res,next)=>{
//     console.log('3rd response')
//     res.send('3rd response')
// },
// (req,res,next)=>{
//     console.log('4th response')
//     res.send('4th response')
// })

// app.use("/admin",AuthAdmin)

// app.get("/admin/GetData",(req,res)=>{
//     res.send('authorized admin')
// })

// app.get("/admin/DeleteData",(req,res)=>{
//     res.send('Data Deleted')
// })


