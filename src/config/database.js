const mongoose = require('mongoose')

const connectDb = async ()=>{
    await mongoose.connect('mongodb+srv://sharukhnawabdhanbad_db_user:DrAj85JU7Z0yKEKs@sharukhdb.lp8gbbb.mongodb.net/devTinder')
}

module.exports = connectDb



