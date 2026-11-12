
const express = require('express')
const connectDb = require('./config/database')
const app = express()
const cookieParser = require('cookie-parser')
const jwt = require('jsonwebtoken')

const authRouter = require("./routes/auth")
const profileRouter = require("./routes/profile.js")
const requestRouter = require("./routes/request.js")
const userRouter = require('./routes/user.js')
const cors = require("cors") 



app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
}))

app.use("/", authRouter)
app.use("/", profileRouter)
app.use("/", requestRouter)
app.use("/", userRouter)

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
