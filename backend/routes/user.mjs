import express from "express"; 
import bcrypt from "bcrypt" ; 

import UserModel from "../models/user.model.mjs" ; 


const router = express.Router() ; 

// route to create new user : /api/user/signup
router.post(
  "/signup" , 
  async (req , res) => {
    try {
      // Vérifier si l'email existe déjà
      const existingUser = await UserModel.findOne ( { email: req.body.email } ); 

      if (existingUser) {
        return res.status(400).send("An account already exist with this email.");
      }else{
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
    }
    catch (err) { 
      console.error (err); 
      res.status(500).send("Error adding new user") ; 
    }
  }
)

export default router ; 
