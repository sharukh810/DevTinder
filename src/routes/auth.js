const express = require("express")
const authRouter = express.Router()
const {validateSignupData} = require('../utils/validate')
const User = require('../models/user')
const bcrypt = require('bcrypt')
const validator =require('validator')
const { now } = require("mongoose")




    // singup api
authRouter.post("/signup", async (req, res) => {
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
            password: hashPassword,
        })

        const savedUser = await user.save();
    const token = await savedUser.getJWT();

    res.cookie("token", token, {
      expires: new Date(Date.now() + 8 * 3600000),
    });

    res.json({ message: "User Added successfully!", data: savedUser });
  } catch (err) {
    res.status(400).send("ERROR : " + err.message);
  }
})


//login api
authRouter.post('/login',async (req,res)=>{
    try{
        const{emailId,password} = req.body

        if(!validator.isEmail(emailId)){
            throw new Error('invalid email')
        }
        const user = await User.findOne({emailId: emailId})
        if(!user){
            throw new Error('invalid emailId')
        }
       
 
        const isPasswordValid = await user.validatePassword(password)

        if(isPasswordValid){
            //JWT COOKIE CREATE
            const token = await user.getJWT()

            //SEND COOKIE TO USER
            res.cookie("token", token )
            res.send(user)
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

//logout api
authRouter.post("/logout",(req,res)=>{
    res.cookie("token",null,{
        expires: new Date(Date.now())
    })

    res.send('logout successfull!!!')
})




module.exports = authRouter