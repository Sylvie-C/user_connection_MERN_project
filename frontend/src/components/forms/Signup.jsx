import { useState } from "react" ; 
import { useNavigate } from "react-router-dom" ; 

import EyeIcon from "./EyeIcon";

import { useSignupMutation } from "../../features/signup/signupAPI";

export default function Signup () {

  const [ pwd01Visibility , setPwd01Visibility ] = useState (false) ;  
  const [ pwd02Visibility , setPwd02Visibility ] = useState (false) ; 

  const navigate = useNavigate() ; 

  const [signup] = useSignupMutation() ; // use subscription mutation hook

  // display password on clic on eye icon (password hidden by default)
  const showPassword01 = (value) => {
    // if eye is closed, password is visible
    if (value) {
      setPwd01Visibility (true) ; 
    }else{
      setPwd01Visibility (false) ; 
    }
  }

  const showPassword02 = (value) => {
    let show ; 

    // if eye is closed, password is visible
    if (value) {
      setPwd02Visibility (true) ; 
    }else{
      setPwd02Visibility (false) ; 
    }
  }

  // check if password confirmed (2 passwords identical)
  const checkPwd = (pwd01 , pwd02) => {
    pwd01 = pwd01.trim() ; 
    pwd02 = pwd02.trim() ; 

    if (pwd01 === pwd02) { return true }
    else{ return false }
  }

  // on form submit
  const handleSubmit = async (event) => {

    event.preventDefault() ; 

    const formDataObj = new FormData (event.target) ; 

    const pwdConfirmed = checkPwd (formDataObj.get("pwd01") , formDataObj.get("pwd02")) ; 

    if (pwdConfirmed) {
      const data = {
        username: formDataObj.get("username") , 
        email: formDataObj.get("email") , 
        password: formDataObj.get("pwd02") , 
      } 
  
      try {
        const result = await signup (data).unwrap(); 

        alert("Welcome ! You registered successfully.") ; 
        navigate("/login") ;         
      }
      catch (err) {
        console.error ("Internal Server Error. You are not registered. ") ; 
        alert (err.data?.message || "Registration failed" ) ; 
      }
    }else{
      alert("Passwords are not identical.") ; 
    }
  }

  return (
    <div className="p-2">
      <h1 className="font-heading text-4xl text-center mb-6 md:mb-10">Sign in Form</h1>
      <form onSubmit={handleSubmit} className="mx-auto w-full sm:w-3/5 pt-4 md:pt-10 pb-10 flex flex-col bg-purple-400 rounded-md">
        <div className="mx-auto w-72 sm:w-fit sm:px-4">
          <div className="flex flex-col mb-4">
            <label htmlFor="username">Your username:</label>
            <input
              type="text"
              name="username"
              className="w-72 md:w-96 h-10 bg-white px-2 my-2 rounded-md"
            />
          </div>

          <div className="flex flex-col mb-4">
            <label htmlFor="email">Your email:</label>
            <input
              required
              type="email"
              name="email"
              className="w-72 md:w-96 h-10 bg-white px-2 my-2 rounded-md"
            />
          </div>

          <div className="flex flex-col mb-4">
            <label htmlFor="password">Your password:</label>
            <div className="flex items-center">
              <input
                required
                type= { pwd01Visibility ? "text" : "password" }
                name="pwd01"
                className="w-72 md:w-96 h-10 bg-white px-2 my-2 rounded-md"
              />
              <EyeIcon eyeClicked={ showPassword01 }/>
            </div>
          </div>

          <div className="flex flex-col mb-4">
            <label htmlFor="pwd-confirm">Confirm your password:</label>
            <div className="flex items-center">
              <input
                required
                type= { pwd02Visibility ? "text" : "password" }
                name="pwd02"
                className="w-72 md:w-96 h-10 bg-white px-2 my-2 rounded-md"
              />
              <EyeIcon eyeClicked={ showPassword02 }/>
            </div>
          </div>

          <div className="w-72 md:w-96 flex justify-center">
          <button type="submit" 
            className="w-40 text-white bg-purple-950 p-2 m-4 inline-block rounded-xl transition hover:bg-white hover:border-purple-950 border-2 hover:text-purple-950 duration-300">
              OK
          </button>
        </div>
        </div>
      </form>
    </div>
  )
}
