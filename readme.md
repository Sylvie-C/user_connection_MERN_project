# USER CONNECTION

## Description
This project is a fullstack application developped with the MERN stack (MongoDB, Express.js, React, Node.js) with Vite and TailwindCSS. 

This application is a simple User connection application, to : 
- add a new user to a Mongo database, 
- get a user from a Mongo database, 
- update a username, 
- delete a user from a Mongo database. 

## Features
- **CRUD** : Create, Read, Update, Delete a User allowed, 
- **Authentication and Authorization** : Use JWT to secure routes. 
- **Reactive UI**: Dynamic user interface with React.
- **RESTful API**: Well-structured endpoints to interact with the database.
- **Mongoose** : Data object defined with structured models. 

## Prerequisites
- Make sure you have installed [Node.js](https://nodejs.org/) on your machine. 
- Please refer to "package.json" file for full details about necessary packages, and refer to the following "Installation" instructions for installation process. 
- If you prefer [Yarn] instead of [npm] for packages installation, included with Node, make sure to install it (https://yarnpkg.com/). 


## Installation

### Backend
1. Clone the repository:
    ```sh
    git clone https://github.com/Sylvie-C/user_connection_MERN_project.git 
    cd user_connection_MERN_project
    ```

2. Install server dependencies:
    ```sh
    cd backend
    npm install
    ```

3. Create a `.env` file and add the necessary environment variables:
    ```env
    PORT=your_port
    MONGO_URI=your_mongo_uri
    JWT_SECRET=your_jwt_secret
    ```

4. Start the server :
    ```sh
    npm start
    ```

### Frontend
1. In the root directory of the project, go to the frontend folder:
    ```sh
    cd frontend
    ```

2. Install client dependencies:
    ```sh
    npm install
    ```

3. Create a `.env` file in the `frontend` folder and add the necessary environment variables (make sure to have your variables beginning with "VITE_" if use of VITE for frontend):
    ```env
    VITE_BACKEND_URL=your_backend_url
    ```

4. Start the React application:
    ```sh
    npm start
    ```

## Project Architecture
/backend
  ├── db
  ├── models
  ├── routes
  ├── .env
  └── server.js
/frontend
  ├── public
  ├── src
      ├── components
      ├── App.css
      ├── index.css
      ├── App.jsx
      ├── main.jsx
  ├── .env
  └── package.json
