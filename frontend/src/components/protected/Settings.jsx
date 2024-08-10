import { useState , useEffect } from "react" ; 
import { useSelector , useDispatch } from "react-redux" ; 
import { useNavigate } from "react-router-dom" ; 

import EyeIcon from "../forms/EyeIcon" ;
import Message from "../../components/Message" ; 

import { getUserEmail , getToken } from "../../selectors" ; 
import { useUpdateUsernameMutation } from "../../features/updateUser/updateUserAPI" ; 
import { setUsername } from "../../features/login/loginSlice" ; 


export default function Settings () {
  const dispatch = useDispatch() ; 
  const navigate = useNavigate() ; 

  const [ pwdVisibility , setPwdVisibility ] = useState (false) ; // show/hide password state
  const [ message , setMessage ] = useState (null) ; // server response message

  const storedEmail = useSelector( getUserEmail ) ; 
  const storedToken = useSelector( getToken ) ; 

  // database interaction
  const [updateUsername, { isLoading, isError, error, data }] = useUpdateUsernameMutation();

  // display password on clic on eye icon (password hidden by default)
  const showPassword = (value) => {
    // if eye is closed, password is visible
    if (value) { setPwdVisibility (true) ; }
    else { setPwdVisibility (false) ; }
  }

  // handle form submit
  const handleSubmit = async (event) => {
    event.preventDefault() ; 
    
    const formDataObj = new FormData (event.target); 

    const reqData = {
      username: formDataObj.get("username") , 
      newpassword: formDataObj.get("newpassword") , 
      password: formDataObj.get("currentpassword") ,
      email: storedEmail,
      token: storedToken, 
    }

    try {
      if (reqData.username !== "") {
        const result = await updateUsername(reqData).unwrap();
      }
    } catch (error) {
      console.error('Failed to update username:', error);
    }
  }

  // on every server response (data returned after submit), display message to user
  useEffect(
    () => {
      if (isLoading) {
        setMessage("Loading... Please wait...") ; 
      }
      else if (isError) {
        const errorMessage = `${error.status} : ${JSON.stringify(error.data.message)}` ; 
        setMessage (errorMessage) ; 

        const timer = setTimeout(() => {
          setMessage(null) ; 
        }, 2000);
        return () => clearTimeout(timer);
      }
      else if (data) {
        dispatch(setUsername({ storeUsername: data?.response }));
        setMessage("Username updated successfully") ; 

        const timer = setTimeout(() => {
          navigate("/protected") ; 
        }, 1000);
        return () => clearTimeout(timer);
      }
    } 
    , [data , isLoading , isError]
  ); 

  // handle message display
  const responseDisplay = message 
  ? <Message text={message} />
  : <>
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
    </>

  return ( 
    <div className="p-2">
      {responseDisplay}
    </div>
  )
}
