import dotenv from "dotenv"; 
dotenv.config(); 

import express from "express"; 
import cors from "cors"; 

import users from "./routes/user.mjs"; 


const app = express(); 
const PORT = process.env.PORT || 5050; 

app.use (cors()) ; 
app.use (express.json()) ; 
app.use ("/api/user" , users) ; 

app.listen(
  PORT , 
  ( console.log (`Server listening on port ${PORT}`))
) ; 
