import express from "express"; 
import bcrypt from "bcrypt" ; 
import jwt from "jsonwebtoken" ; 

import UserModel from "../models/user.model.mjs" ; 


const router = express.Router() ; 

router.post(
  "/signup" , 
  async (req , res) => {
    try {
        // password hash + implicit salt
        const hashedPassword = await bcrypt.hash(req.body.password, 10);

        let newUser = {
          username: req.body.username, 
          email: req.body.email, 
          password: hashedPassword, 
        }; 
        const result = await UserModel.create(newUser);
        res.status(201).json ( { message: "User successfully registered." } ) ; 
    }
    catch (err) { 
      if (err.code === 11000) {  // unicity mongodb code error (mogoose schema "unique" property)
        return res.status(400).json( { message: 'An account already exists with this email. ' } );
      }
      res.status(500).send("Error adding new user") ; 
    }
  }
)

router.post (
  "/login" , 
  async (req , res) => {
    try {
      const user = await UserModel.findOne( 
        { email: req.body.email }
      ); 

      if (!user) {
        return res.status(404).json({ message: 'User not registered.' });
      }

      const isValid = await bcrypt.compare ( req.body.password , user.password ) ; 
      if (!isValid) { 
        return res.status(401).json( { message: "Unauthorized : wrong password" } ) ; 
      } ; 

      const token = jwt.sign(
        { email: req.body.email } , 
        process.env.JWT_SECRET , 
        { expiresIn: "1h" }
      ); 

      const email = user.email ; 
      const userName = user.username ; 

      return res.status(200).json( { response : { email , userName , token }} );
    }
    catch (err) {
      console.error('Connection error:', err);
      return res.status(500).json( { message: 'Internal Server error.' } );
    }
  }
)

router.patch (
  "/update/username" , 
  async (req, res) => {
    try {
      const user = await UserModel.findOne ( { email: req.body.email } ) ; 
      if (!user) { return res.status(404).json ( { message: "User not registered" } ) }

      // check token
      const jwtToken = req.headers.authorization.split('Bearer ')[1].trim() ; 
      const decodedJwtToken = jwt.verify(jwtToken , process.env.JWT_SECRET) ; 

      if (!decodedJwtToken) {
        return res.status(403).json( { message: "Invalid token for this user" } );
      }  
      
      // check password
      const isValid = await bcrypt.compare ( req.body.password , user.password ) ; 
      if (!isValid) { 
        return res.status(401).json( { message: "Unauthorized : Wrong password" } ) ; 
      } ;  
 
      // update username
      const newUser = await UserModel.findOneAndUpdate(
        { email: req.body.email },
        { $set: { username: req.body.username } },
        { new: true } , 
      );
      return res.status(200).json( { message : "Username updated successfully" , response: newUser.username } ); 
    } 
    catch (err) {
      console.error('Error in user.mjs file : ', err); 
      return res.status(500).json( { message: "Internal server error : username not updated" } );
    }
  }
)

router.patch(
  '/update/password', 
  async (req, res) => {
    try {
      const user = await UserModel.findOne ( { email: req.body.email } ) ; 
      if (!user) { return res.status(404).json ( { message: "User not registered" } ) }

      // check token
      const jwtToken = req.headers.authorization.split('Bearer ')[1].trim() ; 
      const decodedJwtToken = jwt.verify(jwtToken , process.env.JWT_SECRET) ; 

      if (!decodedJwtToken) {
        return res.status(403).json( { message: "Invalid token for this user" } );
      }  

      // check password
      const isValid = await bcrypt.compare ( req.body.password , user.password ) ; 
      if (!isValid) { 
        return res.status(401).json( { message: "Unauthorized : Wrong password" } ) ; 
      } ; 

      // Hash password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(req.body.newPassword, salt);

      // Update password
      user.password = hashedPassword;
      await user.save();

      return res.status(200).json({ message: "Password updated successfully" });
    } catch (error) {
      return res.status(500).json({ message: "Internal server error", error });
    }
});

export default router ; 