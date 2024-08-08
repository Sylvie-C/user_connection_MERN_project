import { useSelector } from "react-redux" ; 

import { getAuth } from "../../selectors" ; 

import NavbarBtn from "./NavbarBtn" ; 

export default function Navbar () {
  let isAuth = useSelector(getAuth) ; 

  return(
      <nav className="w-full lg:max-w-5xl mx-auto flex justify-between items-center">
        <NavbarBtn btnTxt="Back Home" destination={ isAuth ? "/protected" : "/" } />

        { isAuth &&
          <div className="flex items-center">    
            <NavbarBtn btnTxt="Settings" destination="/protected/settings" aria-label="Settings button" /> 
            <button 
              className="m-2 p-2 rounded-full bg-teal-950 text-teal-300 transition hover:bg-teal-300 hover:text-teal-950"
              onClick= { () => { window.location.href = "/" } } 
              aria-label="Logout button"
            >
              Logout
            </button>
          </div>
        }
      </nav>
  )
}