const mongoose = require('mongoose')
const validator = require('validator')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        minLength: 4,
        maxLength: 50
    },
    lastName: {
        type: String
    },
    emailId: {
        type: String,
        unique: true,
        required: true,
        lowercase: true,
        trim: true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error('not valid email')
            }
        }
    },
    password: {
        type: String,
        required: true,
        validate(value){
            if(!validator.isStrongPassword(value)){
                throw new Error('not valid password')
            }
        }
    },
    age: {
        type: Number,
        min: 18
    },
    gender: {
        type: String,
        validator(value){
            if(!["male","female","others"].includes(value)){
                throw new Error("gender data is not valid")
            }
        }
    },
    photoUrl: {
        type: String ,
    },
    about: {
        type: String,
        default: "this is my about sectiom"
    },
    skills: {
        type: [String]
    }
},
{
    timestamps: true
})

userSchema.methods.getJWT = async function(){
    const user = this
    const token = await jwt.sign({_id: user._id}, "Sharukh@786")

    return token;
}

userSchema.methods.validatePassword = async function(passwordEnterByUser){
    const user = this;
    const passwordHash = user.password

     const isPasswordValid = await bcrypt.compare(passwordEnterByUser , passwordHash)

     return isPasswordValid

}

module.exports = mongoose.model("User", userSchema)

