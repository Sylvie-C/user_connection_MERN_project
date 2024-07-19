import dotenv from "dotenv"; 
dotenv.config() ; 

import mongoose from 'mongoose';

const uri = process.env.MONGO_URI || "" ; 

mongoose.connect (uri)
.then(() => { console.log("Connected to MongoDB with Mongoose."); } )
.catch(err => { console.error("Error connecting to MongoDB:", err); });

export default mongoose;
