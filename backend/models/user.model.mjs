import mongoose from "../db/connection.mjs"; 

const userSchema = new mongoose.Schema (
  {
    username: { type: String } , 
    email: { type: String , required: true } , 
    password: { type: String , required: true } , 
    date: { type: Date , default: Date.now },
  }
); 

const UserModel = mongoose.model ( 'User' , userSchema ) ; 

export default UserModel ; 