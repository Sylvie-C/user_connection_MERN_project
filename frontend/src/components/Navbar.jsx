import { NavLink } from "react-router-dom" ; 

export default function Navbar () {
  return(
    <>
      <nav className="flex justify-between items-center w-full lg:w-3/5 mx-auto">
        <NavLink to="/" className="m-2 p-2 rounded-full bg-teal-950 text-teal-300 transition hover:bg-teal-300 hover:text-teal-950">Back Home</NavLink>
        <div>
          <NavLink to="/settings" className="m-2 p-2 rounded-full bg-teal-950 text-teal-300 transition hover:bg-teal-300 hover:text-teal-950">Settings</NavLink>
        </div>
      </nav>
    </>
  )
}