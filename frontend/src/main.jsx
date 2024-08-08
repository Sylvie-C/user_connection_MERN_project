import React from 'react'
import ReactDOM from 'react-dom/client'

import { createBrowserRouter , RouterProvider } from "react-router-dom"

import App from './App.jsx'
import './index.css'

import Home from "./components/Home"
import Login from "./components/forms/Login.jsx"
import Signup from './components/forms/Signup.jsx'
import Message from "./components/Message.jsx"

import PrivateRoute from "./components/protected/PrivateRoute.jsx"
import HomeConnect from "./components/protected/HomeConnect.jsx"
import Settings from "./components/protected/Settings.jsx"


const router = createBrowserRouter ( [ 
	// <Home /> child
	{
		path: "/" , 
		element: <App /> , 
		children: [
			{
				path: "/" , 
				element: <Home />, 
			},
		]
	} , 

	// <Login /> child
	{
		path: "/login" , 
		element: <App /> , 
		children: [
			{
				path: "/login" , 
				element: <Login />, 
			}
		]
	} , 

	// <Signup /> child
	{
		path: "/signup" , 
		element: <App /> , 
		children: [
			{
				path: "/signup" , 
				element: <Signup />, 
			}
		]
	} , 

	// <HomeConnect /> child
	{
		path: "/protected" , 
		element: <App /> , 
		children: [
			{
				path: "/protected" , 
				element: 
				<PrivateRoute>
					<HomeConnect />
				</PrivateRoute> , 
			}
		]
	} ,

	// <Settings /> child
	{
		path: "/protected/settings" , 
		element: <App /> , 
		children: [
			{
				path: "/protected/settings" , 
				element: 
				<PrivateRoute>
					<Settings />
				</PrivateRoute>
			}
		]
	} , 

	// <Message /> child
	{
		path: "*" , 
		element: <App /> , 
		children: [
			{
				path: "*" , 
				element: <Message text="Error 404 : Oups ! Nothing here !" /> 
			}
		]
	}
] ) ; 

ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		<RouterProvider router={router} /> 
	</React.StrictMode>,
); 
