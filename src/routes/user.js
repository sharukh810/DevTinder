const express = require("express")
const { userAuth } = require("../middlewares/auth")
const ConnectionRequest = require("../models/connectionRequest")
const userRouter = express.Router()

userRouter.get("/user/request/received", userAuth , async(req,res)=>{
    try{

        const loginUser = req.user
        
        const connectionRequest = await ConnectionRequest.find({
            toUserId: loginUser._id,
            status: "interested"
        }).populate("fromUserId", "firstName lastName")
        
        res.json({message: "succesfully", data: connectionRequest})
    }
    catch (err) {
        console.error(err)
        res.status(404).send("Something went wrong:  "+ err.message)
    }
        
})

userRouter.get("/user/connections", userAuth , async (req,res)=>{
    try{
        const loginUser = req.user

        const connectionRequest = await ConnectionRequest.find({
            $or:[
                {fromUserId: loginUser._id , status: "accepted" },
                {toUserId: loginUser._id , status: "accepted" }
            ]
        }).populate("fromUserId" , "firstName lastName age gender skills photoUrl").populate("toUserId" , "firstName lastName age gender skills photoUrl")

        const data = connectionRequest.map((row)=>{
            if(row.fromUserId._id.toString() === loginUser._id.toString()){
                return row.toUserId
            }
            else{
                return row.fromUserId
            }
        })

        res.json({data: data})
    }

    catch (err) {
        console.error(err)
        res.status(404).send("Something went wrong:  "+ err.message)
    }
})

module.exports = userRouter