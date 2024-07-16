import express from "express"; 
import bcrypt from "bcrypt" ; 
import { ObjectId } from "mongodb"; 

import db from "../db/connection.mjs"; 


const router = express.Router() ; 

// route to create new user : /api/user/
router.post(
  "/" , 
  async (req , res) => {
    try {
      let collection = db.collection (process.env.USERS_COLLECTION) ; 

      // Vérifier si l'email existe déjà
      const existingUser = await collection.findOne( { email: req.body.email } );

      if (existingUser) {
        return res.status(400).send("An account already exist with this email.");
      }else{
        // Hacher le mot de passe avant de l'enregistrer
        const hashedPassword = await bcrypt.hash(req.body.password, 10);

        let newUser = {
          username: req.body.username, 
          email: req.body.email, 
          password: hashedPassword, 
          date: new Date() , 
        }; 

        let result = await collection.insertOne (newUser) ; 
        res.send(result).status(204) ; 
      }
    }
    catch (err) { 
      console.error (err); 
      res.status(500).send("Error adding new user") ; 
    }
  }
)


// route to update a username : /api/user/:id
router.patch (
	"/:id" , 
	async (req , res) => {
		try {
			const query = { _id: new ObjectId(req.params.id) } ; 
			const updates = {
				$set: {
          username: req.body.username,  
				},
			} ; 

			let collection = await db.collection(process.env.USERS_COLLECTION) ; 
			let result = await collection.updateOne(query , updates) ; 
			res.send (result).status(200) ; 
		}
		catch (err) {
			console.error(err) ; 
			res.status(500).send("Error updating username") ; 
		}
	}
) ; 



// route to get a user by email (temporary)
router.get(
	"/email" , 
	async (req , res) => {
		let collection = await db.collection("users") ; 
		let query = { email: req.query.email } ; 
		let result = await collection.findOne(query) ; 

		if (!result) res.send("Not found").status(404) ; 
		else res.send(result).status(200) ; 
	}
) ; 



// route to delete a user : /api/user/:id
router.delete (
  "/:id" , 
  async (req , res) => {
    try {
      const query = { _id: new ObjectId (req.params.id) } ; 
      const collection = db.collection (process.env.USERS_COLLECTION) ;
      let result = await collection.deleteOne(query) ; 
      
      res.send (result).status(200) ; 
    }
    catch (err) {
      res.status(500).send ("Error deleting user") ; 
    }
  }
) ; 

export default router ; 