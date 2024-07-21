import dotenv from "dotenv"; 
import express from "express"; 
import cors from "cors"; 

import swaggerUi from "swagger-ui-express" ; 
import yaml from "yamljs" ; 

import users from "./routes/user.mjs"; 

const swaggerDocs = yaml.load ("./swagger.yaml") ; 
dotenv.config(); 
const app = express(); 

const PORT = process.env.PORT || "" ; 

app.use (cors()) ; 
app.use (express.json()) ; 
app.use ("/api/user" , users) ; 

app.use (
  "/api-docs" , 
  swaggerUi.serve , 
  swaggerUi.setup (swaggerDocs) ,
) ; 

app.listen(
  PORT , "0.0.0.0" ,
  ( console.log (`Server listening on port ${PORT}`))
) ; 
