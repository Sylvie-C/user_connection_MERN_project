# USER CONNECTION (MERN, Vite, TailwindCSS)

## Overview

A fullstack MERN (MongoDB, Express.js, React, Node.js) application for user registration, login, and profile updates.  
Features JWT authentication, MongoDB storage, RESTful API, and interactive React UI styled with TailwindCSS.


## Features
- **User Management:** Register, login, update username and password.  
- **Authentication:** JWT-secured endpoints.  
- **RESTful API:** Well-structured Express routes.  
- **MongoDB & Mongoose:** Robust data modeling.  
- **Swagger:** Interactive API documentation.  
- **Frontend:** React + Vite + TailwindCSS.  


## Prerequisites
- [Node.js](https://nodejs.org/)  
- [MongoDB](https://www.mongodb.com/)  
- [npm](https://www.npmjs.com/) or [Yarn](https://yarnpkg.com/)  


## Environment variables
### Frontend
VITE_BACKEND_URL="your frontend URL"  

### Backend
- BACKEND_PORT=your backend port n° (**5050** here)  , 
- API_FRONTEND_URL= "your frontend URL" (should be "http://localhost:5173" by default with Vite)  , 
- MONGO_URI=`mongodb://localhost:27017/${YOUR_DB_NAME}` where 27017 is default mongodb local port,   
- JWT_SECRET="any string secret key"  


## Local installation
- Install [Node.js](https://nodejs.org/) and [MongoDB](https://www.mongodb.com/) on your computer,  
- Clone this repository,  
- Place in /backend directory + `npm install` , then same thing with /frontend directory,  
- Start servers from their directory with `npm run backend-dev` for backend dev phase, and `npm run dev` for frontend dev phase.  
Please refer to package.json file for other scripts commands (e.g.: deployment).  


## Project Architecture
```
/backend
  ├── db
  ├── models
  ├── routes
  ├── .env
  ├── package.json
  └── server.mjs
/frontend
  ├── public
  ├── src
    ├── components
        ├── forms
        ├── Navbar
        └── protected
    ├── features
        ├── login
        ├── signup
        └── updateUser
    ├── App.css
    ├── index.css
    ├── App.jsx
    ├── main.jsx
    ├── components
  ├── .env
  └── package.json
```

## Swagger documentation for local installation
The Swagger UI is available at `http://localhost:${BACKEND_PORT}/api/user`.  

