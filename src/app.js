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

app.patch("/user/:userId",async(req,res)=>{
    const data = req.body
    const userId = req.params?.userId

    const ALLOWED_UPDATES = ["photoUrl", "about", "gender", "age", "skills"];

    const IsAllowedUpdates = Object.keys(data).every((k)=> ALLOWED_UPDATES.includes(k))

    if(!IsAllowedUpdates){
        throw new Error("updates not allowed")
    }

    if(data?.skills.length>10){
        throw new Error("updates not allowed")
    }

    const user = await User.findByIdAndUpdate({_id: userId}, data,{runValidators: true})
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















