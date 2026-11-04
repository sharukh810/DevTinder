const express = require("express")
const requestRouter = express.Router()
const { userAuth } = require('../middlewares/auth')

requestRouter.post("/sendRequestConnection",userAuth,(req,res)=>{
    const user = req.user
    res.send(user.firstName+ "send connection request")
})

module.exports = requestRouter
