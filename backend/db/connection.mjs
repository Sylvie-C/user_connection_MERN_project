import dotenv from "dotenv"; 
dotenv.config() ; 

import { MongoClient , ServerApiVersion } from "mongodb"; 

const ATLAS_URI = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.CLUSTER_PWD}@${process.env.CLUSTER_NAME}.vkngpvd.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority&appName=${process.env.CLUSTER_NAME}` ; 
const uri = ATLAS_URI || "" ; 

const client = new MongoClient (
  uri, 
  {
    serverApi: {
      version: ServerApiVersion.v1, 
      strict: true, 
      deprecationErrors: true, 
    }, 
  }
); 

try {
  await client.connect() ; 
  await client.db("admin").command ( { ping:1 } ) ; 
  console.log ("Ping network test. You successfully connected to MongoDB.") ; 
}
catch (err) { console.error (err) }

let db = client.db (process.env.DBNAME) ; 

export default db; 