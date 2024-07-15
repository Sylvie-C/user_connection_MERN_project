import React from 'react'
import ReactDOM from 'react-dom/client'

import { createBrowserRouter , RouterProvider } from "react-router-dom"

import App from './App.jsx'
import './index.css'

import Home from "./components/Home"
import Login from "./components/Login.jsx"
import Signin from './components/Signin.jsx'
import Settings from "./components/Settings.jsx"

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
		path: "/signin" , 
		element: <App /> , 
		children: [
			{
				path: "/signin" , 
				element: <Signin />, 
			}
		]
	} , 

	{
		path: "/settings" , 
		element: <App /> , 
		children: [
			{
				path: "/settings" , 
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
