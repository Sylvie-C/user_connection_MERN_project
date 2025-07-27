import dotenv from "dotenv"; 
import express from "express"; 
import cors from "cors"; 

import swaggerUi from "swagger-ui-express" ; 
import yaml from "yamljs" ; 

import users from "./routes/user.mjs"; 

const swaggerDocs = yaml.load ("./swagger.yaml") ; 
dotenv.config(); 
const app = express(); 

const PORT = process.env.BACKEND_PORT || "" ; 

app.use (express.json()) ; 
app.use (cors(
  {
    origin: `${process.env.API_FRONTEND_URL}` // frontend URI
  }
)) ; 

app.use ("/api/user" , users) ; 

// API Documentation
if (process.env.NODE_ENV !== 'production') {
  app.use('/api/user', swaggerUi.serve, swaggerUi.setup(swaggerDocs))
}

// server connection confirmation in browser
app.get('/', (req, res, next) => {
  res.send('Backend server connected successfully. ') ; 
})

app.listen(
  PORT ,
  ( console.log (`Server listening on port ${PORT}`)) 
) ; 
