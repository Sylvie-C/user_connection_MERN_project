import { useState } from "react";
import { useNavigate } from "react-router-dom"; 
import { useDispatch } from "react-redux"; 

import EyeIcon from "./EyeIcon"; 
import Message from "../../components/Message" ; 

import { setAuth , setUsername , setUserEmail , setToken } from "../../features/login/loginSlice";
import { useLoginUserMutation } from '../../features/login/loginAPI'; 


export default function Login () {

  const navigate = useNavigate() ; 
  const dispatch = useDispatch() ; 

  const [ loginUser, { isLoading, isError, error , data } ] = useLoginUserMutation(); // Query RTK data fetch
  const [ pwdVisibility , setPwdVisibility ] = useState (false) ;  

  // display password on clic on eye icon (hidden by default)
  const showPassword = (value) => {
    // if eye is closed, password is visible
    if (value) { setPwdVisibility (true) ; }
    else { setPwdVisibility (false) ; }
  }

  const handleSubmit =  async (event) => {
    event.preventDefault() ; 
    
    const formDataObj = new FormData (event.target); 

    const dataIn = {
      email: formDataObj.get("email"), 
      password: formDataObj.get("password") ,
    }

    try {
      const result = await loginUser(dataIn).unwrap();
      const token = result?.token; 

      if (token) {
        dispatch( setAuth ( { isAuthenticated: true } ) ) ; 
        dispatch( setUsername ( { storeUsername: result?.userName } ) ) ;
        dispatch( setUserEmail ( { storeEmail: result?.email } ) ) ; 
        dispatch( setToken ( { storeToken: token } ) ) ; 
      }

      navigate ("/protected") ; 
    }
    catch (backendErrorObj) {
      console.error ("There was a problem : " , backendErrorObj) ; 
    }
  }

  if (isLoading) return <Message text="Loading : please wait ..." /> ;
  if (isError) { 
    const errorMessage = `${error.status} : ${JSON.stringify(error.data.message)}` ; 
    return <Message text= {errorMessage} /> ; 
  }

  if (data) return <Message text="You are now logged in" />

  return (
    <div className="p-2">
      <h1 className="font-heading text-4xl text-center mb-6 md:mb-10">Log in Form</h1>

      <form onSubmit= { handleSubmit } className="mx-auto w-full sm:w-3/5 pt-4 md:pt-10 pb-10 flex flex-col bg-purple-400 rounded-md">
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
