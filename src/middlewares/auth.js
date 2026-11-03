const jwt = require('jsonwebtoken')
const User = require('../models/user')


const userAuth  = async(req,res,next)=>{
    try{
    
            const cookie = req.cookies
            const {token} = cookie
            if(!token){
                throw new Error('invalia token')
            }
            
            // VERIFY JWT TOKEN
            const decodedMessage = await jwt.verify( token, "Sharukh@786")
            
            const {_id} = decodedMessage
            
            const user = await User.findById({_id})
            req.user = user;
            
            next();
        }
         catch (err) {
            console.error(err)
            res.status(500).send("Something went wrong"+ err.message)
        }
}

module.exports = {userAuth}


