import { useState } from "react"; 
import { useNavigate } from "react-router-dom"; 
import { useDispatch } from "react-redux"; 

import EyeIcon from "./EyeIcon"; 

import { setAuth , setUsername } from "../../features/login/loginSlice";
import { useLoginUserMutation } from '../../features/login/loginAPI'; 


export default function Login () {

  const navigate = useNavigate() ; 
  const dispatch = useDispatch() ; 
  const [ loginUser, { isLoading, isError, error } ] = useLoginUserMutation(); // Query RTK data fetch

  const [ pwdVisibility , setPwdVisibility ] = useState (false) ;  

  // display password on clic on eye icon (hidden by default)
  const showPassword = (value) => {
    // if eye is closed, password is visible
    if (value) {
      setPwdVisibility (true) ; 
    }else{
      setPwdVisibility (false) ; 
    }
  }

  const handleSubmit =  async (event) => {
    event.preventDefault() ; 
    
    const formDataObj = new FormData (event.target); 

    const data = {
      email: formDataObj.get("email"), 
      password: formDataObj.get("password") ,
    }

    try {
      const result = await loginUser(data).unwrap();
      const token = result?.token ; 

      if (token) {
        dispatch(setAuth( { isAuthenticated: true } )) ; 
        dispatch(setUsername( { user_name: result?.userName } ));

        alert("You are now logged in.") ; 
        navigate("/protected") ; 
      }
    }

    catch (err) {
      console.error ("There was a problem : " , err) ; 
      alert("login failed") ; 
    }
  }

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error occurred: {error.message}</div>;

  return (
    <div className="p-2">
      <h1 className="font-heading text-4xl text-center mb-6 md:mb-10">Log in Form</h1>

      <form onSubmit={handleSubmit} className="mx-auto w-full sm:w-3/5 pt-4 md:pt-10 pb-10 flex flex-col bg-purple-400 rounded-md">
        <div className="mx-auto w-72 sm:w-fit sm:px-4">
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
                type= { pwdVisibility ? "text" : "password" }
                name="password"
                className="w-72 md:w-96 h-10 bg-white px-2 my-2 rounded-md"
              />
              <EyeIcon eyeClicked={ showPassword }/>
            </div>
            <a href="#" className="text-sm italic underline hover:not-italic hover:text-emerald-950">Forgot your password ?</a>
          </div>

          <div className="w-72 md:w-96 flex justify-center">
            <button 
              type="submit" 
              className="w-40 text-white bg-purple-950 p-2 m-4 inline-block rounded-xl transition hover:bg-white hover:border-purple-950 border-2 hover:text-purple-950 duration-300">
                OK
            </button>
          </div>
        </div>
      </form>
    </div>
  )

}
