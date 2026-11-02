
const express = require('express')
const connectDb = require('./config/database')
const app = express()
const User = require('./models/user')
const validateSignupData = require('./utils/validate')
const bcrypt = require('bcrypt')
const validator =require('validator')


app.use(express.json())

// SIGNUP API
app.post("/signup", async (req, res) => {
    const {firstName,lastName,emailId,password} = req.body
    try{
    //validate data
    validateSignupData(req)

    //password encryption
        const hashPassword = await bcrypt.hash(password,10)
    
        const user = new User({
            firstName,
            lastName,
            emailId,
            password: hashPassword
        })

        await user.save()

        res.send("User created successfully") 
    }
    catch (err) {
        console.error(err)
        res.status(500).send("Something went wrong")
    }
})

//LOGIN API
app.post('/login',async (req,res)=>{
    try{
        const{emailId,password} = req.body

        if(!validator.isEmail(emailId)){
            throw new Error('invalid email')
        }
        const user = await User.findOne({emailId: emailId})
        if(!user){
            throw new Error('invalid emailId')
        }
        console.log(user)

        const PasswordValid = await bcrypt.compare(password , user.password)

        if(PasswordValid){
            res.send('login successfull!!!')
        }
        else{
            throw new Error('invalid credentials')
        }


    }
    catch (err) {
        console.error(err)
        res.status(500).send("Something went wrong : " + err.message)
    }
})


// GET ALL USERS
app.get("/feed", async (req, res) => {
    try {
        const users = await User.find({})

        res.send(users)
    }
    catch (err) {
        console.error(err)
        res.status(500).send("Something went wrong")
    }
})  


// GET USER BY EMAIL
app.get("/user", async (req, res) => {
    try {
        const userEmail = req.body.emailId

        const user = await User.find({ emailId: userEmail })

        res.send(user)  
    }
    catch (err) {
        console.error(err)
        res.status(500).send("Something went wrong")
    }
})


// DELETE USER
app.delete("/user", async (req, res) => {
    try {
        const userId = req.body.userId

        const user = await User.findByIdAndDelete(userId)

        if (!user) {
            return res.status(404).send("User not found")
        }

        res.send("User deleted successfully")
    }
    catch (err) {
        console.error(err)
        res.status(500).send("Something went wrong")
    }
})


// UPDATE USER
app.patch("/user/:userId", async (req, res) => {
    try {
        const data = req.body
        const userId = req.params.userId

        const ALLOWED_UPDATES = [
            "photoUrl",
            "about",
            "gender",
            "age",
            "skills"
        ]

        const IsAllowedUpdates = Object.keys(data).every(
            (k) => ALLOWED_UPDATES.includes(k)
        )

        if (!IsAllowedUpdates) {
            return res.status(400).send("Updates not allowed")
        }

        if (data.skills && data.skills.length > 10) {
            return res.status(400).send("Maximum 10 skills allowed")
        }

        const user = await User.findByIdAndUpdate( 
            userId,
            data,
            {
                runValidators: true,
                new: true
            }
        )

        if (!user) {
            return res.status(404).send("User not found")
        }

        res.send("User updated successfully")
    }
    catch (err) {
        console.error(err)
        res.status(500).send("Something went wrong")
    }
})


// DATABASE CONNECTION
connectDb()
    .then(() => {
        console.log('DB connected successfully')

        app.listen(7777, () => {
            console.log('Server is successfully running on 7777...')
        })
    })
    .catch((err) => {
        console.error("DB connection failed:", err)
    })  
