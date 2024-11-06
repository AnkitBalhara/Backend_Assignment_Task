const mongoose = require("mongoose")

const connectDB = async ()=>{
    try {
        await mongoose.connect("mongodb://localhost:27017/Assignment")
        console.log("Connected Successfully")
    } catch (error) {
        console.log("Connection error in MongoDB :-",error)
    }
}

module.exports = connectDB;