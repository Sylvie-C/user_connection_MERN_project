import express from "express"; 
import bcrypt from "bcrypt" ; 

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
        res.send(result).status(204) ; 
    }
    catch (err) { 
      if (err.code === 11000) {  // unicity mongodb code error (mogoose schema "unique" property)
        return res.status(400).json( { message: 'An account already exists with this email. ' } );
      }
      res.status(500).send("Error adding new user") ; 
    }
  }
)

export default router ; 
