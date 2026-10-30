const express = require('express')
const connectDb= require('./config/database')
const app = express()
const User  = require('./models/user')
const user = require('./models/user')

app.use(express.json())


app.post("/signup",async(req,res)=>{
    const user = new User(req.body)
    try{
        await user.save()
        res.send("db created successfully")

    }
    catch(err){
        console.error('not sync')
    }
})    

app.get("/feed",async(req,res)=>{
    const users = await User.find({})
    res.send(users)
})

app.get("/user",async(req,res)=>{
    const userEmail = req.body.emailId

    const user = await User.find({emailId: userEmail})

    res.send(user)
})


app.delete("/user",async(req,res)=>{
    const userId = req.body.userId

    const user = await User.findByIdAndDelete({_id: userId})

    res.send('user deleted successfully')
})

app.patch("/user",async(req,res)=>{
    const data = req.body
    const userId = req.body.userId

    const user = await User.findByIdAndUpdate({_id: userId}, data)
    res.send('user updated successfully')
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


