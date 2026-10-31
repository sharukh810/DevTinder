const mongoose = require('mongoose')
const validator = require('validator')

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
    pthotUrl: {
        type: String 
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

module.exports = mongoose.model("User", userSchema)

