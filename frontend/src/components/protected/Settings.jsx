import { useState } from "react"; 
import EyeIcon from "../forms/EyeIcon";

export default function Settings () {
  const [ pwdVisibility , setPwdVisibility ] = useState (false) ; 

  // display password on clic on eye icon (password hidden by default)
  const showPassword = (value) => {
    // if eye is closed, password is visible
    if (value) { setPwdVisibility (true) ; }
    else{ setPwdVisibility (false) ; }
  }

  const handleSubmit = (event) => {
    event.preventDefault() ; 
    
    console.log ("le bouton fonctionne") ; 
  }

  return (
    <div className="p-2">
      <h1 className="font-heading text-4xl text-center mb-6 md:mb-10">Settings updates</h1>

      <form onSubmit={ handleSubmit } className="mx-auto w-full sm:w-3/5 pt-4 md:pt-10 pb-10 flex flex-col bg-purple-400 rounded-md">
        <div className="mx-auto w-72 sm:w-fit sm:px-4">
          <div className="flex flex-col mb-4">
            <label htmlFor="email">New Username: </label>
            <input
              type="text"
              name="username"
              className="w-72 md:w-96 h-10 bg-white px-2 my-2 rounded-md"
            />
          </div>

          <div className="flex flex-col mb-4">
            <label htmlFor="email">New Password: </label>
            <div className="flex items-center">
              <input
                type= { pwdVisibility ? "text" : "password" }
                name="newpassword"
                className="w-72 md:w-96 h-10 bg-white px-2 my-2 rounded-md"
              />
              <EyeIcon eyeClicked={ showPassword }/>
            </div>
          </div>

          <div className="flex flex-col mb-4">
            <label htmlFor="password">Your current password:</label>
            <div className="flex items-center">
              <input
                required
                type= { pwdVisibility ? "text" : "password" }
                name="currentpassword"
                className="w-72 md:w-96 h-10 bg-white px-2 my-2 rounded-md"
              />
              <EyeIcon eyeClicked={ showPassword }/>
            </div>
          </div>

          <div className="w-72 md:w-96 flex justify-center">
            <button 
              type="submit" 
              className="w-40 text-white bg-purple-950 p-2 m-4 inline-block rounded-xl transition hover:bg-white hover:border-purple-950 border-2 hover:text-purple-950 duration-300"
            >
              OK
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}