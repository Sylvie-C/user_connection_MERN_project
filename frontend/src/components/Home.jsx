import { NavLink } from "react-router-dom" ; 

export default function Home () {

  return(
    <main className="w-full sm:max-w-xl mx-auto bg-purple-400 rounded-md flex justify-center ">
      <div className="w-full lg:w-2/4 mx-2 py-6 ls:mx-16 my-8 lg:my-16 bg-purple-200 rounded-md text-center">
        <p>Already have an account ? </p>
        <NavLink to="login" className="mb-8 text-white bg-purple-950 p-2 m-4 inline-block rounded-xl transition hover:bg-white hover:border-purple-950 border-2 hover:text-purple-950 duration-300">Log in</NavLink>

        <p>New user ? Create an account</p>
        <NavLink to="signup" className="text-white bg-purple-950 p-2 m-4 inline-block rounded-xl transition hover:bg-white hover:border-purple-950 border-2 hover:text-purple-950 duration-300">Sign in</NavLink>
      </div>
    </main>
  )
}