const mongoose = require('mongoose')

const connectDb = async ()=>{
    await mongoose.connect(process.env.DB_SECRETS)
}

module.exports = connectDb



