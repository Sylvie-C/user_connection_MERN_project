import express from "express"; 
import db from "../db/connection.js"; 
import { ObjectId } from "mongodb"; 

const router = express.Router() ; 

// route to get all users : /api/user/
router.get (
	"/" , 
	async (req , res) => {
		let collection = await db.collection("users") ; 
		let results = await collection.find({}).toArray() ; // find ({}) = find everything
		res.send(results).status(200) ; 
	} 
) ; 


router.get(
	"/:email" , 
	async (req , res) => {
		let collection = await db.collection("users") ; 
		let query = { email: new ObjectId(req.params.email) } ; 
		let result = await collection.findOne(query) ; 

		if (!result) res.send("Not found").status(404) ; 
		else res.send(result).status(200) ; 
	}
) ; 


// route to create new user : /api/user/
router.post(
  "/" , 
  async (req , res) => {
    try {
      let newUser = {
        name: req.body.name, 
        surname: req.body.surname, 
        username: req.body.username, 
        email: req.body.email, 
        date: new Date() , 
      }; 
      let collection = await db.collection (process.env.USERS_COLLECTION) ; 
      let result = await collection.insertOne (newUser) ; 
      res.send(result).status(204) ; 
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