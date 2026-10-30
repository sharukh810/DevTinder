const AuthAdmin  = (req,res,next)=>{
    console.log("auth is checked")
    //logic
    const token = "xyz"
    const isAdminAuthorized = token === "xyz"
    if(!isAdminAuthorized){
        res.status(401).send('Unauthorized admin')
    }
    else{
        next();
    }
}

module.exports = {AuthAdmin}

