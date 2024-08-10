import { useState , useEffect } from "react" ; 
import { useSelector , useDispatch } from "react-redux" ; 
import { useNavigate } from "react-router-dom" ; 

import EyeIcon from "../forms/EyeIcon" ;
import Message from "../../components/Message" ; 

import { getUserEmail , getToken } from "../../selectors" ; 
import { useUpdateUsernameMutation , useUpdatePasswordMutation } from "../../features/updateUser/updateUserAPI" ; 
import { setUsername } from "../../features/login/loginSlice" ; 


export default function Settings () {
  const dispatch = useDispatch() ; 
  const navigate = useNavigate() ; 

  const [ pwdVisible , setPwdVisible ] = useState (false) ; // show/hide password state
  const [ newPwdVisible , setNewPwdVisible ] = useState( false) ; 
  const [ message , setMessage ] = useState (null) ; // server response message

  const storedEmail = useSelector( getUserEmail ) ; 
  const storedToken = useSelector( getToken ) ; 

  // database interactions
  const [updateUsername, { isLoading: isUpdatingUsername, isError: isUsernameUpdateError, error: usernameUpdateError, data: usernameUpdateData }] = useUpdateUsernameMutation();
  const [updatePassword, { isLoading: isUpdatingPassword, isError: isPasswordUpdateError, error: passwordUpdateError, data: passwordUpdateData }] = useUpdatePasswordMutation();
  

  // display password on clic on eye icon (password hidden by default)
  const showPassword = (value) => {
    // if eye is closed, password is visible
    if (value) { setPwdVisible (true) ; }
    else { setPwdVisible (false) ; }
  }

  const showNewPassword = (value) => {
    if (value) { setNewPwdVisible(true) }
    else { setNewPwdVisible(false)}
  }

  // handle form submit
  const handleSubmit = async (event) => {
    event.preventDefault() ; 
    
    const formDataObj = new FormData (event.target); 

    const reqData = {
      email: storedEmail,
      password: formDataObj.get("currentpassword") ,
      token: storedToken, 
      newPassword: formDataObj.get("newpassword") , 
    }

    // if username not empty, add it to data request
    const newUsername = formDataObj.get("username") ; 
    if (newUsername !== "") { reqData.username = formDataObj.get("username") } ; 

    try {
      if (reqData.username !== "") {
        const usernameReturn = await updateUsername(reqData).unwrap();
      }
    } 
    catch (usernameUpdateError) {
      console.error('Failed to update user:', usernameUpdateError);
    }

    try {
      if (reqData.newPassword !== "") {
        const pwdReturn = await updatePassword(reqData).unwrap(); 
      }
    }
    catch (passwordUpdateError) {
      console.error("Failed to update password: " , passwordUpdateError) ; 
    }
  }

  // on every server response (data returned after submit), display message to user
  useEffect(
    () => {
      if (isUpdatingUsername || isUpdatingPassword ) {
        setMessage("Loading... Please wait...") ; 
      }
      else if (isUsernameUpdateError || isPasswordUpdateError) {
        const usernameErrMessage = `${usernameUpdateError.status} : ${JSON.stringify(usernameUpdateError.data.message)}` ; 
        const pwdErrMessage = `${passwordUpdateError.status} : ${JSON.stringify(passwordUpdateError.data.message)}` ; 

        if (usernameErrMessage || pwdErrMessage) { setMessage(`${usernameErrMessage}`) }

        const timer = setTimeout(() => {
          setMessage(null) ; 
        }, 2000);
        return () => clearTimeout(timer);
      }
      else if (usernameUpdateData || passwordUpdateData) {
        
        if (usernameUpdateData?.response !== "") {
          dispatch(setUsername({ storeUsername: usernameUpdateData?.response }));
        }

        setMessage("Changes updated successfully") ; 

        const timer = setTimeout(() => {
          navigate("/protected") ; 
        }, 1000);
        return () => clearTimeout(timer);
      }
    } 
    , [ isUpdatingUsername,isUpdatingPassword, 
        usernameUpdateError,passwordUpdateError, 
        usernameUpdateData, passwordUpdateData,
      ]
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
            type= { newPwdVisible ? "text" : "password" }
            name="newpassword"
            className="w-72 md:w-96 h-10 bg-white px-2 my-2 rounded-md"
          />
          <EyeIcon eyeClicked={ showNewPassword }/>
        </div>
      </div>

      <div className="flex flex-col mb-4">
        <label htmlFor="password">Your current password:</label>
        <div className="flex items-center">
          <input
            required
            type= { pwdVisible ? "text" : "password" }
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
