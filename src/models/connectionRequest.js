const mongoose = require("mongoose")

const sendConnectionRequest = new mongoose.Schema({
    fromUserId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    toUserId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    status: {
        type: String,
        enum: {
            values: ["ignored", "interested" ,"accepted", "rejected" ],
            message: `{VALUE} is incorrect status type`
        }
    }
},{timestamps: true})

sendConnectionRequest.index({fromUserId: 1, toUserId: 1})



module.exports =  mongoose.model("ConnectionRequest", sendConnectionRequest) 