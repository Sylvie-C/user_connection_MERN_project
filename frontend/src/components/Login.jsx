export default function Login () {

  const handleSubmit = async (event) => {
    event.preventDefault() ; 

    const response = await fetch (
      `${import.meta.env.VITE_BACKEND_URL}/api/user/` 
    ); 

    console.log ("GET USERS ? : " , response) ; 

    const usersList = await response.json() ; 
    console.log ("USERS LIST ? : " , usersList) ; 
  }

  return (
    <div className="flex flex-col items-center p-2">
      <form onSubmit={handleSubmit} className="w-full lg:w-3/5 pt-4 md:pt-10 pb-10 flex flex-col items-center bg-purple-400 rounded-md">

        <h1 className="font-heading text-4xl text-center mb-6">Log in Form</h1>

        <label htmlFor="email" >Your email address : </label>
        <input type="text" name="email"
          className="bg-white w-5/6 sm:w-3/6 p-2 rounded-md mb-4" 
        />

        <label htmlFor="pwd" >Your password : </label>
        <input type="text" name="pwd"
          className="bg-white w-5/6 sm:w-3/6 p-2 rounded-md mb-4" 
        />
        <button type="submit" className="w-3/12 lg:w-1/12 text-white bg-purple-950 p-2 m-4 inline-block rounded-xl transition hover:bg-white hover:border-purple-950 border-2 hover:text-purple-950 duration-300">OK</button>
      </form>
    </div>
  )

}
