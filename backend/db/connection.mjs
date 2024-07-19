import dotenv from "dotenv"; 
dotenv.config() ; 

import mongoose from 'mongoose';

const ATLAS_URI = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.CLUSTER_PWD}@${process.env.CLUSTER_NAME}.vkngpvd.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority&appName=${process.env.CLUSTER_NAME}` ; 
const uri = ATLAS_URI || "" ; 

mongoose.connect (uri)
.then(() => { console.log("Connected to MongoDB with Mongoose."); } )
.catch(err => { console.error("Error connecting to MongoDB:", err); });

export default mongoose;
