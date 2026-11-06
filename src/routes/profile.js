const express  = require("express")
const profileRouter = express.Router()
const { userAuth } = require('../middlewares/auth')
const user = require("../models/user")
const {} = require("../utils/validate")


//PROFILE VIEW API
profileRouter.get("/profile/view",userAuth, async(req,res)=>{
    try{

        const user = req.user
        
        res.send(user)
    }
     catch (err) {
        console.error(err)
        res.status(500).send("Something went wrong"+ err.message)
    }
})

//profile edit api
profileRouter.patch("/profile/edit",userAuth, async (req,res)=>{
try{
    
    if(!validateEditdata(req)){
        throw new Error("not allowed to edit")
    }

    loginUser= req.user

    Object.keys(req.body).forEach((key)=>{loginUser[key] = req.body[key]})
    await loginUser.save()

    res.send("profile edit successfully")
}

 catch (err) {
        console.error(err)
        res.status(500).send("Something went wrong"+ err.message)
    }
})

//password
profileRouter.patch("/forgotPassword", userAuth, async (req, res) => {
    try {
        const user = req.user

        const { password } = req.body

        user.password = password

        await user.save()

        res.send("Password updated successfully")
    }
    catch (err) {
        console.error(err)
        res.status(500).send("Something went wrong")
    }
})

module.exports = profileRouter

