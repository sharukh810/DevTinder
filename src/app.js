
const express = require('express')
const connectDb = require('./config/database')
const app = express()
const cookieParser = require('cookie-parser')
const jwt = require('jsonwebtoken')

const authRouter = require("./routes/auth")
const profileRouter = require("./routes/profile.js")
const requestRouter = require("./routes/request.js")

app.use(express.json())
app.use(cookieParser())

app.use("/", authRouter)
app.use("/", profileRouter)
app.use("/", requestRouter)

// SIGNUP API


//LOGIN API








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
