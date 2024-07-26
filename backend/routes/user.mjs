import express from "express"; 
import bcrypt from "bcrypt" ; 
import jwt from "jsonwebtoken" ; 

import UserModel from "../models/user.model.mjs" ; 

const router = express.Router() ; 


// route to create new user : /api/user/signup
router.post(
  "/signup" , 
  async (req , res) => {
    try {
        // Hacher le mot de passe avant de l'enregistrer
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

// route to login : /api/user/login
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

      const userId = user._id ; 

      return res.status(200).json({ userId , token });
    }
    catch (err) {
      console.error('Connection error:', err);
      return res.status(500).json({ message: 'Internal Server error.' });
    }
  }
)

export default router ; 