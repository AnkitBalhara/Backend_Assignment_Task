const mongoose = require("mongoose")

const connectDB = async ()=>{
    try {
        await mongoose.connect("mongodb+srv://ankitbalhara0123:AnkitMongo123@backenddeveloperassignm.pzqfr.mongodb.net/Assignment")
        console.log("Connected Successfully")
    } catch (error) {
        console.log("Connection error in MongoDB :-",error)
    }
}

module.exports = connectDB;