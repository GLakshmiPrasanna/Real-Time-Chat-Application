import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const Connection=async ()=>{

    const url="mongodb+srv://"+process.env.MONGODB_USERNAME+":"+process.env.MONGODB_PASSWORD+"@cluster0.zgkfcib.mongodb.net/?retryWrites=true&w=majority"; 

    try{
        await mongoose.connect(url,{
            useNewUrlParser:true
        })
        console.log("Database connected successfully");
    }
    catch(error){
        console.log("Error while connecting to database",error.message);
    }
}

export default Connection;