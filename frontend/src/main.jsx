import React from 'react'
import ReactDOM from 'react-dom/client'

import { createBrowserRouter , RouterProvider } from "react-router-dom"

import App from './App.jsx'
import './index.css'

import Home from "./components/Home"
import Login from "./components/forms/Login.jsx"
import Signup from './components/forms/Signup.jsx'
import HomeConnect from "./protected/HomeConnect.jsx"
import Settings from "./protected/Settings.jsx"

const router = createBrowserRouter ( [ 
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

	{
		path: "/protected" , 
		element: <App /> , 
		children: [
			{
				path: "/protected" , 
				element: <HomeConnect /> , 
			}
		]
	} ,

	{
		path: "/protected/settings" , 
		element: <App /> , 
		children: [
			{
				path: "/protected/settings" , 
				element: <Settings />
			}
		]
	}
] ) ; 

ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		<RouterProvider router={router} /> 
	</React.StrictMode>,
); 
