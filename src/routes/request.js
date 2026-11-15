const express = require("express")
const requestRouter = express.Router()
const { userAuth } = require('../middlewares/auth')
const ConnectionRequest = require("../models/connectionRequest")
const User = require("../models/user")
const sendEmail = require("../utils/sendEmail")


requestRouter.post(
  "/request/send/:status/:toUserId",
  userAuth,
  async (req, res) => {
    try {
      const fromUserId = req.user._id;
      const toUserId = req.params.toUserId;
      const status = req.params.status;

      const allowedStatus = ["ignored", "interested"];
      if (!allowedStatus.includes(status)) {
        return res
          .status(400)
          .json({ message: "Invalid status type: " + status });
      }

      const toUser = await User.findById(toUserId);
      if (!toUser) {
        return res.status(404).json({ message: "User not found!" });
      }

      const existingConnectionRequest = await ConnectionRequest.findOne({
        $or: [
          { fromUserId, toUserId },
          { fromUserId: toUserId, toUserId: fromUserId },
        ],
      });
      if (existingConnectionRequest) {
        return res
          .status(400)
          .send({ message: "Connection Request Already Exists!!" });
      }

      const connectionRequest = new ConnectionRequest({
        fromUserId,
        toUserId,
        status,
      });

      const data = await connectionRequest.save();

      // const emailRes = await sendEmail.run(
      //   "A new friend request from " + req.user.firstName,
      //   req.user.firstName + " is " + status + " in " + toUser.firstName
      // );
      // console.log(emailRes);

      res.json({
        message:
          req.user.firstName + " is " + status + " in " + toUser.firstName,
        data,
      });
    } catch (err) {
      res.status(400).send("ERROR: " + err.message);
    }
  }
);


    requestRouter.post("/request/review/:status/:requestId", userAuth , async(req,res)=>{


        //loggedIn user is sending the api or not 
        //it is in interested state
        //verify status of user....accepted,rejected
        try{

            const loginUser = req.user
            
        const {status, requestId} = req.params
        
        const loginStatusValid = ["accepted", "rejected"]

        if(!loginStatusValid.includes(status)){
            
            throw new Error("status not valid")
        }

        const connectionCheck = await ConnectionRequest.findOne({
            _id: requestId,
            toUserId: loginUser._id,
            status: "interested" ,
        })

        if(!connectionCheck){
            throw new Error("user not found")
        }

        connectionCheck.status = status

        const data = await connectionCheck.save()

        res.json({message: "you accepted the request" , data})
        
    }

    catch (err) {
        console.error(err)
        res.status(404).send("Something went wrong:  "+ err.message)
    }

    })
    
module.exports = requestRouter
