import mongoose from "../db/connection.mjs"; 

const userSchema = new mongoose.Schema (
  {
    username: { type: String } , 
    email: { type: String , required: true , unique: true } , 
    password: { type: String , required: true } , 
    date: { type: Date , default: Date.now },
  }, 
  { versionKey: false }
); 

const UserModel = mongoose.model ( 'User' , userSchema ) ; 

export default UserModel ; 