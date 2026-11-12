const express = require("express")
const { userAuth } = require("../middlewares/auth")
const ConnectionRequest = require("../models/connectionRequest")
const userRouter = express.Router()
const User = require("../models/user")

const USER_SAFE_DATA = "firstName lastName photoUrl age gender about skills";

userRouter.get("/user/requests/received", userAuth , async(req,res)=>{
    try{

        const loginUser = req.user
        
        const connectionRequest = await ConnectionRequest.find({
            toUserId: loginUser._id,
            status: "interested"
        }).populate("fromUserId", USER_SAFE_DATA)
        
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
        }).populate("fromUserId", USER_SAFE_DATA)
      .populate("toUserId", USER_SAFE_DATA);

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

userRouter.get("/feed", userAuth , async (req,res)=>{
    try{
        const USER_SAFE_DATA = "firstName lastName age gender photoUrl skills"
        const loginUser = req.user
        const page = req.query.page || 1
        const limit = parseInt(req.query.limit) || 10
        const skip  = (page-1)*limit

        //we get user except myself and whom i send request or received request or accept or reject the request

        const connectionRequest = await ConnectionRequest.find({
            $or: 
            [   {fromUserId: loginUser._id},
                {toUserId: loginUser._id}
            ]
        })

        const hideUserFromFeed = new Set()

        connectionRequest.forEach((req)=>{
            hideUserFromFeed.add(req.fromUserId.toString())
            hideUserFromFeed.add(req.toUserId.toString())
        })

        const users = await User.find({
            $and: [{_id: {$nin: Array.from(hideUserFromFeed)}}, {_id: {$ne: loginUser._id}}]
        }).select(USER_SAFE_DATA).skip(skip).limit(limit)

        res.json({ data: users });

    }

    catch (err) {
        console.error(err)
        res.status(404).send("Something went wrong:  "+ err.message)
    }

    
})

module.exports = userRouter