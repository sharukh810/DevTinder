const express = require("express")
const requestRouter = express.Router()
const { userAuth } = require('../middlewares/auth')
const ConnectionRequest = require("../models/connectionRequest")
const User = require("../models/user")

requestRouter.post("/request/send/:status/:toUserId",
    userAuth,
    async(req,res)=>{
        try{

            const fromUserId = req.user._id
            const toUserId = req.params.toUserId
            const status = req.params.status


            //allow status
            const allowedStatus = ["interested", "ignored"]
            if(!allowedStatus.includes(status)){
            throw new Error('invalid status')
        }


        //same user sending request
        if(fromUserId == toUserId){
            throw new Error("invalid request you sending request to yourself")
        }


          //we check if we sending the request to user is exist in my db or not
          const existUser = await  User.findById(toUserId)
          if(!existUser){
            throw new Error("user not found")  
          }  



          //connection request already exist
        const alreaadyConnectionExists  = await ConnectionRequest.findOne({
            $or: [
                {fromUserId, toUserId},
                {fromUserId: toUserId, toUserId: fromUserId}
            ]
        })
        if(alreaadyConnectionExists){
            throw new Error("connection request already exist")
        }


        const connection = new ConnectionRequest({
            fromUserId,
            toUserId,
            status
        })

        const user  = await connection.save()

        res.json({message: "request saved" , user})
    }
    catch (err) {
        console.error(err)
        res.status(404).send("Something went wrong:  "+ err.message)
    }
    })
  
    
module.exports = requestRouter
